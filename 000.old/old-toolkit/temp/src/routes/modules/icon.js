"use strict";
// 静态页面
(function (define) {
  define(function (require, exports, module) {
    module.exports = {
      name: "Icon",
      description: "图标",
      path: "/icon",
      children: [
        {
          name: "Glyphicons",
          path: "/glyphicons",
          component: "/icon/glyphicons/index",
        },
        {
          name: "FontAwesome",
          path: "/font-awesome",
          component: "/icon/font-awesome/index",
        },
      ],
    };
  });
})(define);
