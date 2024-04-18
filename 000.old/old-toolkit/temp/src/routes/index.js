"use strict";

(function (define) {
  define(function (require, exports, module) {
    require("director")

    const Handlebars = require("handlebars")

    Handlebars.registerPartial('page-header', require("text!./../snippets/page-header.hbs"))
    Handlebars.registerPartial('app-container', require("text!./../snippets/app-container.hbs"))


    const $ = require("jquery")
    const config = require("./../../app.config")
    // 代理路由
    const proxyViews = {
      "/": "/static/index",
    }
    // 原始路由
    const routes = flattenRoutes([
      {
        name: "static",
        path: "",
        proxyPath: "/",
        component: "/home/index",
        children: [
          { name: "Home", path: "/" },
          require("./dev/index"),
          // require("./crawler/index"),
          require("./modules/editor"),
          require("./modules/crypto"),
          {
            name: "Code",
            description: "编解码",
            children: [{ name: "Unicode", path: "/unicode", component: "/code/unicode/index", hide: true }],
          },
          require("./modules/component"),
          require("./modules/form"),
          require("./modules/table"),
          require("./modules/multimedia"),
          require("./modules/icon"),
          require("./modules/random"),
          require("./modules/math"),
          // {
          //   name: "Script",
          //   description: "脚本",
          //   path: "/script",
          //   children: [
          //     {
          //       name: "batch-rename-file",
          //       description: "批量重命名文件",
          //       gist: {
          //         user: "langnang",
          //         repo: "ab983446919896623f070fe45375295c",
          //       },
          //       path: "/batch-rename-file",
          //       component: "views/script/index",
          //     },
          //   ],
          // },
          // {
          //   name: "UI",
          //   description: "用户界面布局",
          //   path: "/ui",
          //   children: [
          //     {
          //       name: "Neumorphism",
          //       description: "新拟态",
          //       path: "/neumorphism",
          //     },
          //     {
          //       name: "Frosted",
          //       description: "磨砂玻璃",
          //     },
          //     {
          //       name: "Balanced",
          //       description: "舒适配色",
          //     },
          //     {
          //       description: "3D 色彩",
          //     },
          //     {
          //       description: "渐变色彩",
          //     },
          //     {
          //       description: "3D 交互",
          //     },
          //     {
          //       description: "质感设计",
          //     },
          //     {
          //       description: "暗黑模式",
          //     },
          //     {
          //       description: "扁平设计",
          //     },
          //     {
          //       description: "手绘元素",
          //     },
          //     {
          //       description: "微交互",
          //     },
          //     {
          //       description: "微动画",
          //     },
          //     {
          //       description: "文字主导",
          //     },
          //     {
          //       description: "数据可视",
          //     },
          //     {
          //       description: "拇指移动",
          //     },
          //     {
          //       description: "留白设计",
          //     },
          //     {
          //       description: "使用视频",
          //     },
          //     {
          //       description: "不对称布局",
          //     },
          //   ],
          // },
          // {
          //   name: "Component",
          //   description: "组件",
          //   children: [
          //     {
          //       name: "Button",
          //       description: "按钮",
          //       path: "/button",
          //       component: "",
          //     },
          //   ],
          // },
          // { name: "Effect", description: "特效", children: [] },
          { name: "Multimedia", description: "多媒体" },
          require("./modules/office"),
          // { name: "Office", description: "文档" },
          // { name: "Interview", description: "面试题" },
        ],
      },
      // require("./vue/index"),
      // require("./react/index"),
      // require("./dev/index"),
    ])
    // console.log(routes)
    // 转换为符合 director 的路由格式
    function renderView(options) {
      options.path = options.path || window.location.hash.substr(1, window.location.hash.indexOf("?") === -1 ? window.location.hash.length : window.location.hash.indexOf("?") - 1)
      const route = options.routes[options.path]
      let callback = Object.assign(options, {
        route,
        Handlebars,
        template: `<div name="${options.path.substr(1).split("/").join("-")}-wrapper" class="row"></div>`,
        render: function (...args) {
          if (typeof args[0] == "string") {
            document.getElementById("app").innerHTML = args[0]
            return
          }
          // console.log(this)
          // 模板
          const template = args[0]['template'] || callback.template
          document.getElementById("app").innerHTML = Handlebars.compile(template)(args[0])
        },
        proxyViews,
        config,
        run() {
          this.render(this.template)
        },
        storage: {},
        setStorage(value, key) {
          key = key || route.path;
          const storage = JSON.parse(localStorage.getItem("toolkit")) || {};
          storage[key] = value;
          localStorage.setItem('toolkit', typeof storage === 'string' ? storage : JSON.stringify(storage))
        },
        getStorage(key) {
          key = key || route.path;
          const storage = JSON.parse(localStorage.getItem("toolkit")) || {};
          return storage[key] || null;
        }
      })
      if (route.component) {
        require(["./../../src/views" + route.component + ".js"], function (res) {
          // console.log(res)
          callback = Object.assign(callback, res)
          // console.log(callback)
          callback.run(callback)
        })
      } else {
        callback.run(callback)
      }
    }

    // 展平嵌套路由
    function flattenRoutes(routes, parent = "") {
      return routes.reduce((t0, t1) => {
        return {
          ...(t1.children ? flattenRoutes(t1.children, parent + (t1.path || "")) : {}),
          ...t0,
          [parent + (t1.proxyPath ? t1.proxyPath : t1.path || "")]: {
            ...t1,
            _path: t1.path,
            path: parent + (t1.path || ""),
          },
        }
      }, {})
    }

    module.exports = {
      proxy: proxyViews,
      routes,
      init() {
        window
          .Router(
            Object.keys(routes).reduce((total, val) => {
              total[val] = []
              return total
            }, {})
          )
          .configure({
            on: function (...args) {
              // console.log("on", args)
              $(document).ready(function () {
                $(".loading").fadeOut(1000)// 开启加载状态
              })
            },
            once: function (...args) {
              // console.log("once", args)
            },
            after: function (...args) {
              // console.log("after", args)
            },
            before: function (...args) {
              renderView({ routes, config, $ })// 渲染视图
              $(".loading").fadeIn(100)// 关闭加载状态

            },
          }).init()
      }
    }


  })
})(define)
