"use strict";
// 静态页面
(function (define) {
  define(function (require, exports, module) {
    module.exports = {
      name: "Crawler",
      description: "页面爬虫",
      path: "/crawler",
      children: [
        {
          name: "SiteInfo",
          path: "/site-info",
          component: "/static/crawler/site-info/index",
        },
      ],
    };
  });
})(define);
