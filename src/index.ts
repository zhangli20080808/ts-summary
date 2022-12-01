// 数字枚举
enum Week {
  Monday = 1,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
  Sunday,
}
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
export {}; // 在当前文件搜索
