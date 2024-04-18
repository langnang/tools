"use strict";
(function (define) {
  define(function (require, exports, module) {
    module.exports = {
      template: require("text!./index.hbs"),
      run: function ({ render, route, template, Handlebars }) {
        route.children = route.children.filter((item) => item.path !== "/dev" && item.children && item.children.length > 0);
        Handlebars.registerHelper("link", function (root = "", group = "", item = "", link, options) {
          if (link) {
            return link;
          } else {
            return "#" + root + group + item;
          }
          return "";
        });
        const html = Handlebars.compile(template)(route);
        render(html);
      },
    };
  });
})(define);
