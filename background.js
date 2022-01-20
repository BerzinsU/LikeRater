chrome.runtime.onInstalled.addListener(() => {
    console.log('Hello There!');
});

chrome.tabs.onUpdated.addListener(
    function(tabId, changeInfo, tab) {
        chrome.tabs.sendMessage( tabId, {
            message: 'Hello There!'
        })
    }
);