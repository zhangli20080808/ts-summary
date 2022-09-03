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

function testDecorator() {
  return function <T extends new (...args: any[]) => any>(constructor: T) {
    return class extends constructor {
      name = '456';
      getName() {
        return this.name;
      }
    };
  };
}

// Test 已经是装饰器装饰之后的类了，所以我们可以点出getName方法
const Test = testDecorator()(
  class Test {
    name: string;
    constructor(name: string) {
      console.log(1);
      this.name = name;
      console.log(2);
    }
  }
);

const test = new Test('123');
console.log(test.getName());
export {};
