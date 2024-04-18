"use strict";
// 静态页面
(function (define) {
  define(function (require, exports, module) {
    module.exports = {
      name: "Editor",
      description: "代码编辑器",
      path: "/editor",
      children: [
        {
          name: "Ace",
          path: "/ace",
          component: "/editor/ace/index",
        },
        {
          name: "JSON",
          path: "/json",
          component: "/editor/jsoneditor/index",
        },
      ],
    }
  });
})(define);
