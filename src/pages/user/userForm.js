import React from 'react'
import  {
    Form,Input,Select
} from 'antd'

export default function UserForm(props) {
    const roles = props.roles
  const  user =props.user
    const [form] = Form.useForm();
    props.collectForm(form)
  return (
    <Form form={form}  preserve={false}   >
        {/* 加了名字才能使用rules的功能 */}
        <Form.Item name='username' rules={[{
          required: true,message: '用户名必须输入'
        } ]} label='用户名' initialValue={user?.username||''}>
        <Input placeholder='请输入用户名'/ >
        </Form.Item>
        <Form.Item name='password' rules={[{
          required: true,message: '密码必须输入'
        } ]} label='密码' initialValue={user?.password||''}>
        <Input placeholder='请输入密码' type='password'/ >
        </Form.Item>
        <Form.Item name='phone' rules={[{
          required: true,message: '手机号必须输入'
        } ]} label='手机号' initialValue={user?.phone||''} >
        <Input placeholder='请输入手机号'/ >
        </Form.Item>

        <Form.Item name='email' label='邮箱'  initialValue={user?.email||''}>
        <Input placeholder='请输入邮箱'/ >
        </Form.Item>

        <Form.Item name='role_id' label='角色' initialValue={user?.role_id||''} >
        <Select placeholder='请选择角色'>
            {
                roles.map(role=>(
                    <Select.Option key={role._id} value={role._id}>
                        {role.name}
                    </Select.Option>
                ))
            }
        </Select>
        </Form.Item>
    </Form>
  )
}