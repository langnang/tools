"use strict";
// 静态页面
(function (define) {
  define(function (require, exports, module) {
    module.exports = {
      name: "Office",
      description: "文档",
      path: "/office",
      children: [
        {
          name: "Excel to JSON",
          path: "/excel2json",
          component: "/office/excel2json/index",
        },
      ],
    };
  });
})(define);
