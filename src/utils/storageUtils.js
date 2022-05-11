/*  
    进行loacl数据储存管理的工具模块
        但下面这种原生对一些浏览器有些兼容性问题
        可以使用store库 store库就是对原生的包装

*/
import store from 'store'
const USER_NAME = 'user_key'
export default {
//保存user
  saveUser(user){
     //   localStorage.setItem(USER_NAME,JSON.stringify(user));
            //参数必须为键值且都为字符串 setItem(key: string, value: string)
        store.set(USER_NAME,user)   //它会自带进行JSON化 
    },
//读取user
    getUser (){  //当getItem获取的键没有值会返回null
     //   return JSON.parse(localStorage.getItem(USER_NAME)||'{}')
            //我们希望得到的是原类型的数据,进行去json化,当为null是我们希望得到的是{}
        return  store.get(USER_NAME)   || {}
    },
//删除user
    removeUser(){
      //  localStorage.removeItem( USER_NAME)
        store.remove(USER_NAME)
    }
}
