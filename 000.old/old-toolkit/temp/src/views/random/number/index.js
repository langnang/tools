"use strict";
(function (define) {
  define(function (require, exports, module) {
    module.exports = {
      template: require("text!./index.hbs"),
      random() {
        return Math.random()
      },
      run({ route, render, random }) {
        render({
          ...route,
          name: "Random " + route.name,
          random,
          btns: [
            {
              icon: "glyphicon glyphicon-refresh"
            }
          ]
        })
        $("[name='btn_group'] .glyphicon-refresh").parent().click(function (e) {
          $("[name='random_number']").html(`<h1>${random()}</h1>`)
        })
      }
    }
  })
})(define)
