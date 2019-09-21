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

document.getElementById("time").addEventListener("change", (e)=> {this.value=e})
document.getElementById("btn").addEventListener("click", (contents) => {
    var time = document.getElementById("time").value;
    port.postMessage(time);
    port.postMessage("Start Timing");
})