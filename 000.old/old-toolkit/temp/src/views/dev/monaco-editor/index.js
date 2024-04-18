"use strict";
(function (define) {
  define(function (require, exports, module) {
      // const monaco = require("monaco-editor");
      module.exports = {
        template: require("text!views/static/dev/monaco-editor/index.hbs"),
        snippets: require("json!./steps.json"),
        initMonaco: function (options) {
          if (!monaco) {
            return;
          }
          const id = "monaco-editor-container-" + options.id;
          const editor = monaco.editor.create(document.getElementById(id), {
            value: options.value || "",
            language: options.language || "markdown",
            automaticLayout: true,
            roundedSelection: false,
            scrollBeyondLastLine: false,
            readOnly: false,
            theme: "vs-dark",
            tabSize: 2,
            minimap: {
              enabled: false
            }
          });
          editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S, function () {
            console.log('SAVE pressed!')
          });
          editor.onDidChangeModelContent(function (event) {
            //编辑器内容change事件
            // console.log(event);
            // console.log(monacoEditors[index]);
            // console.log(monacoEditors[index].getValue());
            // console.log(monacoContainers[index])
            // console.log(monacoContainers[index].find(".margin")[0])
            // console.log(monacoContainers[index].find(".margin")[0].style.height)

            const content = editor.getValue();
            document.getElementById(id).style.height = content.split("\n").length * 19 + "px";
            // monacoContainers[index].css("height", content.split("\n").length * 19 + "px");

            // self.codesCopy = self.monacoEditor.getValue();
            // self.$emit("onCodeChange", self.monacoEditor.getValue(), event);
          });
          editor.onDidScrollChange((v) => {
            // console.log(v);

            // monacoContainers[index].css("height", v.scrollHeight + "px");
            // monacoContainers[index].find(".monaco-editor").css("height", v.scrollHeight + "px");
            // monacoContainers[index].find(".overflow-guard").css("height", v.scrollHeight + "px");
            // monacoContainers[index].find(".monaco-scrollable-element").css("height", v.scrollHeight + "px");
          })
          $(`#${id} > form select`).val(options.language || "markdown");
          $(`#${id} > form select`).change(function (e) {
            var oldModel = editor.getModel();//获取旧模型
            var value = editor.getValue();//获取旧的文本
            //创建新模型，value为旧文本，id为modeId，即语言（language.id）
            //modesIds即为支持语言
            //var modesIds = monaco.languages.getLanguages().map(function(lang) { return lang.id; });
            var newModel = monaco.editor.createModel(value, $(this).val());
            //将旧模型销毁
            if (oldModel) {
              oldModel.dispose();
            }
            //设置新模型
            editor.setModel(newModel);
            // editor.updateOptions({
            //   language: $(this).val()
            // })
            // console.log(editor.getOption("language"));
            // console.log(editor.getOptions());
          })
        },
        run: function ({render, route, template, Handlebars, snippets, initMonaco}) {
          // 按钮组
          Handlebars.registerPartial("addGroup", `
<div class="button-group" style="position: relative;height: 6px;z-index: 9;text-align: center;">
  <button type="button" class="btn btn-default btn-xs" style="margin-top: -16px;">
    <i class="fa fa-plus"></i>
  </button>
</div>
`);
          // 编辑器容器
          Handlebars.registerPartial("editorContainer", `
<div id="monaco-editor-container-{{id}}" style="position: relative;height: calc({{lines}} * 19px);">
  <form class="form-inline" style="position: absolute;top: -18px;right: 0;z-index: 99;font-size: 19px;">
    <div class="form-group">
      <select class="form-control input-sm">
        {{#each languages as |language|}}
          <option value="{{language}}">{{language}}</option>
        {{/each}}
      </select>
    </div>
    <button type="button" class="btn btn-default btn-sm">
      <i class="fa fa-copy"></i>
    </button>
    <button type="button" class="btn btn-default btn-sm">
      <i class="fa fa-download"></i>
    </button>
  </form>
</div>
`);
          snippets.children = snippets.children.map((item, index) => {
            return {
              ...item,
              id: index,
              lines: (item.value || "").split("\n").length
            }
          })
          // console.log(snippets);

          require(["vs/editor/editor.main"], function () {
            snippets.languages = monaco.languages.getLanguages().map(function (lang) {
              return lang.id;
            });
            render(Handlebars.compile(template)(snippets))
            const monacoContainers = [];
            const monacoEditors = [];
            snippets.children.forEach((item, index) => {
              initMonaco(item);
            })
            $(document).on("click", ".button-group .btn", function (e) {
              console.log(e);
              const r = parseInt(Math.random() * 100000);
              const randomId = "monaco-container-" + r;
              $(this).parent().after(Handlebars.compile(`{{> editorContainer}}{{> addGroup}}`)({
                id: r,
                languages: snippets.languages,
                lines: 1
              }))
              initMonaco({
                id: r
              })

            })
          })

        },
      };
    }
  );
})(define);
