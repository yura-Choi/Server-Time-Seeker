const getCurrentURL = async () => {
    return await new Promise((resolve, reject) => {
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            resolve(tabs[0].url);
        });
    });
}

chrome.runtime.onConnect.addListener((port) => {
    if(port.name != "conn") return false;

    port.onMessage.addListener( async (msg) => {
        if(msg.type === "opened"){
            const url = new URL(await getCurrentURL());
            const host = url.hostname;

            port.postMessage({ type: msg.type, url: url.origin, host: host });
            return true;
        }
    });
});
