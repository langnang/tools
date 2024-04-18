"use strict";
(function (define) {
  define(function (require, exports, module) {
    module.exports = {
      template: require("text!./index.hbs"),
      random() {
        return '#' + Math.floor(Math.random() * 16777215).toString(16)
      },
      run({ route, render, random }) {
        const _r = random()
        render({
          ...route,
          name: "Random " + route.name,
          random: _r,
          btns: [
            {
              icon: "glyphicon glyphicon-refresh"
            }
          ]
        })
        $("#app .container").css('background-color', _r)
      }
    }
  })
})(define)
