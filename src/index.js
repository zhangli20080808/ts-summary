"use strict";
exports.__esModule = true;
var Week;
(function (Week) {
    Week[Week["Monday"] = 1] = "Monday";
    Week[Week["Tuesday"] = 2] = "Tuesday";
    Week[Week["Wednesday"] = 3] = "Wednesday";
    Week[Week["Thursday"] = 4] = "Thursday";
    Week[Week["Friday"] = 5] = "Friday";
    Week[Week["Saturday"] = 6] = "Saturday";
    Week[Week["Sunday"] = 7] = "Sunday";
})(Week || (Week = {}));
var WeekEnd;
(function (WeekEnd) {
    WeekEnd["Monday"] = "Monday";
    WeekEnd["Tuesday"] = "Tuesday";
    WeekEnd["Wednesday"] = "Wednesday";
    WeekEnd["Thursday"] = "Thursday";
    WeekEnd["Friday"] = "Friday";
    WeekEnd["Saturday"] = "Saturday";
    WeekEnd["Sunday"] = "Sunday";
})(WeekEnd || (WeekEnd = {}));
console.log(WeekEnd.Monday);
console.log(WeekEnd['Monday']);
