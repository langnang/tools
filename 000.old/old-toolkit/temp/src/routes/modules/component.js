"use strict";
// 静态页面
(function (define) {
  define(function (require, exports, module) {
    module.exports = {
      name: "Component",
      description: "组件",
      path: "/component",
      children: [
        {
          name: "进度条",
          path: "/progress",
          component: "/component/progress/index",
        },

      ],
    }
  });
})(define);
