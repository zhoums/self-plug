
 chrome.extension.onRequest.addListener(
      function(request, sender, sendResponse) {
        alert(8)
        console.log(sender.tab ?
                    "from a content script:" + sender.tab.url :
                    "from the extension");
        if (request.greeting == "hello"){
            console.log(888888888888888)
          sendResponse({farewell: "goodbye"});
        }
        else{
          sendResponse({}); // snub them.
        }
    });