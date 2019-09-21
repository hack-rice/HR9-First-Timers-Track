// background.js
var visited = [];
var whiteList = [];
var blackList = [];
var time = 0;
chrome.runtime.onInstalled.addListener(function() {
  console.log("hello world");
});

chrome.extension.onConnect.addListener(function(port) {
  console.log("Connected .....");
  port.onMessage.addListener(function(msg) {
       console.log("message recieved " + msg);
       port.postMessage("Hi Popup.js");
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
  // alert('You just activated this tab ' + JSON.stringify(info));
})

chrome.browserAction.onClicked.addListener(function(tab) {
  alert("browser action is clicked");
  visited.push(tab.url);
  console.log(JSON.stringify(visited));
});


// chrome.browserAction.onClicked.addListener(function(tab) {
//   console.log("browser action is clicked");
  // Send a message to the active tab
  // chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  //   var activeTab = tabs[0];
  //   chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});
  // });
// });
