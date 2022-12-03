/**
   特性
   Typescript 更像Java,让Js可以开发大型企业应用，弱类型可能会隐藏很多错误，ts不会取代ts，只是类型校验
   ts提供的类型系统帮助我们在写代码时丰富的语法提示
   编写代码时，会对代码进行类型检查从而避免很多的线上错误

 * 1. 基础类型  - 字符串 数字 布尔类型 元组 枚举 any null undefined symbol void
   -> 对应的包装类型 Number、Boolean、String、Object、Symbol
 * 2. 对象类型  - 把基础类型合并到一起的一种复杂类型 比如 teacher
 */

// 基础类型
let married: boolean = false;
let age: number = 123;
let firstName: string = 'zl';

/** ====================================  对象类型 对象 数组 函数  =========================**/

// 元组 - 表示 长度和个数都 (内容存放类型) 都限制好了
let tuple: [string, number, boolean] = ['zl', 123, true];
// 可以向元组中添加内容，不能通过索引添加属性，只能通过方法
// 只能放入元组中已经声明过的类型,此处push对象 会报错
tuple.push('name');
// 补充- 场景

// 类型的修饰
type tuple2 = [string, number?];
let tupleL: tuple2 = ['1'];
/**
 * 使用场景 比如csv 文件格式的转化
 */
const testList: [string, string, number][] = [
  ['zk', 'male', 20],
  ['zl', 'female', 21],
  ['zc', 'male', 20],
];

// 对象类型
const teacher: {
  name: string;
  age: number;
} = {
  name: 'zl',
  age: 18,
};

// object 除了 number, string, boolean, bigint , symbol, null, or undefined，其他都是 object。
// 使用场景： 比如平时传入的参数是对象，类型又想使用object
const create = (obj: object) => {};

create('123123') // 基本类型
create(null)
create({});
create([]);
create(function () {});

// 注意：如果不在自己定义的模块内 声名name会报错 因为全局下已经声名了name，
// 解决方式：将当前文件变成模块 export {}
let name = '1';

// 数组 存放一类类型的集合

let arr1: number[] = [1, 2, 3];
let arr2: undefined[] = [undefined, undefined];
let arr33: (number | string)[] = [1, 2, '3'];

type User = { name: string; age: number };
let objectArr: User[] = [{ name: '123', age: 10 }];

// 其他的case，比如 JSON.parse()并不会帮我们自动去推断
interface Name {
  name: string;
}

const rowData = '{"name":"zl"}';
const newData: Name = JSON.parse(rowData);

/* ================         联合类型              ================*/
// 联合类型可以看做并集，既能使用字符串，也能使用数字。当没有初始化的时候，只能调用两者中公有的方法
// 联合类型最主要的使用场景还是 条件类型 部分
let arr3: (string | number)[] = [1, 2, 3, '4'];
let arr4: Array<string | number> = [1, 2, 3, '4'];

let ele: HTMLElement | null = document.getElementById('id');
ele!.style.color = 'red'; // ! 非空断言，一定有值 ts语法只能存在ts中
// ele?.style.color = 'red'; // ele&&ele.style

// 把值当做类型的时候，值就和类型相同
type Increase = Boolean | 1 | 0;
function mounted(isStartUp: Increase): void {
  if (isStartUp) {
    console.log('yes');
  } else {
    console.log('no');
  }
}
mounted(0);
// 类型断言 不能断言不存在的属性
(ele as HTMLElement).style.color = 'green';
/** ====================================  undefined | null | void  =========================**/
// null undefined 任何类型的子类型
// 在严格模式空检查模式下 - strictNullChecks：true，不能将null，undefined赋值给num ，
// 在严格模式下，只能将null赋值给null undefined 赋予给 undefined
let num: number;
num = 123;
num = undefined;
num = null;

let str2: number | string | undefined;
str2 = undefined; // 不能将类型“undefined”分配给类型“string | number”
let u: undefined = undefined;
// void 只能接受 null 和 undefined  一般用于 函数的返回值
// 函数默认的返回值是 undefined 默认在严格模式下，不能讲null赋给void
let v: void;
// v= null // 严格模式报错
v = undefined;

/** ======== never类型 - 表示永远不会出现的类型，通常被用来收窄联合类型或是接口，或者作为条件类型判断的兜底 =======**/

/***
 * 1. never类型 永远不是任何类型的子类型 可以把never赋值给任意类型
 * 2. 永远达不到有三种情况 1.错误 2. 死循环 3.类型判断时会出现never
 * 3. 尤大对never类型的理解介绍 https://www.zhihu.com/question/354601204/answer/888551021
 */

// let n!: never;
// str2 = n;

