
// 向页面注入 injected.js
const script = document.createElement("script");
script.src = chrome.runtime.getURL("injected.js");

// 过滤接口的关键词,只要包含这个关键词的接口都会被抓取(injected配置了这里可以不用配)
const targetKeyword = 'starnet'
script.onload = function () {
  this.remove();
};
(document.head || document.documentElement).appendChild(script);

// 监听从 injected.js 发来的响应数据
window.addEventListener("message", function (event) {

  console.log('监听从 injected.js 发来的响应数据');
  console.log(event);
  if (event.source !== window) return;
  if (!event.data || event.data.type !== "XHR_CAPTURED") return;

  const payload = event.data.payload;
  let targetUrl = "http://127.0.0.1:8080/api/v1/xhr";

  if (payload.tag.includes(targetKeyword)) {
    const orginData = JSON.parse(payload.data);
    // const ep_id = orginData.data.path.split("/")[4];


    fetch(targetUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth": "220466675e31b9d20c051d5e57974150"
      },
      body: JSON.stringify(orginData)
    });
  }
});


