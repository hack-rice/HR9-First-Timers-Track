// background.js

var visited = [];
var whiteList = [];
var blackList = ["chrome://newtab/"];
var time = 8;
var timing = false;
var externalPort = null;
var currentUrl = "";
// var port = chrome.extension.connect({
//   name: "Popup -> Background"
// });

chrome.extension.onConnect.addListener(function(port) {
  console.log("Connected .....");
  port.postMessage("Greeting from backend");

  port.onMessage.addListener(function(msg) {
       console.log("message recieved " + JSON.stringify(msg));
       if (msg === "Start Timing") {
         setTime();
       }
  });
})

chrome.tabs.onActivated.addListener((info) => {
  chrome.tabs.query({active: true}, (lst)=> {
    var curr = lst[0].url;
    console.log("current webpage" + curr);
    currentUrl = curr;
    visited.push(curr);
    if (!matchUrl(curr, whiteList)) {
      // chrome.tabs.sendMessage(lst[0].id, {keyword: "Unrelated Page"}, (response)=> {
      //   console.log(response);
      // }); 
      // port.postMessage("Unrelated Page");
    }
  })
})

//probably will delete this handler later, for user will stay on the same page after updating
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (tab.url !== "chrome://newtab/") {
    // do whatever
  }
  visited.push(tab.url);
  // console.log(JSON.stringify(visited));
});

chrome.tabs.onCreated.addListener((tab)=>{
  if (tab.url !== "chrome://newtab/") {
    // alert('you just created a new tab ' + JSON.stringify(tab.url));
  }
  visited.push(tab.url);
  // console.log(JSON.stringify(visited));
})



// chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//   chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
//     console.log(response);
//   });
// });

//===============================utils=================================

function setTime() {
  timing = true;
  setTimeout(function(){ timing=false, alert("Congratulation on finishing your focus!"); }, 3000);
}

function matchUrl(url, whiteList) {
  return false;
}

// function sendMsg(tab, msg) {
//   chrome.tabs.sendMessage(tab, msg); 
// }
