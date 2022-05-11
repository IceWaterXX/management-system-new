import React from 'react'
import  {
    Form,Select,Input
} from 'antd'
import PropTypes from 'prop-types'

export default function ChangeForm(props) {
    const [inputValue,setInputValue] = React.useState('')
    const {parentlist} = props; const {messageFun} = props ; const { messageform}= props
    const inputfun =(event)=>{setInputValue(event.target.value)}
   const formRef = React.createRef();
   React.useEffect(()=>{
    messageform(formRef.current)
   },[])
    if(inputValue!==''){
        messageFun(inputValue)
    }

  return (
    <Form name='formlist' ref={formRef}>
        <Form.Item name="field" rules={[{
          required: true,message: '分类名称必须输入'
        } ,{
          min : 2 ,
          message : '分类名称不得少于两位'
        }]}>
        <Input placeholder={parentlist.name} onChange={inputfun}/>
        </Form.Item>
    </Form>
  )
}
ChangeForm.propTypes={
  parentlist:PropTypes.object
}