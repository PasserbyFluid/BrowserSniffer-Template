
(function () {
  const targetKeyword = "starnet";

  const open = XMLHttpRequest.prototype.open;
  const send = XMLHttpRequest.prototype.send;

  XMLHttpRequest.prototype.open = function (method, url, ...rest) {
    this._url = url;
    return open.call(this, method, url, ...rest);
  };

  XMLHttpRequest.prototype.send = function (body) {
    const _this = this;
    const url = this._url;

    this.addEventListener("load", function () {
      // 普通 JSON 响应
      if (url.includes(targetKeyword)) {
        window.postMessage({
          type: "XHR_CAPTURED",
          payload: {
            type: "xhr",
            url: url,
            tag: targetKeyword,
            data: _this.responseText
          }
        }, "*");
      }

    });

    return send.call(this, body);
  };

  console.log("XHR 拦截器注入成功");
})();
