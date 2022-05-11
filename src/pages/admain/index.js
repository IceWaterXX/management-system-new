import React, { Component } from 'react'
import { Navigate, NavLink, Route, Routes } from 'react-router-dom'
import memoryUtils from '../../utils/memoryUtils'
import { Layout } from 'antd';
import Head from '../../components/head'
import Leftnav from '../../components/left-nav'
import Home from '../home/home'
import Category from '../category/Category';
import Product from '../product/Product'
import Role from '../role/role'
import User from '../user/user'
import Line from '../charts/line'
import Pie from '../charts/pie'
import Bar from '../charts/bar'

const { Footer, Sider, Content } = Layout;
export default class Admain extends Component {
  render() {
    const { user } = memoryUtils
    if (!user || !user._id) {
      //没有登录信息,回到登录界面 但是刷新就没了
      return <Navigate to='/' />
    }
    return (
      <>
        <Layout style={{minHeight:'100%'}}>
          <Sider><Leftnav/></Sider>
          <Layout>
            <header><Head/></header>
            <Content style={{backgroundColor:'#bfa',margin:20}}>

                    <Routes>
                        <Route path='home' element={<Home/>} />
                        <Route path='category' element={<Category/>} />
                        <Route path='product/*' element={<Product/>} />
                        <Route path='role' element={<Role/>} />
                        <Route path='user' element={<User/>} />
                        <Route path='charts/bar' element={<Bar/>} />
                        <Route path='charts/line' element={<Line/>} />
                        <Route path='charts/pie' element={<Pie/>} />
                        <Route path='/' element={<Navigate to='home'/>}/>
                    </Routes>  
            </Content>
            <Footer style={{textAlign: 'center',color: '#ccc'}}>推荐使用谷歌浏览器,可以获得最佳页面操作体验</Footer>
          </Layout>
        </Layout>
        <div></div>
      </>
    )
  }
}
