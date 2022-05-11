
  import React from 'react'
  import  {
      Form,Input
  } from 'antd'

  export default function AddForm(props) {
    const [form] = Form.useForm();
    props.collectForm(form)
    return (
      <Form    form={form} preserve={false}  >
          {/* 加了名字才能使用rules的功能 */}
          <Form.Item name='rolelist' rules={[{
            required: true,message: '角色名称必须输入'
          } ]} label='角色名称' >
          <Input placeholder='请输入角色名称'/ >
          </Form.Item>
      </Form>
    )
  }