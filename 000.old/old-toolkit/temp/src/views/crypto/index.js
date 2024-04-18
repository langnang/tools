"use strict";
(function (define) {
  define(function (require, exports, module) {
    const CryptoJS = require("crypto-js")
    module.exports = {
      template: require("text!./index.hbs"),
      CryptoJS,
      Crypto: {
        Base64: {
          encrypt(val) { return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(val)) },
          // decrypt(val) { return CryptoJS.enc.Base64.parse(val).toString(CryptoJS.enc.Utf8) },
        },
        MD5: {
          encrypt(val) { return CryptoJS.MD5(val) },
        },
        SHA1: {
          encrypt(val) { return CryptoJS.SHA1(val) },
        },
        SHA256: {
          encrypt(val) { return CryptoJS.SHA256(val) },
        },
        SHA512: {
          encrypt(val) { return CryptoJS.SHA512(val) },
        },
        SHA3: {
          encrypt(val) { return CryptoJS.SHA3(val) },
        },
        RIPEMD160: {
          encrypt(val) { return CryptoJS.RIPEMD160(val) },
        }

      },
      run({ route, Crypto, render }) {
        const encrypt = Crypto[route.name]['encrypt']
        const decrypt = Crypto[route.name]['decrypt']
        render({ ...route, encrypt, decrypt })
        $("#encrypt").click(function () {
          const str_encrypt = $("textarea[name='input']").val()
          if (str_encrypt == '') {
            alert('加密的内容不可为空！！！')
            return
          }
          $("textarea[name='output']").val(encrypt(str_encrypt))
        })
        $("#decrypt").click(function () {
          const str_decrypt = $("textarea[name='output']").val()
          if (str_decrypt == '') {
            alert('解密的内容不可为空！！！')
            return
          }
          $("textarea[name='input']").val(decrypt(str_decrypt))
        })
      }
    }
  })
})(define)
