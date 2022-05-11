import React from 'react'
import { Card, Table, Button, message,Modal } from 'antd'
import { PlusOutlined,ArrowRightOutlined } from '@ant-design/icons'
import LinkButton from '../../components/link-button/link-button'
import { getCategory,reqAddCategort,reqUpadteCategort } from '../../api'
import AddForm from './addForm/AddForm'
import ChangeForm from './addForm/ChangeForm'

const columns = [
  {
    title: '分类的名称',
    dataIndex: 'name', //指定需要显示的对应的属性名
  },
  {
    title: '操作',
    width: 300,  
  },
];
let parentlist = {} ; let InputData='' ; let subcurrentParentId=1 ; let formfun = '' ; let addformfun=''
export default function Category() {
  const [loading,setLoading] = React.useState(false) //当前是否该加载动画
  const [catdata,setCatdata] = React.useState([])//一级分类列表
  const [catchilddata,setCatchilddata] = React.useState([]) //二级分类列表
  const [parentId,setParentId] = React.useState(0) //当前显示的分类列表的id 为0时是父级列表
  const [parentName,setParentName] = React.useState('') //当前显示的分类列表的父类名
  const [showStatus,setShowStatus] = React.useState(0) //0表式都不显示,1显示添加,2显示更新


    //下方设置修改按钮的回调
const  changeAddition=(parentobj)=>{setShowStatus(2) ; parentlist = parentobj}
  columns[1].render=(parentobj) => ( //返回每行需要显示的界面标签 并且它接受一个参数,为每一行的对象,dataSource的一个个对象
  <span >
   <LinkButton onClick={()=>changeAddition(parentobj)}>修改分类</LinkButton>
    {parentId===0?<LinkButton onClick={()=>showSublist(parentobj)}>查看子分类</LinkButton>:null}
  </span>
)

  React.useEffect(()=>{ //在页面加载完毕,获取商品数据,并保存到状态中  执行异步任务,发送异步请求
    getCategorylist()
  },[parentName])
  //异步获取分类显示
  const  getCategorylist =async ()=>{
    setLoading(true)
   let result =  await getCategory(parentId)
   setLoading(false)
   const {data} = result //取出请求结果的数据对象
   if(data.status ===0){
     const list =data.data //取出分类数组
     parentId===0 ?setCatdata(list):setCatchilddata(list) //根据parentId来确定获取哪个类别
   }else{message.error('获取分类列表失败')}
  }
  const showSublist=(parentobj)=>{
    setParentId(parentobj._id) ; setParentName(parentobj.name); parentlist=parentobj
    //获取二级分类列表 上面两个是异步的,所以不能之间调用getCategorylist方法,使用钩子
  }
  const showFlist=()=>{
    setParentId(0) ; setParentName('') ; setCatchilddata([])
  }
  const title = parentId===0?(<LinkButton>一级分类列表</LinkButton>):(<span>
    <LinkButton onClick={showFlist}>一级分类列表</LinkButton>
    <ArrowRightOutlined style={{marginRight:'5px'}}/>
    <span>{parentName}</span>
    </span>); 
 const appendbut=()=>{setShowStatus(1)}
  const extra = (<Button type='primary' onClick={appendbut}> <PlusOutlined />添加</Button>)
  const messageFun=(value)=>{InputData=value}
  const messageFunse=(value)=>{InputData=value}
  const onValue = (value)=>{subcurrentParentId=value}
  const messageform = (form)=>(formfun=form)
  const messageaddform = (form)=>{addformfun=form}
  //加入两个表单 下面是提示框的回调
  const closeModal=()=>{setShowStatus(0)}

  const addCategory =()=>{ 
    addformfun.validateFields().then(async(values)=>{ 
    //收集数据并提交请求
    const oldparentId = parentlist._id
    const categoryName =values.list
 const result= await reqAddCategort(categoryName,subcurrentParentId)
    if(result.data.status===0){
     // 重新获取列表,但是当设置的不是当前分类的就不用再获取列表了
      if(oldparentId===subcurrentParentId||subcurrentParentId===0){
        getCategorylist() //如果是添加当前的表单则刷新
        }
      }
    }).catch((err) => {
      console.log(err);
      err.values.list?message.info("请按格式输入"):message.info("请输入内容")
   });   
   setShowStatus(0) 
  }
  const updateCategory =()=>{
    setShowStatus(0);
   formfun.validateFields().then(async(values)=>{
       //发送更新请求
  const  categoryId = parentlist._id
  const  categoryName= values.field
   const result =await reqUpadteCategort(categoryId,categoryName)
   if(result.data.status===0){
      //重新获取列表
      getCategorylist()
   }else{
      message.error('修改数据失败')
   } 
   }).catch((err) => {
     console.log(err);
     err.values.field?message.info("请按格式输入"):message.info("请输入内容")
  });
  
  }
  return (
    <>
    <Card title={title} extra={extra} style={{height:'100%'}}>
      <Table dataSource={parentId===0?catdata:catchilddata} //显示的数据
        columns={columns} //显示数据的格式
        bordered
        rowKey='_id'
        pagination={{pageSize:5,showQuickJumper:true,showSizeChanger:false}}
        loading={loading}
        size='middle'
      />
    </Card>
    <Modal title="添加分类" visible={showStatus===1?true:false} onOk={addCategory}onCancel={closeModal} destroyOnClose={true}>
         <AddForm catdata={catdata} Id={parentId===0?0:parentlist._id} messageFunse={messageFunse} onValue={onValue}  messageaddform={ messageaddform}/>
      </Modal>
      <Modal title="修改分类" visible={showStatus===2?true:false} onOk={updateCategory}onCancel={closeModal} destroyOnClose={true}>
        <ChangeForm parentlist={parentlist} messageFun={messageFun} messageform={messageform}/>
      </Modal>
    </>  
  )
}

