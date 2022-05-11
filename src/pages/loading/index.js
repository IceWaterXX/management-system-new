import React, { Component } from 'react'
import { Navigate } from "react-router-dom"
import { Form, Input, Button, Checkbox ,message} from 'antd';
import {reqLogin} from '../../api/'
import { UserOutlined, LockOutlined } from '@ant-design/icons'; //这是图标
import './loading.less'
import logo from './imgaes/logo.png'
export default  class Loading extends Component {
  state= {rightlogin:false}
   onFinish =async (values) => {
    const {username,password} = values
    // reqLogin(username,password).then(response=>console.log(response.data)).catch((err)=>{console.log(err);})
    //简化
      const result = await reqLogin(username,password)
          console.log(result.data.status,typeof result.data.status);
        const resultstat =  result.data
        if(resultstat.status == 0 ){
            //成功的使用路由跳转
           this.setState({rightlogin:true})
        }else{
          message.error(resultstat.msg)
        }
  };
  render() {
    console.log(this);
    return (
      <div className='login'>
        <div className='login-header'>
          <img src={logo} alt='logo' />
          <h1>React后台管理系统</h1>
        </div>
        <div className='login-content'>
          <h2>用户登录</h2>
          <div>
            <Form
              name="normal_login" className="login-form" initialValues={{ remember: false}} onFinish={this.onFinish} >
              <Form.Item
                name="username"
                rules={[
                  {
                    required: true,  whitespace: true,
                    message: '请输入用户名!用户名不能为空',
                  },
                  {
                    min : 4 ,
                    message : '用户名不得小于6位'
                  },
                  {
                    max : 12 ,
                    message: '用户名不得大于12位'
                  },
                  {
                    pattern: /^[a-zA-Z0-9_]+$/ , 
                    message: '用户名格式错误,必须是英文,数字或下划线组成'
                  }
                ]}
              >   
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="账号" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                   //value是当前输入框的值,getFieldValue可以获取别的框的值,根据name
                    {validator(rule, value) {
                      if (value === undefined ||value === '' ) {
                        return Promise.reject(new Error('密码不能为空'));
                      } else if(value.length < 4 ||  value.length > 12){
                        return (value.length < 4) ? Promise.reject(new Error('密码长度不能小于4位')):Promise.reject(new Error('密码长度不得大于12位'));
                      }else if (/^[a-zA-Z][a-zA-Z0-9_]*$/.test(value)){
                          return Promise.resolve();
                      }else {
                        return Promise.reject(new Error('以英文字母开头，只能包含英文字母、数字、下划线'));
                      }
                    }},
                ]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="密码"
                />
              </Form.Item>
              <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <a className="login-form-forgot" href="">
                  忘记密码
                </a>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button" id='loginbutton' >
                  登录
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
        {this.state.rightlogin?<Navigate to='/admin' />:<></>}
      </div>
    )
  }
}
