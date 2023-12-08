import debounce from 'lodash/debounce';
import isEqual from 'lodash/isEqual';
import type {AbstractDatafeed} from '../datafeed/abstract-datafeed';
import type {
    ChartMode,
    IBrokerConnectionAdapterHost,
    IBrokerTerminal,
    IBrokerWithoutRealtime,
    IChartingLibraryWidget,
    LanguageCode,
    ResolutionString,
    TradingTerminalWidgetOptions,
} from '../type';
import {ChartHack} from './chart_hack';
import getOptions from './option';
import {defaultSettings, getChartData, saveChartAdapterSetting, saveChartData} from './persistUtils';

declare let TradingView: any;

const DEFAULT_SETTINGS_KEY = 'chartProp_default';
const DEBOUNCE_SAVE_TIME = 300;

export interface WidgetOptions {
    fullscreen?: TradingTerminalWidgetOptions['fullscreen'];
    autosize?: TradingTerminalWidgetOptions['autosize'];
    symbol: TradingTerminalWidgetOptions['symbol'];
    locale: string;
    timezone?: string;
    container: TradingTerminalWidgetOptions['container'];
    libraryPath: TradingTerminalWidgetOptions['library_path'];
    customCssUrl: TradingTerminalWidgetOptions['custom_css_url'];
    customFontFamily: TradingTerminalWidgetOptions['custom_font_family'];
    datafeed: AbstractDatafeed;

    getBroker?(instance: IChartingLibraryWidget, host: IBrokerConnectionAdapterHost): IBrokerWithoutRealtime | IBrokerTerminal;
}

export interface WidgetProps {
    options: WidgetOptions;
    layoutId: string;
    chartKey?: string;
    mode?: ChartMode;
    onClick?: (e: any) => void;
}

export class Widget {
    private _instance: IChartingLibraryWidget | null = null;

    private _onClick = null;

    private _broker: any;

    private _datafeed: AbstractDatafeed | null = null;

    private _chartKey: string = DEFAULT_SETTINGS_KEY;

    private _adapterSetting: any = defaultSettings;

    private _savedData: any = null;

    private _isLoggedIn: boolean = false;

    constructor(props: WidgetProps) {
        this._create(props);
    }

    public remove() {
        this.unsubscribeClick();
        this._datafeed?.remove();
        this._broker?.remove();
        this._instance?.remove();
        this.debounceSaveChart.cancel();
        this.debounceSaveChartAdapterSetting.cancel();
    }

    public setSymbol(symbol: string, callback?: any) {
        this._instance?.onChartReady(() => {
            const interval = this._instance?.symbolInterval()?.interval;
            this._instance?.setSymbol(symbol, interval as any, callback);
        });
    }

    public subscribeClick(onClick: any) {
        this._onClick = onClick;
        this._instance?.onChartReady(() => {
            (this._instance as any)?._iFrame.contentDocument?.addEventListener('click', this._onClick);
        });
    }

    public unsubscribeClick() {
        (this._instance as any)?._iFrame.contentDocument?.removeEventListener('click', this._onClick);
    }

    get instance() {
        return this._instance;
    }

    private chartHack() {
        this._instance?.onChartReady(() => {
            const iframeDocument = (this._instance as any)._iFrame.contentWindow.document;
            new ChartHack({iframeDocument}).defaultHack();
        });
    }

    private debounceSaveChart = debounce(() => {
        this._instance?.save((chartProps) => {
            if (!isEqual(this._savedData, chartProps)) {
                this._savedData = chartProps;
                saveChartData(this._chartKey, JSON.stringify(chartProps), this._isLoggedIn);
            }
        });
    }, DEBOUNCE_SAVE_TIME * 2);

    private debounceSaveChartAdapterSetting = debounce(() => {
        saveChartAdapterSetting(this._chartKey, JSON.stringify(this._adapterSetting), this._isLoggedIn);
    }, DEBOUNCE_SAVE_TIME);

    private subscribeAutoSave() {
        this._instance?.onChartReady(() => {
            this._instance?.subscribe('onAutoSaveNeeded', () => {
                this.debounceSaveChart();
            });

            this._instance
                ?.activeChart()
                .onVisibleRangeChanged()
                .subscribe(null, () => {
                    // onAutoSaveNeeded won't be triggered in the new version won't be trigger while time scale changes
                    this.debounceSaveChart();
                });
        });
    }

    private async _create({
                              options,
                              layoutId: chartId,
                              chartKey,
                              mode,
                              onClick,
                          }: WidgetProps) {
        const getBroker = options.getBroker;

        const widgetOptions: Omit<TradingTerminalWidgetOptions, 'interval'> = {
            fullscreen: options.fullscreen ?? true,
            autosize: options.autosize ?? false,
            timezone: options.timezone as TradingTerminalWidgetOptions['timezone'],
            symbol: options.symbol,
            library_path: options.libraryPath,
            custom_css_url: options.customCssUrl,
            custom_font_family: options.customFontFamily,
            datafeed: options.datafeed,
            locale: options.locale as LanguageCode,
            container: options.container,
            favorites: {
                intervals: ['1', '3', '5', '15', '30', '60', '240', '1D', '1W', '1M'] as ResolutionString[],
                chartTypes: ['Area', 'Line'],
            },
            broker_factory: getBroker
                ? (host) => {
                    if (this._broker) {
                        this._broker.remove();
                    }
                    this._broker = getBroker(this._instance as IChartingLibraryWidget, host);
                    return this._broker;
                }
                : undefined,
        };

        this._datafeed = options.datafeed;

        if (chartKey) {
            this._chartKey = chartKey;
        }

        // Get data from remote first. fallback to localstorage if no data on the server yet
        const {savedData, adapterSetting} = await getChartData(this._chartKey, this._isLoggedIn);

        console.log('-- adaptersetting', adapterSetting, savedData);
        // @ts-ignore
        this._adapterSetting = adapterSetting;
        this._savedData = savedData;
        this._instance = new TradingView.widget({
            ...getOptions(widgetOptions, mode),
            interval: adapterSetting['chart.lastUsedTimeBasedResolution'] ?? 1,
            saved_data: savedData,
            settings_adapter: {
                initialSettings: adapterSetting,
                setValue: (key: string, value: any) => {
                    this._adapterSetting = {...this._adapterSetting, [key]: value};
                    this.debounceSaveChartAdapterSetting();
                },
                removeValue: () => {
                },
            },
        });

        this.subscribeAutoSave();
        this.subscribeClick(onClick);
        this.chartHack();
    }
}
