var whiteList = [];
var blackList = [];
var time = 0;
var lblid=0;

document.addEventListener('load', loadList);
document.getElementById('addWhite').addEventListener("click", addElem);

function loadList() {
    document.getElementById("dsplyWhite").innerHTML = "";
    for (var i=0; i<whiteList.length; i++) {
        var d = document.createElement('div');
        d.setAttribute("id", i);
        var p = document.createElement('p');
        p.innerHTML = whiteList[i];
        d.appendChild(p);
        var btn = document.createElement('button');
        btn.innerHTML = "-";
        btn.addEventListener("click", (event)=> {removeElem(parseInt(event.target.parentNode.id))});
        d.appendChild(btn);
        document.getElementById("dsplyWhite").appendChild(d);
    }
    
}

function addElem() {
    var text = document.getElementById("whiteList").value;
    document.getElementById('whiteList').value = "";
    whiteList.push(text);
    loadList();
}

function removeElem(id) {
    whiteList.splice(id,1);
    loadList();
}

//initiate port connection
var port = chrome.extension.connect({
    name: "Popup -> Background"
});
port.postMessage("Hi BackGround");

// port.onMessage.addListener(function(msg) {
//     console.log("message recieved" + msg);
// });
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      console.log(sender.tab ?
                  "from a content script:" + sender.tab.url :
                  "from the extension");
      if (request.greeting == "hello")
        sendResponse({farewell: "goodbye"});
});

document.getElementById("time").addEventListener("change", (e)=> {this.value=e})
document.getElementById("btn").addEventListener("click", (contents) => {
    var time = document.getElementById("time").value;
    port.postMessage({"purpose": "Start Timing", "time": time, "lst": whiteList});
})


