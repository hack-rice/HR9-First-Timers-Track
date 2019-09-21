// content.js
console.log("content script activated");
var port = chrome.extension.connect({
    name: "Popup -> Background"
});

port.postMessage("from content")

port.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(sender.tab ?
                  "from a content script:" + sender.tab.url :
                  "from the extension");
        console.log("content: " + request);
        port.postMessage("Content End received");
        console.log(request === "Greeting from backend");
        if (request === "Greeting from backend") {
            document.body.innerHTML += "<dialog>You shouldn't visit this page at this moment.<br><button>Close</button></dialog>";
            var dialog = document.querySelector("dialog")
            dialog.querySelector("button").addEventListener("click", function() {
                dialog.close()
            })
            dialog.showModal()
            
        }
});
