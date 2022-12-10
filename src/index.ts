type StartWith<
  Str extends string,
  Prefix extends string
> = Str extends `${Prefix}${string}` ? true : false;

type StartWithRes = StartWith<'guanAndGong', 'guan'>; // true
type StartWithRes2 = StartWith<'guanAndGong', 'aguan'>; // false
export {}; // 在当前文件搜索
