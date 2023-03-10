"use strict";
exports.__esModule = true;
exports.fetchPinesDefault = exports.fetchMobile = exports.fetchStuff = exports.fetchStudent = exports.fetchTeacher = exports.fetchData = void 0;
/**pines数据库相关api
 * 作者：Alla
 */
// import axios from 'axios'
var request_1 = require("../utils/request");
//存放前端调用的接口
//TODO：将本页更名为pines_index.ts
//本地静态数据
exports.fetchData = function () {
    return request_1["default"]({
        url: './table.json',
        method: 'get'
    });
};
exports.fetchTeacher = function () {
    return request_1["default"]({
        url: './teacher.json' || '/teachermanage'
    });
};
exports.fetchStudent = function () {
    return request_1["default"]({
        url: './student.json' || '/studentmanage',
        method: 'get'
    });
};
exports.fetchStuff = function () {
    return request_1["default"]({
        url: './stuff.json' || '/stuffmanage',
        method: 'get'
    });
};
exports.fetchMobile = function () {
    return request_1["default"]({
        url: './mobile.json' || '/mobilemanage',
        method: 'get'
    });
};
/**松树默认数据获取
 * 第一页，无分类无排序
 * @returns
 */
exports.fetchPinesDefault = function () {
    return request_1["default"]({
        url: '/pinesInfo',
        method: 'get'
    });
};
