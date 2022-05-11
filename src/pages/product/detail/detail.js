import React from 'react'
import {Link, useLocation} from 'react-router-dom'
import {Card,List,} from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import './detail.less'
import { reqCategory } from '../../../api'

export default function Detail(props) {
  const {state}=useLocation()||{}
  const [cName1,setCName1] = React.useState('')
  const [cName2,setCName2] = React.useState('')
  React.useEffect(async()=>{
        const {categoryId,pCategoryId} = state
        if(pCategoryId==='0'){
   const result = await reqCategory(categoryId)
          const name = result.data.data?.name
          setCName1(name)
        }else{
          //这样写两个await是发完一个再发一个,效率低,
          //一次性发送多个请求,都成功才处理
          // const result = await reqCategory(categoryId)
          // const result2 = await reqCategory(pCategoryId)
     const results =   await Promise.all([reqCategory(categoryId),reqCategory(pCategoryId)])
          setCName1(results[0].data.data?.name)
          setCName2(results[1].data.data?.name)
        }
  },[]) 
  const title = (
    <span>
      <Link to='/admin/product'><ArrowLeftOutlined /><span>商品详情</span></Link>
    </span>
  )

  return (
   
    <Card title={title} className='cardtitle'>
      <List >
          <List.Item >
              <span className='leftspan'>商品名称:</span>
              <span>{state?.name}</span>
          </List.Item>
          <List.Item>
              <span className='leftspan'>商品详情:</span>
              <span>{state?.desc}</span>
          </List.Item>
          <List.Item>
              <span className='leftspan'>商品价格:</span>
              <span>{state?.price}</span>
          </List.Item>
          <List.Item>
              <span className='leftspan'>所属分类:</span>
              <span>{cName2?cName2:''}{cName1?'---'+cName1:''}</span>
          </List.Item>
          <List.Item>
              <span className='leftspan'>商品图片:</span>
              <span className='detailimages'>
                     {
                       state?.imgs.map((index)=>{
                        return (                         
                            <img   className='detailimages' src={index.url} alt='img' key={index.uid}
                            />                 
                        )
                      }
                      )
                     }
              </span>
          </List.Item>
          <List.Item>
              <span className='leftspan'>商品详情:</span>
              <span dangerouslySetInnerHTML={{__html:state?.detail}}></span>
          </List.Item>
      </List>
    </Card>
  )
}
