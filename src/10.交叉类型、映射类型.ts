// 交叉类型
type objType = { a: number } & { b: number };
type res = { a: number } extends objType ? true : false; // false
type res2 = { a: number; b: number } extends objType ? true : false; // true

// 注意，同一类型可以合并，不同的类型没法合并，会被舍弃
type res3 = 'aaa' & 2222; // never
interface Person1 {
  handsome: string;
}

interface Person2 {
  name: string;
}

type Person3 = Person1 & Person2;
let person: Person3 = {
  // 交叉的部分
  handsome: '1',
  name: 'zl',
};

interface Person4 {
  name: string;
}

interface Person5 {
  name: number;
}

// type Person6 = Person4 & Person5; //string  number  ->never

// function xxx(): never {
//     throw new Error('');
// }
//
// let person7: Person6 = {
//     name: xxx(),
// };

// 常用 多个对象的合并
function mixin<T, K>(obj1: T, obj2: K): T & K {
  let result = {} as T & K;
  for (let id in obj1) {
    result[id] = obj1[id] as any;
  }
  for (let id in obj2) {
    // @ts-ignore
    if (!result.hasOwnProperty(id)) {
      result[id] = obj2[id] as any;
    }
  }
  return result;
}

// let r = mixin({a: 1}, {b: 2});

// 映射类型 - 对象、class、在ts对应的类型是 索引类型，如何对索引类型做修改呢？-> 映射类型
type MapType<T> = {
  [Key in keyof T]?: T[Key];
};
// keyof T 是查询索引类型中所有的索引，叫做 索引查询
// T[Key] 是取索引类型某个索引的值，叫做  索引访问
// in 是用于遍历联合类型的运算符

// 将一个索引类型的值 变成 3个元素的数组
type MapType2<T> = {
  [Key in keyof T]: [T[Key], T[Key], T[Key]];
};
type Res4 = MapType2<{ a: 1; b: 2 }>;
const a: Res4 = { a: [1, 1, 1], b: [2, 2, 2] };

// 映射类型就相当于 把一个集合映射到另一个集合，除了值变化，索引也可以做变化，使用as
type MapType3<T> = {
  [Key in keyof T as `${Key & string}${Key & string}${Key & string}`]: [
    T[Key],
    T[Key],
    T[Key]
  ];
};
type Res5 = MapType3<{ a: 1; b: 2 }>;
const b: Res5 = {
  aaa: [1, 1, 1],
  bbb: [2, 2, 2],
};

// 索引类型 对象、class 是可以使用string number symbol 作为key
// keyof T  取出的索引类型就是 string | number | symbol 的联合类型 和 string 取交叉剩下的部分就只剩下 string 
export {};
