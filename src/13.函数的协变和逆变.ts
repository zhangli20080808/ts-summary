/**
 * 函数的协变和逆变
   协变 - 函数的返回值
   逆变 - 函数的参数可以逆变，可以传递父亲
 * A<=B  意味着A是B的子类型
 * A->B 指的是以A为参数类型，以B为返回值类型的函数类型
 * x:A 意味着X的类型为A
 *
 * 返回值是协变的  而参数类型是逆变的 如何理解呢？
 *
 *
 * 返回值类型可以传子类，参数可以传父类
 * 参数逆变父类 返回值协变子类  (参你父，返鞋子)
 */

class Parent {
  address: string = 'dt';
}
class Child extends Parent {
  money: number = 100;
}
class GrandSon extends Child {
  name: string = 'zl';
}

type MyFn = (person: Child) => Child;

function getFn(cb: MyFn) {}


// 逆变 - 函数的参数可以逆变，可以传递父亲
getFn((person: Parent) => new Child());
getFn((person: Child) => new Child());
getFn((person: GrandSon) => new Child()); // 只能传递父亲和自己


// 协变 - 函数的返回值
getFn((person: Child) => new Parent());
getFn((person: Child) => new GrandSon());



export {};