function MyError(): never {
  throw new Error('xxx'); // 1. 错去情况
}
function whileTue(): never {
  while (true) {} // 2. 死循环
}
// byType 方法 穷尽了 DataParams 的所有可能类型
// 使用never避免出现未来拓展新的类没有对用类型的实现，目的就是写出绝对安全的代码
type DataParams = string | number
function byType(val: DataParams) {
  if (typeof val === 'string') {
    val.replace('a', '');
  } else if (typeof val === 'number') {
    val.toFixed;
  } else {
    // 取不到类型或值得时候 都是never， 为未来的某个数据类型预留触控键
    // 比如参数类型 val 没有 boolean的时候, 此处val是never，如果传入 boolean ，val就是 boolean
    val; // never 主要永远完整性和标识出错的情况
  }
}
let n = MyError(); // n->never

// Symbol BigInt Symbol表示独一无二 比如做一些常量 或者一些私有属性 都可以使用Symbol
// BigInt - 对最大安全数字再进行操作，可能会不准确, 有溢出的现象


let s1 = Symbol('zl');
let s2 = Symbol('zl');
console.log(s1 === s2); // false

// let num1 = Number.MAX_SAFE_INTEGER + 1;
// let num2 = Number.MAX_SAFE_INTEGER + 2;
// console.log(num1 === num2); // true

let num3 = BigInt(Number.MAX_SAFE_INTEGER) + BigInt(1);
let num4 = BigInt(Number.MAX_SAFE_INTEGER) + BigInt(2);
console.log(num3 === num4); // false 包装之后 false


/** ======== 类型的问题  1. 类型推断 2. 类型问题  =======
 number和Number的区别？ 
 大小写的区别 string - String  前者的string只是后者String类型的一个表现
**/


// 11..toString()  11.0.toString
let number1: number = 123; // 基本类型，小写number标准
let number2: Number = 123;
let number3: number = Number(11); // 转成number赋值给number，也行
// let number4 :number = new Number(11) {}  错误语法  不能把实例赋值给基本类型
// 类也是一个类型 可以描述实例 也可以描述基本类型，一般我们标注类型都使用基本类型
// https://juejin.cn/post/6844903710120738824 -》思考类型使用具体情节
let number5: Number = new Number(11);

/**
 tuple  tuple 是 “数量固定，类型可以各异” 版的数组。
 典型的元组
 在 React 中有可能使用 tuple 的地方就是 custom hook 的返回值，注意 isHappy → tomIsHappy 以及其他名字的变化，这里使用 tuple 的好处就显现出来了：便于使用者重命名：

 const useHappy = () => {
   //....
   return [isHappy, makeHappy, makeUnHappy]
}

 const SomeComponent = () => {
  const [tomIsHappy, makeTomHappy, makeTomUnHappy] = useHappy(false)
  // ...
}
 */
// 啥时候需要声明类型 理论上来说在我们声明任何变量的时候都需要声明类型（包括普通变量、函数、组件、hook 等等），
// 声明 函数、组件、hook 等需要声明参数 和 返回值的类型。

/**
4.x版本的一些新特性
1. const 为何也能被修改？ 如何解决
 */
const arrList = [1, 2, 3, 'zhangLi'];
arrList[0] = 4;

// 通过  as const 对数组种每一个元素做了一个只读限制，导致无法修改
const arrList2 = [1, 2, 3, 'zhangLi'] as const;
// arrList2[0] = 4  //报错 无法分配到 "数组的索引为0的位置的元素" ，因为它是只读属性。ts(2540)

function showArr(arr: readonly any[]) {
  // readonly 不允许修改
  console.log(arr);
}
// 取值问题
let obj: object = { username: 'zl', age: 18 };
const username = 'username';
let results = (obj as any)[username];
showArr(arrList2);

/** ====================================  枚举类型  =========================**/

// 为什么使用枚举？ - 解决多次 if/switch 判断中值的语义化问题
// 1. 常量解决 2. 常量解决带来的局限性

// 定义- 用来存放一组固定的常量的序列
// 枚举分类

// 字符串枚举
enum WeekEnd {
  Monday = 'Monday',
  Tuesday = 'Tuesday',
  Wednesday = 'Wednesday',
  Thursday = 'Thursday',
  Friday = 'Friday',
  Saturday = 'Saturday',
  Sunday = 'Sunday',
}
console.log(WeekEnd.Monday);
console.log(WeekEnd['Monday']);

// 枚举类型 - 简答理解，就是一个个列出来
// 普通常量标识
const STATUS = {
  nf: 'xxx',
  na: '401',
};
// 数字枚举
// enum USER_ROLE {
//   USER = 0, // 默认下标是从0开始
//   ADMIN, // 第二个常量值自动递增1 就为1
//   MANAGE, // 第二个常量值自动递增2 就为2
//   FINAL, // 第二个常量值自动递增3 就为3
// }
// // 默认可以正向取出，也可以反举(字符串不可以，数字可以)
// console.log(USER_ROLE[0]); // USER
// console.log(USER_ROLE['USER']); // 0
// // 异构枚举，可以在枚举中放不同的类型 可以通过数字向下推断

