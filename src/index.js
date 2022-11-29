'use strict';
exports.__esModule = true;
var USER_ROLE;
(function (USER_ROLE) {
  USER_ROLE[(USER_ROLE['USER'] = 0)] = 'USER';
  USER_ROLE[(USER_ROLE['ADMIN'] = 1)] = 'ADMIN';
  USER_ROLE[(USER_ROLE['MANAGE'] = 2)] = 'MANAGE';
  USER_ROLE[(USER_ROLE['FINAL'] = 3)] = 'FINAL';
})(USER_ROLE || (USER_ROLE = {}));
console.log(USER_ROLE[0]); // USER
console.log(USER_ROLE['USER']); // 0
