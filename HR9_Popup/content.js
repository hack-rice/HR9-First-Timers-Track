// content.js
console.log("content script activated");

// chrome.runtime.onConnect.addListener(function(port) {
//     console.log(port.name);
//     if (port.name === "Background -> Content") {
//         console.log("Connected to background")
//         port.onMessage.addListener(function(msg) {
//             if (msg === "Greeting From Background") {
//               port.postMessage("From Content to Background");
//             }
//         });
//     }
// });

// console.log("url: " + JSON.stringify(document));
// var port = chrome.runtime.connect({
//     name: "Content -> Background"
// });
// port.postMessage("from content")
var port;
var reconnectToExtension = function () {
//     // Reset port
    port = null;
//     // Attempt to reconnect after 1 second
    setTimeout(connectToExtension, 100 * 1);
};

var connectToExtension = function () {

//     // Make the connection
    port = chrome.runtime.connect({name: "Content -> Background"});
    port.postMessage("from content")
//     // When extension is upgraded or disabled and renabled, the content scripts
//     // will still be injected, so we have to reconnect them.
//     // We listen for an onDisconnect event, and then wait for a second before
//     // trying to connect again. Becuase chrome.runtime.connect fires an onDisconnect
//     // event if it does not connect, an unsuccessful connection should trigger
//     // another attempt, 1 second later.
    port.onDisconnect.addListener(reconnectToExtension);
};

connectToExtension();
// chrome.runtime.onMessage.addListener(
//     function(request, sender, sendResponse) {
//         console.log(request);
//         console.log(sender.tab ?
//                   "from a content script:" + sender.tab.url :
//                   "from the extension");
//       if (request.greeting == "hello")
//         sendResponse({farewell: "goodbye"});
//  });

port.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log("content: " + JSON.stringify(request));
        // console.log(request === "From Background");
        if (request === "From Background") {
            var div=document.createElement("dialog"); 
            document.body.appendChild(div); 
            div.innerHTML="<p>You haven't passed your focus time, are you sure you want to proceed?</p><button id='terminate'>Terminate Timing</button><button id='proceed'>Proceed</button>";
            // document.body.innerHTML += "<dialog>You shouldn't visit this page at this moment.<br><button>Close</button></dialog>";
            var term = document.querySelector('#terminate');
            term.addEventListener("click", function() {
                port.postMessage("Terminate")
                div.close()
            })
            var proceed = document.querySelector("#proceed");
            proceed.addEventListener("click", function(){
                div.close();
            })
            div.showModal()
        }
});
