import React from 'react'
import { Link,useNavigate } from 'react-router-dom';
import { Card, Select, Input, Button, Table, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import LinkButton from '../../../components/link-button/link-button';
import { reqProducts ,reqSearchProducts,reqUpdateStatus} from '../../../api';

const columns = [
  {
    title: '商品名称',
    dataIndex: 'name',
  },
  {
    title: '商品描述',
    dataIndex: 'desc',
  },
  {
    title: '价格',
    dataIndex: 'price',
    render: (price) => ('￥' + price)
  },
  { width: 100 ,
    title: '状态',
  },
  {   width: 100 ,
    title: '操作',
    render: (product)=>{ return(
        <span>
            <LinkButton><Link to='detail'state={product}>详情</Link></LinkButton>
            <LinkButton ><Link to='data' state={product}>修改</Link></LinkButton>
        </span>
      )
    }
  }
];
let inputValut = '' ; let pagecurrent = 0
export default function Home() {
  const title = (
    <div>
      <Select defaultValue='productName' style={{ width: 130 }} onChange={value=>inputValut=value}>
        <Select.Option value='productName'>按名称搜索</Select.Option>
        <Select.Option value='productDesc'>按描述搜索</Select.Option>
      </Select>
      <Input placeholder='关键字' style={{ width: 150, margin: '0 15px' }} onChange={event=>setSearchvalue(event.target.value)}/>
      <Button type='primary' onClick={()=>getProducts(1)}>搜索</Button>
    </div>
  )
  const navigate = useNavigate()
  const pushaddPruduct = ()=>{
    navigate('data')
  }
  const extra = (
    <Button type='primary' onClick={pushaddPruduct}>
      <PlusOutlined />
      添加商品
    </Button>
  )
  columns[3].render=(status) => {
    return(
    <div>
    <Button type='primary' onClick={()=>{updataStus(status)}}>{status.status===1?'下架':'上架'}</Button>
    <div>now{status.status===1?'在售':'下架'}</div>
    </div>
  )}
  const [products, setProducts] = React.useState([])
  const [total, setTotal] = React.useState(0)
  const [loading, setLoading] = React.useState(false)
  const [searchvalue,setSearchvalue] = React.useState('')
  let a = 1

  const getProducts = async(pageNum)=>{
    if(pageNum.current){pageNum=pageNum.current}
    pagecurrent=pageNum
    let result
    setLoading(true)
   if(searchvalue){
   result=await reqSearchProducts(pageNum,3,searchvalue,inputValut)
   }else{
    result= await reqProducts(pageNum,3)
   }
    setLoading(false)
      if(result.data.status===0){
          const {list,total} =result.data.data
          setProducts(list);setTotal(total)
      }
  }
  const updataStus=async(index)=>{
     const {_id,status} = index
     const newStatus = status===1?2:1
    const result= await reqUpdateStatus(_id,newStatus)
      if(result.data.status===0){
        message.success('更新商品成功')
        getProducts(pagecurrent) 
      }
  }
    React.useEffect(()=>{
      getProducts(1)
    },[])
  return (
    <Card title={title} extra={extra} style={{height:'100%'}}>
      <Table columns={columns} dataSource={products} rowKey='_id' pagination={{defaultPageSize:3,total:total}}
        onChange={getProducts}  loading={loading}
      />
    </Card>
  )
}
