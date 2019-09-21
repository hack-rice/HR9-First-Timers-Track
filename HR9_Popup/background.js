// background.js
var visited = [];
var whiteList = [];
var blackList = ["chrome://newtab/"];
var time = 0;
// chrome.runtime.onInstalled.addListener(function() {
//   console.log("hello world");
// });

chrome.extension.onConnect.addListener(function(port) {
  console.log("Connected .....");
  port.postMessage("Greeting from backend");
  port.onMessage.addListener(function(msg) {
       console.log("message recieved " + JSON.stringify(msg));
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
  visited.push(tab.url);
  console.log(JSON.stringify(visited));
})

chrome.tabs.onActivated.addListener((info) => {
  chrome.tabs.query({active: true}, (lst)=> {
    var curr = lst[0].url;
    console.log(curr);
    visited.push(curr);
  })
})

// chrome.browserAction.onClicked.addListener(function(tab) {
//   alert("browser action is clicked");
//   visited.push(tab.url);
//   console.log(JSON.stringify(visited));
// });
// sendMessage();

// chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//   chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
//     console.log(response);
//   });
// });