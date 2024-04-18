"use strict";
// 静态页面
(function (define) {
  define(function (require, exports, module) {
    module.exports = {
      name: "Multimedia",
      description: "多媒体",
      path: "/multimedia",
      children: [
        {
          name: "Clappr",
          path: "/clappr",
          component: "/multimedia/clappr/index",
        },
      ],
    };
  });
})(define);
