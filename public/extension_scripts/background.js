// console.log("before background");
// try {
//   chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
//     if (changeInfo.status === "complete") {
//       chrome.scripting.executeScript({
//         files: ["extension_scripts/content.js"],
//         // target: { tabId: tab.id, allFrames: true },
//         target: { tabId: tab.id, world: "MAIN" },
//         // target: { tabId: tab.id },
//       });
//     }
//   });
// } catch (err) {
//   console.log(err);
// }
// console.log("after background");
