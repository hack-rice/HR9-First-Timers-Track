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
    li.innerHTML = "<div> <label>" + text+ "</label> <input class='DeleteThis' type='button' value='Delete' /> </div>";
    document.getElementById("dsplyWhite").appendChild(li);

    deleteChild();


    // chrome.storage.sync.set({'id_W_site': text}, function(){
    //     console.log("URL: " + text + "is saved.");
    // });

    // id_W_site += 1;
}

function addBFunction(){
    var text = document.getElementById("BlackList").value;
    blackList.push(text);
    var li = document.createElement('li');
    li.innerHTML = "<div> <label>" + text+ "</label> <input class='DeleteThis' type='button' value='Delete' /> </div>";
    document.getElementById("dsplyBlack").appendChild(li);

    deleteChild();
    
}


function deleteChild(){
    var elements = document.getElementsByClassName("DeleteThis");
    for(var i=0; i<elements.length; i++){
        elements[i].addEventListener("click", function(event){
            console.log(event);
            event.target.parentNode.remove();
        })
    }

 }