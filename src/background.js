//当对应百度下载链接时，才弹出插件
//使用正则test判断是不是http://music.baid.com/song/开头
//别忘记在manifest.json里声明下background.js文件

function checkForValidUrl(tabId, changeInfo, tab) {
  var patt=new RegExp("http://music.baidu.com\/song\/[0-9]+");
  if (patt.test(tab.url) && tab.status == "complete") {
    // show the page action.
    chrome.pageAction.show(tabId);
  }
};

// Listen for any changes to the URL of any tab.
chrome.tabs.onUpdated.addListener(checkForValidUrl);
