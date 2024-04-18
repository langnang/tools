"use strict";
// 静态页面
(function (define) {
  define(function (require, exports, module) {
    module.exports = {
      name: "Random",
      description: "随机值",
      path: "/random",
      children: [
        {
          name: "Mock",
          path: "/mock",
          component: "/random/mock/index",
        },
        {
          name: "Number",
          path: "/number",
          component: "/random/number/index",
        },
        {
          name: "Color",
          path: "/color",
          component: "/random/color/index",
        },
      ],
    };
  });
})(define);
