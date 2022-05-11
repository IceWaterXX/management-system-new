import React from 'react'
import { useNavigate,useLocation } from 'react-router-dom'
import { Card, Form, Input, Cascader, Upload, Button, message } from 'antd'
import LinkButton from '../../../components/link-button/link-button'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { getCategory,reqAddProduct,reqUpadteProduct} from '../../../api'
import PicturesWall from './imgUpload'
import Richtexteditor from './richtexteditor'


export default function AddUpadte() {
  const [options, setOptions] = React.useState([])
  const {state} = useLocation()
  const imglist = React.useRef()
  const catedesc= React.useRef()
  let categoryIds = []
    //设置分类的默认显示
   const {pCategoryId,categoryId,imgs,detail} =state||{}
      if(state){
        if(pCategoryId==="0"){ //为一级分类
          categoryIds.push(categoryId)
         }else{ //为二级分类 但是无法显示二级的信息,因为二级列表还没有加载  所有要在一级map是进行操作
          categoryIds.push(pCategoryId)
          categoryIds.push(categoryId)
         }
      }
  let currentstate = state || {} ; //防止为null报错
  const navigate = useNavigate()
  const initOptions =async (arr) => {
    const options = arr.map((index) => (
      {
        value: index._id,
        label: index.name,
        isLeaf: false, //决定是否有下一级分类
      }
    ))
    //如果是一个二级分类商品的更新
      if(state&&state.pCategoryId!=='0'){ //证明是二级列表的更新
     const subCategorys=await getCate(pCategoryId)  //获取二级列表
     //生成二级下拉列表
     const childOptions =subCategorys.data.map((index)=>(
            {
              value: index._id,
              label: index.name,
              isLeaf: true, //决定是否有下一级分类
            }
     ))
        //loadData有targetOption,但是我们是自动加载,需要将此列表关联到一级列表(找到一级option)
        const targetFOption = options.find((option)=>(option.value==pCategoryId))
        //设置二级为目标一级的子集
        targetFOption.children = childOptions
      }
        setOptions(options)
  }
  const getCate = async (parentId) => { //获取一级或二级分类列表 async函数的返回值是promise对象,状态和值由函数的返回值决定
    const { data } = await getCategory(parentId)
    if (data.status === 0) {
      const arr = data.data
      if (parentId === 0) { //一级列表
        initOptions(arr)
      }else{
        return  data; //返回二级列表 当前async函数返回的promise就是成功且value为data
      }
    }
  }
  const loadData = async(selectedOptions) => {
    const targetOption = selectedOptions[0]; //得到选择的option对象
    targetOption.loading = true; //显示loading动画
    //根据选中的分类选择下一级分类
    const subCategorys =await getCate(targetOption.value);
    targetOption.loading = false;
      if(subCategorys && subCategorys.data.length>0){
    const childOptions =  subCategorys.data.map((index)=>(
          {
            value: index._id,
            label: index.name,
            isLeaf: true, //决定是否有下一级分类
          }
        ))
        targetOption.children=childOptions
      }else{ //当前分类没有二级分类
        targetOption.isLeaf = true
      }
      setOptions([...options]) //为了更新页面,以使子列表显示
  };
  const gobackfun = ()=>{navigate('../')}
  React.useEffect(() => {
    getCate(0)
  }, [])
  const title = (
    <LinkButton onClick={gobackfun}>
      <ArrowLeftOutlined />
      <span>{state?'修改商品':'添加商品'}</span>
    </LinkButton>
  )
  const { TextArea } = Input
  const formItemLayout = { //栅格系统
    labelCol: { span: 2 }, //左侧label的宽度
    wrapperCol: { span: 8 },  //指定右侧包裹的宽度
  };
  const [form] = Form.useForm()
  //进行表单验证
  const submit = () => {
    form.validateFields().then(async(value) =>{  
      //1收集数据
      const {classification,datamessage,dataname,dataprice} = value
        let pCategoryId;
         let categoryId
        if(classification.length===1){
          pCategoryId=0 ; categoryId=classification[0]
        }else{
          pCategoryId=classification[0]
          categoryId=classification[1]
        }
        const {fileList} = imglist.current
        console.log(imglist.current);
        const {getDetail} = catedesc.current
        const detail = getDetail()
     const product = {name:dataname,price:dataprice,desc:datamessage,imgs:fileList,detail,categoryId,pCategoryId}   
   //如果是更新,则需要添加_id  
        if(state){
          product._id=state._id
        }
        //2调用接口请求函数添加或更新
      //  console.log(product);
     if(state){
      const {data}=await reqUpadteProduct(product)
      console.log(data);
      if(data.status===0){
          message.success('更新商品数据成功')
          navigate('../')
       }else{
          message.error('更新商品数据失败')
      }
     }else{       //3.根据结果提示
      const {data} =await reqAddProduct(product)
          if(data.status===0){
            message.success('添加商品数据成功')
              navigate('../')
          }else{
              message.error('添加商品数据失败')
          }
      }   

    }, b => console.log(b))
  }
  const onFinish = (valku) => {
    console.log(valku);
  }

  return (
    <Card title={title}>
      <Form {...formItemLayout} form={form} onFinish={onFinish} name='productForm'>
        <Form.Item label='商品名称' name='dataname' rules={[{
          required: true, message: '商品名称是必须输入的'
        }]} initialValue={currentstate.name}>
          <Input placeholder='商品名称' />
        </Form.Item>
        <Form.Item label='商品描述' name='datamessage' rules={[{
          required: true, message: '必须输入商品描述'
        }]} initialValue={currentstate.desc}>
          <TextArea placeholder='请输入商品描述' autoSize={{ minRows: 2 }} />
        </Form.Item>
        <Form.Item label='商品价格' name='dataprice' rules={[{
          required: true, message: '必须输入商品价格'
        }, {
          validator(rule, value) {
            if (value * 1 > 0) {
              return Promise.resolve()
            } else {
              return Promise.reject(new Error('不应为负数'))
            }
          }
        }]} initialValue={currentstate.price}>
          <Input type='number' addonAfter='元' />
        </Form.Item>
        <Form.Item label='商品分类' name= 'classification' rules={[{
          required: true, message: '必须指定商品分类'
        }]} initialValue={categoryIds}>
          <Cascader 
            options={options} //显示数据的数组
            loadData={loadData} //动态加载次级的回调
            placeholder={'请选择分类'}
          />
        </Form.Item>
        <Form.Item label='商品图片' >
          <PicturesWall imgs={imgs} ref={imglist} />
        </Form.Item>
        <Form.Item label='商品详情' labelCol={{span:2}} wrapperCol={{span:20}}>
          <Richtexteditor ref={catedesc} detail={detail}/>
        </Form.Item>
        <Form.Item >
          <Button type='primary' onClick={submit}>提交</Button>
        </Form.Item>
      </Form>
    </Card>
  )
}
