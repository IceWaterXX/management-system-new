import React, { Component } from 'react'
import './head.less'
import { reqWeather } from '../../api'
import memoryUtils from '../../utils/memoryUtils'
import { formateDate } from '../../utils/formateDate'
import maths from './gif'
import menuList from '../../config/menuConfig'
import { useLocation,useNavigate} from 'react-router-dom'
import { Modal} from 'antd';
import storageUtils from '../../utils/storageUtils'
import LinkButton from '../link-button/link-button'

let currentcity=''
export default function Head() {
  const [currentTime, setcurrentTime] = React.useState(formateDate(Date.now()))
  const [wea_img, setwea_img] = React.useState('')
  const [wea, setwea] = React.useState('')
  let timeon
  const getTime = () => {
    //每隔着1s获取最新时间
  timeon=  setInterval(() => {
      let currentTime = formateDate(Date.now())
      setcurrentTime(currentTime)
    }, 1000)
  }
  const getWeather = async () => {
   const {city,wea, wea_img}= await reqWeather()
    setwea(wea); setwea_img(wea_img);
    currentcity=city
  }
  React.useEffect(() => {
      getTime()
    getWeather()
    return ()=>{clearInterval(timeon)}
  },[])

  const { pathname } = useLocation()
  newpath = pathname.replace(/\/admin\//, '')
  const  navigate = useNavigate()

  getTitle(menuList)
  const logout =()=>{
    Modal.confirm({title:'确认要退出登录吗',onOk() {
      //删除保存的user数据 并跳转到login页面
      memoryUtils.user={}
      storageUtils.removeUser()
      navigate('/loading',{replace:true})
      },okText: '确认退出' ,cancelText:'取消'
    })
  }
  const username = memoryUtils.user.username
  return (
    <div className='headtitle'>
      <div className='head-top'>
        <span>欢迎,{username}</span>
        <LinkButton onClick={logout}>退出登录</LinkButton>
      </div>
      <div className='head-bottom'>
        <div className='head-bottom-left'>{headtitle}</div>
        <div className='head-bottom-right'>
          <span>{currentTime}</span>
          <span className='city'>当前城市为:{currentcity}</span>
          <img src={maths[wea_img]} alt='天气' />
                  <span>{wea}</span>
        </div>
      </div>
    </div>
  )

}
let headtitle
let newpath
const getTitle = (arr) => {
  arr.forEach(item => {
    if (item.children) {
      getTitle(item.children)
    } else {
      if (item.key === newpath) { headtitle = item.title }
    }
  })
}
