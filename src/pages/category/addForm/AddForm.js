import React from 'react'
import  {
    Form,Select,Input
} from 'antd'
import PropTypes from 'prop-types';

export default function AddForm(props) {
    const [inputValue,setInputValue] = React.useState('')
    const [isselect,setisselect] = React.useState(false)
    const Item = Form.Item
    const Option=Select.Option
    const {catdata} = props ; const {Id} = props
    const {messageFunse} = props
    const {onValue} = props
    const {messageaddform}=props
    const formRef = React.createRef();
    const mapList =()=>{
     return catdata.map((c)=>(
            <Option value={c._id} key={c._id} >{c.name}</Option>
        ))
    }
    const inputfunse = (event)=>{
        setInputValue(event.target.value)
    }
    if(inputValue!==''){
        messageFunse(inputValue)
    }
    if(isselect===false){
        onValue(Id)  //为了让用户不使用选择框得到的也是选中的id
    }

    const handleChange = (value) => {  
         onValue(value)
         setisselect(true)
      };
      React.useEffect(()=>{
        messageaddform(formRef.current)
       },[])
  return (
    <Form ref={formRef}>
        <Form.Item >
        <Select defaultValue={Id===0?'0':Id} onChange={handleChange}>
            <Option value='0' >一级分类</Option>
            {mapList()}
        </Select>
        </Form.Item>
        {/* 加了名字才能使用rules的功能 */}
        <Form.Item name='list' rules={[{
          required: true,message: '分类名称必须输入'
        },{
            min : 2 ,
            message : '分类名称不得少于两位'
          } ]}>
        <Input placeholder='请输入分类名称' onChange={inputfunse}/>
        </Form.Item>
    </Form>
  )
}
AddForm.propTypes={
    categroys: PropTypes.array,
    parentId:  PropTypes.any
}