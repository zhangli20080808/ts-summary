enum USER_ROLE {
  USER = 0, // 默认下标是从0开始
  ADMIN, // 第二个常量值自动递增1 就为1
  MANAGE, // 第二个常量值自动递增2 就为2
  FINAL, // 第二个常量值自动递增3 就为3
}
console.log(USER_ROLE[0]); // USER
console.log(USER_ROLE['USER']); // 0




export {}; // 在当前文件搜索
