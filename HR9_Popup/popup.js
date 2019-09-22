var whiteList = [];
var blackList = [];
var time = 0;
var id_W_site = 0;
var id_B_site = 0;

// var port = chrome.extension.connect({
//     name: "Popup -> Background"
// });
// port.postMessage("Hi BackGround");
// port.onMessage.addListener(function(msg) {
//     console.log("message recieved" + msg);
// });

// // document.getElementById("time").addEventListener("change", (e)=> {this.value=e})
// document.getElementById("interfaceMsg").addEventListener("submit", (contents) => {
//     var time = document.getElementById("time").value;
//     port.postMessage(JSON.stringify(time));
// })

function addWFunction(){
    var text = document.getElementById("whiteList").value;
    whiteList.push(text);
    var li = document.createElement('li');
    li.innerHTML = "<label id='new_url'>" + text+ "</label>" + "<button id='deleW' type='button' onclick='deleteChild(this)'>Delete</button>";
    document.getElementById("dsplyWhite").appendChild(li);

    // chrome.storage.sync.set({'id_W_site': text}, function(){
    //     console.log("URL: " + text + "is saved.");
    // });

    // id_W_site += 1;
}

function addBFunction(){
    var text = document.getElementById("BlackList").value;
    blackList.push(text);
    var li = document.createElement('li');
    li.innerHTML = "<label id='ou'>" + text+ "</label>";
    document.getElementById("dsplyBlack").appendChild(li);
}




function deleteChild(button){
    button.remove();
    return false;
 }