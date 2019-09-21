var whiteList = [];
var blacklist = [];
var time = 0;

var port = chrome.extension.connect({
    name: "Sample Communication"
});
port.postMessage("Hi BackGround");
port.onMessage.addListener(function(msg) {
    console.log("message recieved" + msg);
});

document.getElementById("btn").addEventListener("click", ()=>{
    port.postMessage('btn clicked');
    document.getElementById("exampleFormControlTextarea1").innerHTML = "changed";
});