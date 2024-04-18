"use strict";
// 静态页面
(function (define) {
  define(function (require, exports, module) {
    module.exports = {
      name: "Math",
      description: "数学",
      path: "/math",
      children: [
        {
          name: "阶乘",
          path: "/factorial",
          component: "/math/factorial/index",
        },
        {
          name: "斐波那契数列",
          path: "/fibonacci",
          component: "/math/fibonacci/index",
        },
      ],
    };
  });
})(define);
