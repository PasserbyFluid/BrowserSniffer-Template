// (function () {
//   const targetKeyword = "/GetImageIndex";
//   const targetKeyword1 = "token=";

//   const open = XMLHttpRequest.prototype.open;
//   const send = XMLHttpRequest.prototype.send;

//   XMLHttpRequest.prototype.open = function (method, url, ...rest) {
//     this._url = url;
//     return open.call(this, method, url, ...rest);
//   };

//   XMLHttpRequest.prototype.send = function (body) {
//     const _this = this;
//     const url = this._url;

//     this.addEventListener("load", function () {
//       try {
//         // 普通文本接口
//         if (url.includes(targetKeyword)) {
//           const data = _this.responseText;  // 安全
//           window.postMessage({
//             type: "XHR_CAPTURED",
//             payload: {
//               type: "xhr",
//               url: url,
//               tag: "index",
//               data: data
//             }
//           }, "*");
//         }

//         // 二进制图片接口
//         if (url.includes(targetKeyword1)) {
//           let responseData;
//           if (_this.responseType === "" || _this.responseType === "text") {
//             responseData = _this.responseText;
//           } else if (_this.responseType === "arraybuffer" && _this.response instanceof ArrayBuffer) {
//             // 将 arraybuffer 转为 base64
//             const uint8Array = new Uint8Array(_this.response);
//             const binary = Array.from(uint8Array).map(b => String.fromCharCode(b)).join("");
//             responseData = btoa(binary);  // base64编码
//             console.log(responseData);
//           } else {
//             console.warn("未知响应类型", _this.responseType);
//             return;
//           }

//           window.postMessage({
//             type: "XHR_CAPTURED",
//             payload: {
//               type: "xhr",
//               url: url,
//               tag: "images",
//               data: responseData,
//               isBase64: true
//             }
//           }, "*");
//         }
//       } catch (err) {
//         console.error("处理响应出错:", err);
//       }
//     });

//     return send.call(this, body);
//   };

//   console.log("XHR 拦截器注入成功");
// })();


// (function () {
//   const targetKeyword = "/GetImageIndex";
//   const targetKeyword1 = "token=";

//   const open = XMLHttpRequest.prototype.open;
//   const send = XMLHttpRequest.prototype.send;

//   XMLHttpRequest.prototype.open = function (method, url, ...rest) {
//     this._url = url;
//     return open.call(this, method, url, ...rest);
//   };

//   XMLHttpRequest.prototype.send = function (body) {
//     const _this = this;
//     const url = this._url;

//     this.addEventListener("load", function () {
//       try {
//         // 普通 JSON 接口
//         if (url.includes(targetKeyword)) {
//           window.postMessage({
//             type: "XHR_CAPTURED",
//             payload: {
//               type: "xhr",
//               url: url,
//               tag: targetKeyword,
//               data: _this.responseText
//             }
//           }, "*");
//         }

//         // 二进制图片接口，转为 hex
//         if (url.includes(targetKeyword1)) {
//           let responseData;

//           if (_this.responseType === "" || _this.responseType === "text") {
//             responseData = _this.responseText;
//           } else if (_this.responseType === "arraybuffer" && _this.response instanceof ArrayBuffer) {
//             const uint8Array = new Uint8Array(_this.response);
//             responseData = Array.from(uint8Array)
//               .map(b => b.toString(16).padStart(2, '0'))
//               .join('');  // Hex 编码
//           } else {
//             console.warn("未知响应类型", _this.responseType);
//             return;
//           }

//           window.postMessage({
//             type: "XHR_CAPTURED",
//             payload: {
//               type: "xhr",
//               url: url,
//               tag: "images",
//               data: responseData,
//               isHex: true
//             }
//           }, "*");
//         }
//       } catch (err) {
//         console.error("处理响应出错:", err);
//       }
//     });

//     return send.call(this, body);
//   };

//   console.log("XHR 拦截器注入成功");
// })();










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
