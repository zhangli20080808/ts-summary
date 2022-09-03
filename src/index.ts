/**
 * 
 * @param target 普通方法，target 对应的是类的 prototype
   静态方法，target对应的是 类的构造函数
 * @param key - 装饰的方法名 
 * @param descriptor - 可以对方法做很多拓展 

 */
function getNameDecorator(
  target: any,
  key: string,
  descriptor: PropertyDescriptor //对函数方法做修饰，比如不能修改等
) {
  // console.log(target,key);
  descriptor.writable = true // 不能重写该方法
  // value 属性或者方法原始的值，才考 defineProperty 属性
  descriptor.value = function(){
    return '装饰之后的返回值'
  }
  
}
// @decorator1
class Test {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  @getNameDecorator
  getName() {
    return this.name;
  }
}
const test = new Test('zl');
(test as any).getName();
console.log(test.getName());
export {};
