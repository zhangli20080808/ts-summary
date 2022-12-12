/**
 * 类型推断 - ts会自动的尝试分析变量的类型，如果ts能够自动分析变量类型，我们就什么都不用做了，
 *           如果ts无法分析变量类型的话，我们就需要类型注解
 * 1. 赋值时会去推断
 * 2. 函数默认会进行推断 函数会根据右边的类型 推到左边的类型 不用标注sum类型
 * 3. 返回值的推断
 * 4. 属性判断
 
 */

// const sum: (a: string, b: string) => string
const sum = (a: string, b: string): string => {
  return a + b; // return {a,b}
};
// 类型注解 - 这种显示的声名count变量是一个number类型数据的写法，称为类型注解，由我们来告诉ts变量是什么类型
let count: number;
//  属性推断，类型推导
let school = {
  name: 'zhangLi',
  age: 20,
};

// let names = 'zl';
// console.log(names.toUpperCase()) // 内部会自动包装成 对象类型
// console.log(new String(names).toUpperCase())

type MySchool = typeof school;
// 类型的反推 把某个类型拿出来再去使用

// 通过索引访问操作符获取类型中的类型
interface ISchool {
  name: string;
  age: number;
  address: {
    n: string;
  };
  load: () => void;
  lo(): number;
}
type Test = ISchool['address']['n']; // 接口中取属性 只能使用[]

interface ActionContext {
  (state: string, commit: any): void;
}
let actionContext: ActionContext = (state, commit): void => {
  console.log('state', state, commit);
};
export {};
