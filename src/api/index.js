//包含应用中所有接口请求的模块
import ajax from './ajax'
import jsonp from 'jsonp'
import { message } from 'antd';

//登录接口
// export function reqLogin (username,password) {
//   return   ajax('/login',{username,password},'POST')
// }
export const reqLogin = (username, password) => ajax('/api1/login', { username, password }, 'POST');



//  jsonp请求的函数
export const reqWeather = () => { //API会自动根据ip解析当前天气
    return new Promise((resolve, reject) => {
       jsonp('https://yiketianqi.com/free/day?appid=65346413&appsecret=LVHt6JLG ', {}, 
       // jsonp('https://v0.yiketianqi.com/api?appid=65346413&appsecret=LVHt6JLG&version=v61', {},   
            (err, data) => {
                if (!err) {
                    let nowWeather = data
                    resolve(nowWeather)
                }else{
                   message.error('获取天气信息失败')
                }
            })
    })
}


//获取商品的接口 一级或二级
 export  const getCategory = (parentId)=>ajax('/api1/manage/category/list',{parentId},'GET')
//添加分类
export const reqAddCategort =(categoryName, parentId)=>ajax('/api1/manage/category/add',{categoryName, parentId},'POST')
//更新分类
export const reqUpadteCategort = (categoryId,categoryName)=> ajax('/api1/manage/category/update',{categoryId,categoryName},'POST')

//获取商品分页列表
export const reqProducts = (pageNum,pageSize) => ajax('/api1/manage/product/list',{pageNum,pageSize},'GET')
//搜索产品分页接口 根据名称或描述productName 、 productDesc
export const reqSearchProducts = (pageNum,pageSize,searchName,searchType)=> ajax('/api1/manage/product/search',{pageNum,pageSize,[searchType]:searchName},"GET")

//获取分类的接口
    export const reqCategory = (categoryId)=>ajax('/api1/manage/category/info',{categoryId},'GET')

//更新商品的状态(上架或下架操作)    
export const reqUpdateStatus = (productId,status)=>ajax('/api1/manage/product/updateStatus',{productId,status},'POST')

//删除图片的请求函数
export const reqDeleteImg=(name)=>ajax('/api1/manage/img/delete',{name},'POST')

//商品添加的请求函数
export const reqAddProduct = (product) =>ajax('/api1/manage/product/add',product,'POST')
//商品更新的请求函数
export const reqUpadteProduct=(product)=>ajax('/api1/manage/product/update',product,'POST')

//获得用户的列表
export const reqRoles=()=>ajax('/api1/manage/role/list',{},'GET')

//添加角色的接口
export const reqAddRole=(roleName)=>ajax('/api1/manage/role/add',{roleName},'POST')

//更新角色的接口
export const reqUpdataRole=(role)=>ajax('/api1/manage/role/update',role,'POST')
//获取所有用户的列表
export const reqUsers = ()=>ajax('/api1/manage/user/list',{},'GET')
//删除用户
export const reqDeleteUser = (userId)=>ajax('/api1/manage/user/delete',{userId},'POST')
//添加用户接口
export const reqAddUserOrUpdate = (user) =>ajax('/api1/manage/user/'+(user._id?'update':'add'),user,'POST')