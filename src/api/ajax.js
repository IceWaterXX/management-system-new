// 能发送异步ajax请求的函数模块
/* 
    封装axios库
    函数的返回值是promise对象
*/
// import axios from 'axios'
// export default function ajax (url , data={},method) {
//     if(method === 'GET'){
//      return  axios.get(url,{
//          params : data
//      }) //get的参数在路径中,但我们是对象,还要结构拼串,可以直接传路径,传第二个配置对象的方式传参
//     }else if(method === 'POST') {
//         return axios.post(url,data)
//     }
// }
    // ajax('/login',{usename:'tom'},'POST')
//但是这样会导致我们每发一次请求就得写三个参数,而且对同一个接口发多次请求的代码重复很高,
//可以优化为每个接口都有一个发送请求的模块,这样只用为那个接口传一个参数(data)即可

//对错误进行统一处理优化版
import axios from 'axios'
import {message} from 'antd'
export default function ajax (url , data={},method) {
    let promise;
 return  new Promise((resolve,reject)=>{
      if(method === 'GET'){
     promise =  axios.get(url,{params:data}) 
      }else if(method === 'POST') {
     promise = axios.post(url,data)
      }
      promise.then(response=>{resolve(response)})
      .catch(err=>{
          message.error('请求出错了'+err.message)
      })   
  })
}