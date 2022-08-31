/**
 * ts的类型编程  - 类型体操
 * 泛型 - 声明时把会变化的类型声明成泛型（也就是类型参数），在调用的时候再确定类型。
 *
 */

// 一个返回对象某个属性值的函数，对应类型如何 承载呢？
// function getPropValue<T>(obj: T, key): key对应的属性值类型 {
//   return obj[key];
// }

// 如何对传入的参数 进一步处理呢？
// 对传入的 类型参数(泛型) 做各种逻辑运算，产生新的类型，这就是类型编程
function getPropValue<T extends object, Key extends keyof T>(
  obj: T,
  key: Key
): T[Key] {
  return obj[key];
}
// keyof T、T[Key] 就是对类型参数T 的类型运算

// 类型逻辑是对类型参数的处理
// ParseQueryString<'a=1&b=2&c=3'>