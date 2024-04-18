"use strict";
(function (define) {
  define(function (require, exports, module) {
    module.exports = {
      template: require("text!./index.hbs"),
      icons: require("./icons"),
      run({ route, render, icons }) {
        render({ ...route, icons })
      }
    }
  })
})(define)
