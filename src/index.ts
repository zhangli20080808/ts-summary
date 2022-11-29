enum EnumAuditStatus {
  MANAGE_ADUIT_FAIL = 'PD审核失败',
  NO_ADUIT = '没有审核',
  FINAL_ADUIT_SUCCESS = 'CW审核通过',
}
console.log(EnumAuditStatus.MANAGE_ADUIT_FAIL); //PD审核失败
console.log(EnumAuditStatus['MANAGE_ADUIT_FAIL']); //MANAGE_ADUIT_FAIL

export {}; // 在当前文件搜索
