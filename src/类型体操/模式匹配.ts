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
  Form extends string,
  To extends string
> = Str extends `${infer Prefix}${Form}${infer Suffix}`
  ? `${Prefix}${To}${Suffix}`
  : Str;
type ReplaceStrResult = ReplaceStr<'gandongis best friend is ?', '?', 'zhangLi'>;
