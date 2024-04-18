"use strict";
(function (define) {
  define(function (require, exports, module) {
    module.exports = {
      template: require("text!./index.hbs"),
      run({ route, render }) {
        render({ ...route, code: function () { }.toString() })
        $(".progress").click(function (e) {
          const parentW = parseInt($(e.currentTarget).css('width'))
          const childW = parseInt($(e.currentTarget).children(".progress-bar").css('width'))
          let width = parseInt(childW / parentW * 100) - 5;
          if (width < 0) width = 0
          console.log(e);
          console.log(parentW, childW, width)
          $(e.currentTarget).children(".progress-bar").css("width", width + '%')
          if (width == 0) {
            setTimeout(function () {
              $(e.currentTarget).parent('.progress-wrapper').css("display", 'none')
            }, 600)
          }
        })
      }
    }
  })
})(define)
