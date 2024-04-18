"use strict";
(function (define) {
  define(function (require, exports, module) {
    module.exports = {
      template: require("text!./index.hbs"),
      XLSX: require("xlsx"),
      sheets: null,
      inputFileOnChange(e) { },
      run({ render, route, Handlebars, }) {
        render({ ...route })
        $(document).on('change', '#input_file', function (e) {
          const obj = e
          //2.如果没有选中文件则取消
          if (!obj.target.files) {
            return
          }
          console.log(obj.target.files)
          //3.获得选择的文件对象
          var f = obj.target.files[0]
          //4.初始化新的文件读取对象，浏览器自带，不用导入
          var reader = new FileReader();
          //5.绑定FileReader对象读取文件对象时的触发方法
          reader.onload = function (e) {
            //7.获取文件二进制数据流
            var data = e.currentTarget.result;
            //8.利用XLSX解析二进制文件为xlsx对象
            var wb = XLSX.read(data, { type: 'binary' })
            //9.利用XLSX把wb第一个sheet转换成JSON对象
            console.log(wb)
            $("[name='sheet_names']").html(Handlebars.compile(`
            {{#each @root}}
              <option value="{{@index}}">{{this}}</option>
            {{/each}}
            `)(wb.SheetNames))
            //wb.SheetNames[0]是获取Sheets中第一个Sheet的名字
            //wb.Sheets[Sheet名]获取第一个Sheet的数据
            var j_data = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]])
            //10.在终端输出查看结果
            console.log(j_data)
            $(document).on('change', "[name='sheet_names']", function (e) {
              console.log(e)
              console.log($(e.target).val())
              console.log(wb.Sheets[wb.SheetNames[$(e.target).val()]])
              const sheet = wb.Sheets[wb.SheetNames[$(e.target).val()]]
              console.log(sheet)
              let upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
              let t_head = [];
              for (let i = 0; i < upper.length; i++) {
                if (!sheet[upper[i] + '1']) { break }
                // console.log(sheet[upper[i] + '1']['v'])
                t_head.push(sheet[upper[i] + '1']['v'].trim())
              }
              console.log(t_head)
              var j_data = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[$(e.target).val()]])
              //10.在终端输出查看结果
              console.log(j_data)
              $("[name='sheet_table']").html(Handlebars.compile(`
              <caption>{{caption}}</caption>
              <thead>
                <tr>
                  <th>#</th>
                  {{#each thead}}
                  <th>{{this}}</th>
                  {{/each}}
                </tr>
              </thead>
              <tbody>
                {{#each tbody as | body |}}
                  <tr>
                    <th>{{@index}}</th>
                    {{#each @root.thead as | head |}}
                    <td>{{head}}</td>
                    {{/each}}
                  </tr>
                {{/each}}
              </tbody>
              `)(({
                caption: wb.SheetNames[$(e.target).val()],
                thead: t_head,
                tbody: j_data
              })))
            })
          }
          //6.使用reader对象以二进制读取文件对象f，
          reader.readAsBinaryString(f)

        })

      }
    };
  });
})(define);
