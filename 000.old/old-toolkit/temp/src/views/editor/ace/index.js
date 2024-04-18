"use strict";
(function (define) {
  define(function (require, exports, module) {
    module.exports = {
      template: require("text!./index.hbs"),
      ace: require('ace/ace'),
      run: function ({ render, route }) {
        render({
          ...route,
        });
        var editor = ace.edit("ace-wrapper");
        editor.session.setTabSize(2);
        editor.setValue(`function foo(items) {\n\tvar x = "All this is syntax highlighted";\n\treturn x;\n}`, -1);
        editor.setTheme("ace/theme/monokai");
        editor.session.setMode("ace/mode/javascript");
      },
    };
  });
})(define);
