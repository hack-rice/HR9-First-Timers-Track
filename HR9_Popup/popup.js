var whiteList = [];
var blacklist = [];
var time = 0;

var port = chrome.extension.connect({
    name: "Popup -> Background"
});
port.postMessage("Hi BackGround");
port.onMessage.addListener(function(msg) {
    console.log("message recieved" + msg);
});

// document.getElementById("time").addEventListener("change", (e)=> {this.value=e})
document.getElementById("interfaceMsg").addEventListener("submit", (contents) => {
    var time = document.getElementById("time").value;
    port.postMessage(JSON.stringify(time));
})