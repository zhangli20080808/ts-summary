/**
 * 模式匹配做提取
 * ts 类型的模式匹配是通过  extends 对参数做匹配，结果保存到infer声明的局部类型
 * 变量里，如果匹配到就能从该 局部变量中拿到 提取出的类型
 */
// type p = Promise<'zl'>;

// 如何提取value的类型呢？
// 1. 通过 extends 对参数 P 做模式匹配,通过infer 声明一个局部变量Value来保存
// 2. 如果匹配，就返回匹配到的Value，负责返回never，代表没有匹配到
type GetValueType<P> = P extends Promise<infer Value> ? Value : never;
type GetValueRes = GetValueType<Promise<{ name: 'zl' }>>;
// const demo: GetValueRes = {
//   name: 'zl',
// };

// 模式匹配的套路场景
// 1. 数组类型 - 比如 提取数组中第一个元素的类型
type arr = [1, 2, 3];
type GetFirst<Arr extends unknown[]> = Arr extends [infer First, ...unknown[]]
  ? First
  : never;

// 分析
// 1. 对 Arr 做模式匹配，把要提取的第一个元素的类型放到通过infer声明的 First局部变量里，
// 后面的元素可以是任意类型，用unknown接受 然后把局部变量 First 返回
type GetFirstRes2 = GetFirst<[1, 2, 3]>; // 1
type GetFirstRes3 = GetFirst<[]>; // nerve

// 2. 提取最后一个元素 - Last
type GetLast<Arr extends unknown[]> = Arr extends []
  ? []
  : Arr extends [...unknown[], infer Last]
  ? Last
  : never;
type GetFirstRes4 = GetLast<[1, 2, 3]>; // 3
type GetFirstRes5 = GetLast<[]>; // nerve

// 3. 提取 去掉了最后一个元素的数组 popArr
type popArr<Arr extends unknown[]> = Arr extends []
  ? []
  : Arr extends [...infer Rest, unknown]
  ? Rest
  : never;

type GetFirstRes6 = popArr<[1, 2, 3]>; // 3
type GetFirstRes7 = popArr<[]>; // nerve
// https://github.com/sisterAn/JavaScript-Algorithms

// 4. ShiftArr
type ShiftArr<Arr extends unknown[]> = Arr extends []
  ? []
  : Arr extends [unknown, ...infer Rest]
  ? Rest
  : never;

type GetFirstRes8 = ShiftArr<[1, 2, 3]>; // [1,2]
type GetFirstRes9 = ShiftArr<[]>; // nerve

// 字符串类型
// 1. 判断字符串是否以某个  前缀开头
// 用Str 去匹配一个模式类型，模式类型的前缀是 Prefix，后面是任意string
type StartWidth<
  Str extends string,
  Prefix extends string
> = Str extends `${Prefix}${string}` ? true : false;

type StartWidthRes = StartWidth<'guanAndGong', 'guan'>; // true

// 2. 字符串可以匹配一个模式类型，提取想要的部分，比如实现字符串替换
// 生命要替换的Str，待替换的字符串From,替换成的字符串
type ReplaceStr<
  Str extends string,
  From extends string,
  To extends string
> = Str extends `${infer Prefix}${From}${infer Suffix}`
  ? `${Prefix}${To}${Suffix}`
  : Str;
type ReplaceStrResult = ReplaceStr<
  'gandongis best friend is ?',
  '?',
  'zhangLi'
>;

// 3. trim
// 不知道有多少空白字符，所以需要一个一个去匹配，递归
// 类型参数 Str 是需要trim的字符串
// 如果 Str 匹配字符串 + 空白字符 (空格、换行、制表符)，那就把字符串放到 infer 声明的局部变量 Rest 里
// 把 Rest 作为类型参数递归 TrimRight，直到不匹配，这时的类型参数 Str 就是处理结果。

type TrimRight<Str extends string> = Str extends `${infer Rest}${
  | ' '
  | '\n'
  | '\t'}`
  ? TrimRight<Rest>
  : Str;
type TrimRes1 = TrimRight<'abcdefg    '>;
type TrimLeft<Str extends string> = Str extends `${
  | ' '
  | '\n'
  | '\t'}${infer Rest}`
  ? TrimLeft<Rest>
  : Str;
type TrimRes2 = TrimRight<'       abcdefg '>;
type Trim<Str extends string> = TrimRight<TrimLeft<Str>>;
type TrimRes3 = Trim<' agdsgsdgdsg '>;

// 函数 - 也可以做类型匹配，比如参数返回值的类型
// 1. GetParameters - 提取函数参数的类型
// 类型参数Func是要匹配的函数类型，通过extends来约束为 Function
// 参数类型放到 infer 声明的局部变量 Args中
type GetParameters<Func extends Function> = Func extends (
  ...args: infer Args
) => unknown
  ? Args
  : never;
type ParametersResult = GetParameters<(name: string, age: number) => string>;

// 2. 获取函数值的返回类型
// 注意：这里参数类型之所以是 any[] 是因为参数类型是要赋值给别的类型的，而unknown只能用来接受类型
type GetReturnType<Func extends Function> = Func extends (
  ...args: any[]
) => infer ReturnType
  ? ReturnType
  : never;
type ReturnTypeResult = GetReturnType<() => string>;
