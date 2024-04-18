"use strict";
(function (define) {
  define(function (require, exports, module) {
    module.exports = {
      template: require("text!./index.hbs"),
      Clappr: require("clappr"),
      run({ render, route, Handlebars, Clappr }) {
        render({ ...route })
        var player = new Clappr.Player({ source: "http://your.video/here.mp4", parentId: "#clappr_player" });
      }
    };
  });
})(define);
