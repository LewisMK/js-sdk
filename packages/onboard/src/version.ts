
declare global {
    interface Window {
        __ORDERLY_VERSION__?: {
            [key: string]: string;
        };
    }
}
if(typeof window !== 'undefined') {
    window.__ORDERLY_VERSION__ = window.__ORDERLY_VERSION__ || {};
    window.__ORDERLY_VERSION__["@orderly.network/web3-onboard"] = "1.5.13-developV2.18";
};

export default "1.5.13-developV2.18";
