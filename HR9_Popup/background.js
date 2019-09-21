// background.js
var visited = [];
var whiteList = [];
var blackList = ["chrome://newtab/"];
var time = 8;
var timing = false;
// chrome.runtime.onInstalled.addListener(function() {
//   console.log("hello world");
// });

function setTime() {
  timing = true;
  setTimeout(function(){ timing=false, alert("Hello"); }, 3000);
}


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

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (tab.url !== "chrome://newtab/") {
    // alert('Your page is updated to id:'+ JSON.stringify(tabId) +"tab url: " +  JSON.stringify(tab.url));
  }
  visited.push(tab.url);
  console.log(JSON.stringify(visited));
});

chrome.tabs.onCreated.addListener((tab)=>{
  if (tab.url !== "chrome://newtab/") {
    // alert('you just created a new tab ' + JSON.stringify(tab.url));
  }
  // timing = true;
  // setTimeout(function(){ timing=false, alert("Hello"); }, 3000);
  setTime();
  visited.push(tab.url);
  console.log(JSON.stringify(visited));
})

chrome.tabs.onActivated.addListener((info) => {
  // timing = true;
  // setTimeout(function(){ timing=false, alert("Hello"); }, 3000);
  setTime();
  chrome.tabs.query({active: true}, (lst)=> {
    var curr = lst[0].url;
    console.log(curr);
    visited.push(curr);
  })
})


// chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//   chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
//     console.log(response);
//   });
// });