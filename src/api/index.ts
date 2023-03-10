// /**pines数据库相关api
//  * 作者：Alla
//  */ 
// // import axios from 'axios'
// import request from '../utils/request'
// //存放前端调用的接口
// //TODO：将本页更名为pines_index.ts



// //本地静态数据
// export const fetchData = () => {
//     return request({
//         url: './table.json',
//         method: 'get'
//     });
// };

// export const fetchTeacher=()=>{
//     return request({
//         url:'./teacher.json'||'/teachermanage', 
//     })
// }

// export const fetchStudent=()=>{
//     return request({
//         url:'./student.json'||'/studentmanage',
//         method:'get'
//     })
// }

// export const fetchStuff=()=>{
//     return request({
//         url:'./stuff.json'||'/stuffmanage',
//         method:'get'
//     })
// }

// export const fetchMobile=()=>{
//     return request({
//         url:'./mobile.json'||'/mobilemanage',
//         method:'get'
//     })
// }

// /**松树默认数据获取
//  * 第一页，无分类无排序
//  * @returns 
//  */
// export const fetchPinesDefault =  () => {
    
//     return request({
//         url:'/pinesInfo',
//         method: 'get'
//     })
// }