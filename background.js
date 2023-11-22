//allows extension to set initial state on installation
chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({
    text: "ON",
  });
});

const yt = "https://www.youtube.com/watch?v"

chrome.runtime.onlo

chrome.action.onClicked.addListener(async (tab) => {
  if (tab.url.startsWith(yt)) {
    // Retrieve the action badge to check if the extension is 'ON' or 'OFF'
    const apiURL = `https://yummarizer-ngoba6pkyq-nw.a.run.app/yummarize?url=${tab.url}`
    chrome.action.setBadgeText({
      tabId: tab.id,
      text: "Yummarizing"
    })
    chrome.action.setBadgeBackgroundColor({
      tabId: tab.id,
      color: "green"
    })
    fetch(apiURL).then(response => {
      //resets loading text
      chrome.action.setBadgeText({
        tabId: tab.id,
        text: ""
      })

      if(!response.ok){
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      chrome.storage.local.set({jsonData: data}, function() {
        chrome.runtime.sendMesssage({action: 'createPDF'})
      });
    })
    .catch(error => {
      console.error("Error fetching JSON:", error)
      chrome.action.setBadgeText({
        tabId: tab.id,
        text: ""
      })
    });
  }

});

