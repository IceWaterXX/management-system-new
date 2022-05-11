import React, { Component } from 'react'
import { Link ,useLocation} from 'react-router-dom'
import './leftnav.less'
import logo from '../../assets/imgaes/webp.webp'
import { Menu, Button } from 'antd';
import menuList from '../../config/menuConfig';
import memoryUtils from '../../utils/memoryUtils';

const { SubMenu } = Menu;  let setkey = ''
export default function Leftnav () {
  const hasAuth = (item)=>{  //判断是否有权限
      const {key,isPublic} = item
      const menus = memoryUtils.user.role.menus
      const username = memoryUtils.user.username

      if(username==='admin'||isPublic||menus.indexOf("/"+key)!== -1){
          return true
      }else if(item.children){
        return !!item.children.find(child=>menus.indexOf(child.key)!== -1)
      }
  }
  //根据数据生成标签数组  使用map加递归调用
 const getMenuNodes=(arr)=>{
    return arr.map(item=>{
      if(hasAuth(item)){
        if(item.children){
          const cItem = item.children.find(itemli=>newpath.indexOf(itemli.key)===0)
             if(cItem){setkey=item.key}          
         return (
           <SubMenu key={item.key} title={item.title}>
                 {/* <Menu.Item key={item.children.key}><Link to='charts/bar'>柱形图</Link></Menu.Item> */}
                 {getMenuNodes(item.children)}
           </SubMenu>
               )
       }else{
         return (
           <Menu.Item key={item.key} >
                 <Link to={item.key}>{item.title}</Link>                
           </Menu.Item>
               )
           } 
      }
      
    })
  } 
 const getMenuNodesreduce=(arr)=>{
    return arr.reduce((pre,item)=>{
      if(item.children){pre.push((<SubMenu key={item.key} title={item.title}>
        {getMenuNodes(item.children)}
      </SubMenu>))}else{
      pre.push((<Menu.Item key={item.key} >
        <Link to={item.key}>{item.title}</Link>                
  </Menu.Item>))
      }  
      return pre 
    },[])
  }
  //获取当前的路径
  const {pathname} = useLocation()
  let newpath = pathname.replace(/\/admin\//,'')
  if(newpath.indexOf('product')===0){newpath='product'}
  /* 使用此方法建立列表的节点 */
      let MenuNodes=getMenuNodes(menuList)
    return (
      <div className='leftnav'>
        <Link to='/admin'>
          <header className='leftnav-header'>
            <img src={logo} ale='logo' />
            <h1>商品后台</h1>
          </header>
        </Link>
        <div>
          <div style={{ width: '100%' }}>
            <Menu
              selectedKeys={[newpath]}
              mode="inline"
              theme="dark"
               defaultOpenKeys={[setkey]}
            >
              {MenuNodes}
              {/* {getMenuNodesreduce(menuList)} */}
              {/* <Menu.Item key="1" >
                <Link to='home'>首页</Link>                
              </Menu.Item>
              <SubMenu key="sub1" title="商品"> 
                <Menu.Item key="5"><Link to='category'>品类管理</Link></Menu.Item>
                <Menu.Item key="6"><Link to='product'>商品管理</Link></Menu.Item>
              </SubMenu>
              <Menu.Item key="2" >
              <Link to='user'>用户管理</Link>               
              </Menu.Item>
              <Menu.Item key="3" >
              <Link to='role'>角色管理</Link>   
              </Menu.Item>
              <SubMenu key="sub2" title="图形图表">
                <Menu.Item key="7"><Link to='charts/bar'>柱形图</Link></Menu.Item>
                <Menu.Item key="8"><Link to='charts/line'>折线图</Link></Menu.Item>
                <Menu.Item key="9"><Link to='charts/pie'>饼状图</Link></Menu.Item>
              </SubMenu> */}
            </Menu>
          </div>
        </div>
      </div>

    )
  }
  
