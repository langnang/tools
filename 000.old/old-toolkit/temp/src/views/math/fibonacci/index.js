"use strict";
(function (define) {
  define(function (require, exports, module) {
    module.exports = {
      template: require("text!./index.hbs"),
      run({ route, render }) {
        render({ ...route })
      }
    }
  })
})(define)
