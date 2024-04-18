"use strict";
(function (define) {
  define(function (require, exports, module) {
    const JSONEditor = require("jsoneditor");
    module.exports = {
      template: require("text!./index.hbs"),
      initCodeEditor: () => new JSONEditor(document.getElementById("jsoneditor-code"), {
        mode: "code",
      }),
      initTreeEditor: () => new JSONEditor(document.getElementById("jsoneditor-tree"), {}),
      run: function ({ render, route, initCodeEditor, initTreeEditor, setStorage, getStorage }) {
        render({
          ...route,
          name: "JSON Editor"
        });
        const codeEditor = initCodeEditor();
        // set json
        const initialJson = getStorage() || {
          Array: [1, 2, 3],
          Boolean: true,
          Null: null,
          Number: 123,
          Object: { a: "b", c: "d" },
          String: "Hello World",
        };
        codeEditor.set(initialJson);
        // setStorage(initialJson)
      },
    };
  });
})(define);
