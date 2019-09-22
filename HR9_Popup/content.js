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
var port = chrome.runtime.connect({
    name: "Content -> Background"
});

port.postMessage("from content")

// chrome.runtime.onMessage.addListener(
//     function(request, sender, sendResponse) {
//       console.log(sender.tab ?
//                   "from a content script:" + sender.tab.url :
//                   "from the extension");
//       if (request.greeting == "hello")
//         sendResponse({farewell: "goodbye"});
//     });

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
