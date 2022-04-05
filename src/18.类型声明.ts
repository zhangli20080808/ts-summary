/**
 类型声明 
 1. 声明文件可以让我们不需要将js重构为ts，只需要加上声明文件就可以使用系统
 2. 类型声明在编译的时候会被删除(declare 给编辑器看的,提示用的)，不会影响真正的代码
 3. 关键字 declare 标识声明的意思 我们可以使用它来各种声明  不用去管他的实现 如果没有 declare 只有 namespace 需要实现

 关键字 declare 表示声明的意思，我们可以用他来做各种声明 

 declare var // 声明全局变量
 declare function
 declare class  // 声明全局类
 declare enum  // 声明全局枚举类型
 declare namespace // 声明含有子属性的全局变量 在命名空间内部不需要再使用 declare 了
 interface 和type 声明全局类型 -》 对于这两种类型是不需要添加 declare关键字的

 普通类型声明文件
 declare let age: string
 declare function getName(): string
 declare class Animal {
    name: string
 }
 getName()
 new Animal()

 */
declare type CssSelector = { css: (ket: string, value: string) => CssSelector };
// declare function $1(ready: () => void): void;
// declare function $1(selector: any): CssSelector;

// 一般理解 namespace 可以把他但你工作一个对象 主要还是区别到底是属于哪一个命名空间下的类型
// 外部使用的 declare 声明 内部就不能再用了，但是可以使用export的
// 目前使用的话，必须通过 JQuery. 的方式 如果想直接使用 需要借助模块的概念
declare namespace JQuery {
  function ajax(url: string, setting?: any): void;
  let name: string;
  export function $(ready: () => void): void;
  export function $(selector: any): CssSelector;
  // 嵌套的命名空间
  namespace $ {
    function extend(url: string, setting?: any): void;
    function post(url: string, setting?: any): void;
  }
}
JQuery.ajax("/test", {});
JQuery.name;
JQuery.$.extend("http");

//

/**
 * 类型声明文件 .d.ts 文件
 * 1.手写   2. 第三方声明文件
 * js中有很多内置对象，可以在ts中被当做已经声明好的类型
 * 内置对象是根据标准在global上的对象 这些内置对象的类型声明文件 就包含在ts核心库的声明文件中
 */



export {};