// // 常量枚举 默认只是提供了一个类型
// const enum USER_ROLES {
//   USER,
//   ADMIN,
// }
// console.log(USER_ROLES.ADMIN);

enum EnumAuditStatus {
  MANAGE_ADUIT_FAIL = 'PD审核失败',
  NO_ADUIT = '没有审核',
  FINAL_ADUIT_SUCCESS = 'CW审核通过',
}
console.log(EnumAuditStatus.MANAGE_ADUIT_FAIL); // PD审核失败
console.log(EnumAuditStatus['MANAGE_ADUIT_FAIL']); // PD审核失败

// 字符串枚举
enum Transpiler {
  Babel = 'babel',
  Postcss = 'postcss',
  Terser = 'terser',
  Prettier = 'prettier',
  TypeScriptCompiler = 'tsc',
}
const transpiler = Transpiler.TypeScriptCompiler;

// 异构枚举 可以在枚举中放不同的类型 可以通过数字向下推断

// 枚举的应用
// 枚举的好处 1. 有默认值和自增值，节省了编码时间  2. 语义清晰，可读性强(直观)
// 1. 常量解决 2. 常量解决带来的局限性（方法参数不能定义为具体的类型，只能初级使用number，string）基本类型代替，降低了代码的可读性可维护性
// 枚举的定义 -
const UserRole = {
  USER: -1,
  ADMIN: 0,
  MANAGE: 1,
  FINAL: 2,
};
class CheckUserRole {
  // 此处用常量表示并不完善 此处的number范围太广，不能直观的表示role的意思
  // 如果 有某种数据类型能够去约束此处变量真实的类型，就更为直观了，考虑项目大了之后
  getUserRole(role: number) {
    if (role === UserRole.USER) {
      console.log('aaaa -1');
    } else if (role === UserRole.ADMIN) {
      console.log('aaaa 0');
    } else if (role === UserRole.FINAL) {
      console.log('aaaa 2');
    }
  }
}
// 使用 枚举准备确定 role的类型
enum USER_ROLE {
  USER = 0, // 默认下标是从0开始
  ADMIN, // 第二个常量值自动递增1 就为1
  MANAGE, // 第二个常量值自动递增2 就为2
  FINAL, // 第二个常量值自动递增3 就为3
}
// 默认可以正向取出，也可以反举(字符串不可以，数字可以)
console.log(USER_ROLE[0]); // USER
console.log(USER_ROLE['USER']); // 0
class CheckUserRoleEnum {
  getUserRole(role: USER_ROLE) {
    if (role === USER_ROLE.USER) {
      console.log('aaaa -1');
    } else if (role === USER_ROLE.ADMIN) {
      console.log('aaaa 0');
    } else if (role === USER_ROLE.FINAL) {
      console.log('aaaa 2');
    }
  }
}

// 枚举的分类 - 数字枚举

// TS还支持 字面量类型，也就是类似 111 ,'aaaa', {a:1} 这种值也可以作为类型

// 字面量 分为两种 1. 普通的 -》 'aaa' 2. 模版字面量  aaa${string} -> 表示以aaa开头，后面是任意string的字符串字面量类型

// 比如约束 某个字符串开头的字符串字面量类型
function startFn(str: `#${string}`) {}
const testA = startFn('123'); // 错误
const testB = startFn('#123'); // 正确

// 特殊类型
// never 代表不可达，比如函数抛异常的时候，返回值就是 never。
// void 代表空，可以是 undefined 或 never。
// any 是任意类型，任何类型都可以赋值给它，它也可以赋值给任何类型（除了 never）。
// unknown 是未知类型，任何类型都可以赋值给它，但是它不可以赋值给别的类型。

const magicFunction = (params: any) => {
  console.log(Math.round(params)); // number
  console.log(params.charAt(0)); // string
  console.log(params.push(1)); // array
};
const magicFunction1 = (params: unknown) => {
  console.log(Math.round(params)); // number
  console.log(params.charAt(0)); // string
  console.log(params.push(1)); // array
};
// 如果要对unknown进行操作，必须使用类型断言或者缩小到特定的类型
const magicFunction2 = (params: unknown) => {
  if (typeof params === 'number') {
    console.log(Math.round(params));
  } else if (typeof params === 'string') {
    console.log(params.charAt(0));
  } else if (Array.isArray(params)) {
    params.push(1);
  }
  throw Error('error');
};

export {};
