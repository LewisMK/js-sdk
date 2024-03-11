/*
{
      message: "I am the WOO KING.",
      domain: "dex.woo.org",
      updateTime: "2022-JAN-01 23:23",
      position: {
        symbol: "WOO-PERP",
        currency: "USDC",
        side: "LONG",
        leverage: 20,
        pnl: 10432.23,
        ROI: 20.25,
        informations: [
          { title: "Open Price", value: 0.12313 },
          { title: "Opened at", value: "Jan-01 23:23" },
          { title: "Mark price", value: "0.12341" },
          { title: "Quantity", value: "0.123" },
        ],
      },
    }
*/

import { Decimal } from "@orderly.network/utils";
import { PnLDisplayFormat, ShareOptions } from "./type";

export function getPnLPosterData(position: any, leverage: number, message: string, domain: string, pnlType: PnLDisplayFormat, options: Set<ShareOptions>) {    

    const { symbol, currency } = processSymbol(position.symbol);
    const positionData: any = {
        symbol,
        currency,
        side: position.position_qty > 0 ? "Long" : "Short",
    };


    switch (pnlType) {
        case "pnl": {
            positionData["pnl"] = new Decimal(position.unsettlement_pnl).toFixed(2, Decimal.ROUND_DOWN);
            break;
        }
        case "roi": {
            positionData["ROI"] = new Decimal(position.unsettled_pnl_ROI).toFixed(2, Decimal.ROUND_DOWN);
            break;
        }
        case "roi_pnl": {
            positionData["pnl"] = new Decimal(position.unsettlement_pnl).toFixed(2, Decimal.ROUND_DOWN);
            positionData["ROI"] = new Decimal(position.unsettled_pnl_ROI.toFixed(2)).toFixed(2, Decimal.ROUND_DOWN);
            break;
        }
    }

    const informations: { title: string; value: any; }[] = [];

    options.forEach((op) => {
        
        switch (op) {
            case "leverage": {
                positionData["leverage"] = leverage; break;
                break;
            }
            case "openPrice": {
                informations.push({"title": "Open price", "value": position.average_open_price});
                break;
            } case "openTime": {
                informations.push({"title": "Opened at", "value": formatOpenTime(position.timestamp)});
                break;
            }
            case "markPrice": {
                informations.push({"title": "Mark price", "value": position.mark_price});
                break;
            }
            case "quantity": {
                informations.push({"title": "Quantity", "value": position.position_qty});
            }
            default: break;
        }
    });

    positionData["informations"] = informations;

    const data: any = {
        position: positionData,
        updateTime: formatShareTime(new Date()),
        domain
    }
    if (message.length > 0) {
        data["message"] = message;
    }


    return data;
}

interface SymbolResult {
    symbol: string;
    currency: string;
}

function processSymbol(symbol: symbol): SymbolResult {
    const parts = symbol.toString().split('_');
    const currency = parts.pop();
    const symbolName = parts.join('_');

    return {
        symbol: symbolName,
        currency: currency || "USDC"
    };
}

function formatShareTime(input: number): string;
function formatShareTime(input: Date): string;
function formatShareTime(input: number | Date): string {
    const date = input instanceof Date ? input : new Date(input);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    };
  
    const formatter = new Intl.DateTimeFormat('en-US', options);
    const formattedParts = formatter.formatToParts(date);

    // console.log("formattedParts", formattedParts);
    
  
    
    const year = formattedParts.find((part) => part.type === "year" ? part.value: "")?.value;
    const month = formattedParts.find((part) => part.type === "month" ? part.value: "")?.value;
    const day = formattedParts.find((part) => part.type === "day" ? part.value: "")?.value;
    const hour = formattedParts.find((part) => part.type === "hour" ? part.value: "")?.value;
    const minute = formattedParts.find((part) => part.type === "minute" ? part.value: "")?.value;

    return `${year}-${month}-${day} ${hour}:${minute}`;
}

function formatOpenTime(input: number | Date): string {
    const date = input instanceof Date ? input : new Date(input);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    };
  
    const formatter = new Intl.DateTimeFormat('en-US', options);
    const formattedParts = formatter.formatToParts(date);

    // console.log("formattedParts", formattedParts);

    const month = formattedParts.find((part) => part.type === "month" ? part.value: "")?.value;
    const day = formattedParts.find((part) => part.type === "day" ? part.value: "")?.value;
    const hour = formattedParts.find((part) => part.type === "hour" ? part.value: "")?.value;
    const minute = formattedParts.find((part) => part.type === "minute" ? part.value: "")?.value;

    return `${month}-${day} ${hour}:${minute}`;
}