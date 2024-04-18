"use strict";

(function (requirejs) {
  if (window.location.hash === "") {
    window.location.hash = "#/";
    return
  }
  define(["./app.config"], function (config) {
    requirejs(config.requirejsConfig);

    // config.env === "dev" ? require([`css!${config.staticPath}/src/assets/css/main.css`]) : require(["css!./../src/assets/css/main.css"]);

    // 运行
    // let frame = document.scripts[document.scripts.length - 1].getAttribute("data-frame") || "static";
    // require([frame]);

    requirejs([
      "jquery",
      "handlebars",
      `text!${config.env === "dev" ? config.staticPath : 'https://langnang.github.io'}/${config.components.header}`,
      `text!${config.env === "dev" ? config.staticPath : 'https://langnang.github.io'}/${config.components.footer}`,
      "./src/routes/index",
      "bootstrap",
      "holderjs",
      `css!${config.env === "dev" ? config.staticPath : './..'}/src/assets/css/main.css`
    ], function ($, Handlebars, headerComponent, footerComponent, router) {
      $("body>header").html(Handlebars.compile(headerComponent)(config));
      $("body>footer").html(Handlebars.compile(footerComponent)(config));
      router.init()
    });
  });
})(requirejs);
