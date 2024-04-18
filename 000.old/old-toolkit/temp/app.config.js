"use strict";
(function (requirejs) {
  define(function (require, exports, module) {
    "use strict";
    const env = location.hostname === "127.0.0.1" ? "dev" : "prod";
    const staticPath = env === 'dev' ? './../langnang.github.io' : 'https://langnang.github.io';
    const config = env === 'dev' ? require("./../langnang.github.io/app.config.js") : require("https://langnang.github.io/app.config.js");
    const configs = {
      ...config,
      env,
      publicPath: env === "dev" ? "" : "/toolkit",
      staticPath
    };
    console.log(configs);
    module.exports = configs;
  });
})(requirejs);
