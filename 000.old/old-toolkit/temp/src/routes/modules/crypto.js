"use strict";
// 静态页面
(function (define) {
  define(function (require, exports, module) {
    module.exports = {
      name: "Crypto",
      description: "加解密",
      path: "/crypto",
      children: [
        {
          name: "Base64",
          path: "/base64",
          component: "/crypto/index",
        },
        {
          name: "MD5",
          path: "/md5",
          component: "/crypto/index",
        },
        {
          name: "SHA1",
          path: "/sha1",
          component: "/crypto/index",
        },
        {
          name: "SHA256",
          path: "/SHA256",
          component: "/crypto/index",
        },
        {
          name: "SHA512",
          path: "/SHA512",
          component: "/crypto/index",
        },
        {
          name: "SHA3",
          path: "/SHA3",
          component: "/crypto/index",
        },
        {
          name: "RIPEMD160",
          path: "/RIPEMD160",
          component: "/crypto/index",
        },
      ],
    };
  });
})(define);
