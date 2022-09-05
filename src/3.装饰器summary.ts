// 装饰器  拓展属性和方法 或者重写 装饰器就是函数 函数返回函数 执行完成之后还是函数
// 使用装饰器的目的 语法糖 为了使用简单
// 范围 只能装饰类 不能装饰函数(以为函数会变量提升)

//
function aaa(target: any) {
  console.log('2');
}

function xxx(target: any) {
  console.log(1);
  // 修饰类本身当前参数就是类 一个参数
  target.prototype.say = function () {
    console.log('say');
  };
}

/**
 * 注意：使用属性装饰器，直接修改类上的属性是做不到的
要注意区分 修改的是实例上的属性 还是原型上的属性
 * @param target 原型
 * @param key 属性
 */
function toUpperCase(target: any, key: string) {
  console.log(target, key, 'names', target[key]);
  let value = target[key];
  Object.defineProperty(target, key, {
    get() {
      return value.toUpperCase();
    },
    set(newVal) {
      value = newVal;
    },
  });
}
function double(num: number) {
  return function (target: any, key: string) {
    //修饰静态属性 target 类
    let value = target[key];
    Object.defineProperty(target, key, {
      get() {
        return value * num;
      },
    });
  };
}

/**
 * 将 getName 转换为可枚举属性
   @param target 普通方法，target 对应的是类的 prototype
   静态方法，target对应的是 类的构造函数
 * @param key - 装饰的方法名 
 * @param descriptor - 可以对方法做很多拓展 
  // configurable: true enumerable: true value: ƒ () writable: true
 * @param description Object.defineProperty 的第三个参数  configurable enumerable  value
 */
function toEnum(target: any, key: string, description: PropertyDescriptor) {
  // console.log(target, key, description);
  // configurable: true enumerable: true value: ƒ () writable: true
  description.enumerable = false;
}

// function namePrivateDecorator(
//   target: any,
//   key: any,
//   description: PropertyDescriptor
// ) {
//   description.writable = false;
// }

/**
 *
 * @param target 原型
 * @param method 方法名
 * @param paramIndex 参数所在的位置
 */
function paramDecorator(target: any, method: any, paramIndex: number) {
  console.log(target, method, paramIndex);
}

@aaa
@xxx
class Person {
  say!: Function;
  // 比如初始化的时候装饰属性
  @toUpperCase
  name: string = ' zhangLi'; // 直接默认走set
  // private _name = 'private_name';
  @double(3)
  static age: number = 10; // 修改类静态属性时 不会走set方法

  @toEnum
  getName(@paramDecorator name: string, age: number) {}

  // 访问器的装饰器
  // get namePrivate() {
  //   return this._name;
  // }
  // @namePrivateDecorator set get 访问器加一个就ok
  // set namePrivate(str: string) {
  //   this._name = str;
  // }
}

let person = new Person();
// 需要在类中生命 say方法 不然会报错
// person.say();
console.log(person.name); // ZHANGLI
console.log(Person.age); // 30

export {};
