// 使用模块的方式
declare module "JQueryM" {
  type CssSelector = { css: (ket: string, value: string) => CssSelector };
  function ajax(url: string, setting?: any): void;
  let name: string;
  function $(ready: () => void): void;
  function $(selector: any): CssSelector;
  // 嵌套的命名空间
  namespace $ {
    function extend(url: string, setting?: any): void;
    function post(url: string, setting?: any): void;
  }
  export = $;
}

// 使用
// import $ from "JQueryM";
// $("div").css("marginTop", "10px");
