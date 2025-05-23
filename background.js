chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    console.log("请求捕获:", details.url);
    // 这里只能记录请求信息，无法获取响应体
  },
  { urls: ["http://10.10.8.96:30094/*"] },
  []
);