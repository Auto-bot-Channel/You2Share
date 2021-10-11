var contextmenu = {
	"id" : "name1",
	"title" : "name 2",
	"contexts" : ["selection"]
};

chrome.contextMenus.create(contextmenu);

chrome.browserAction.setBadgeBackgroundColor({ color: [255, 0, 0, 255] });
// chrome.browserAction.setBadgeText({text: '1'});


chrome.tabs.onUpdated.addListener(
	function(tabId, changeInfo, tab) {
	  // read changeInfo data
	  if (changeInfo.url) {
		// url has changed; do something here
		// like send message to content script
		chrome.tabs.sendMessage( tabId, {
		  message: 'hello!',
		  url: changeInfo.url
		})
	  }
	}
);

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.method == "getStatus")
      sendResponse({status: localStorage['inputText']});
    else
      sendResponse({}); // snub them.

	if (request.video != null){
		localStorage['video'] = request.video;
		sendResponse({})
	}
	else
		sendResponse({})
});
