/**
类的装饰器
如果是修饰类的装饰器，接受的参数应该是类的构造函数
使用方式 - 通过@符号使用
执行时 - 当类创建好之后就回去执行,不是每次实例化的时候去执行
多个装饰器 执行 -》从下向上执行 装饰器，先收集的装饰器后执行
 */

/**
 * 拿到类的构造函数，新增原型方法  say
 * @param constructor 装饰器的参数 -》类的构造器
 * @param flag 可以根据条件判断返回装饰器类型
 */
function testDecorator(flag: boolean) {
  console.log('decorator');
  // constructor.prototype.say = function () {
  //   console.log('say');
  // };
  if (flag) {
    return function (constructor: any) {
      constructor.prototype.say = function () {
        console.log('say');
      };
    };
  }
  return function (constructor: any) {};
}
// function decorator1(target: any) {
//   console.log('decorator1');
// }

@testDecorator(true)
// @decorator1
class Test {}
const test = new Test();
(test as any).say()
export {};
