import React, { Component } from 'react'
import { Card, Button, Table, Modal, message} from 'antd'
import { formateDate } from '../../utils/formateDate'
import LinkButton from '../../components/link-button/link-button'
import { reqAddUserOrUpdate, reqDeleteUser, reqUsers } from '../../api'
import UserForm from './userForm'

export default class User extends Component {
  state={
    users:[],//用户列表
    isShow:false,
    roles: []
  }
  
  initColumns = ()=>{
    this.columns = [
        {
          title:'用户名',
          dataIndex:'username',
        },
        {
          title:'邮箱',
          dataIndex:'email',
        },
        {
          title:'电话',
          dataIndex:'phone',
        },
        {
          title:'注册时间',
          dataIndex:'create_time',
          render: formateDate
        },
        {
          title:'所属角色',
          dataIndex:'role_id',
          render:(role_id)=>this.roleNames[role_id]
        },
        {
          title:'操作',
          render:(user)=>(
            <span>
                <LinkButton onClick={()=>{this.showUpdate(user)}}>修改</LinkButton>
                <LinkButton onClick={()=>{this.delteuser(user)}}>删除</LinkButton>
            </span>
          )
        },
        
    ]
  }
    showUpdate=(user)=>{
      this.userobj = user
      this.setState({isShow:true})
    }
  delteuser=(user)=>{
    Modal.confirm({
      title: `确认删除${user.username}吗`,
      onOk:async()=>{
       const result = await reqDeleteUser(user._id)
       console.log(result);
       if(result.data.status===0){
         message.success('删除用户成功')
         this.getUsers()
       }
      }
    })
  }
  initRoleNames=(roles)=>{  //根据数组生成保护所有角色名的对象,属性名为id值
      const roleNames = roles.reduce((pre,role)=>{
          pre[role._id] = role.name
          return pre
      },{})
    this.roleNames=roleNames
  }
  getUsers=async()=>{
    const {data} = await reqUsers()
        if(data.status === 0 ) {
            const {users,roles} = data.data
            this.initRoleNames(roles)
            this.setState({
              users,roles
            })
        }
  }
  componentWillMount(){
    this.initColumns()
    this.userobj = {}
  }
  componentDidMount(){
    this.getUsers()
  }
  addOrUpdateUser=()=>{
    this.from.validateFields().then(async(values)=>{
      if(this.userobj && this.userobj._id ){
        values._id =  this.userobj._id
      }
      const result = await  reqAddUserOrUpdate(values)
      console.log(result);
      if(result.data.status===0){
        message.success(`${this.userobj?'修改':'添加'}用户成功`)
      }else{
        message.error(result.data.msg)
      }
      this.setState({isShow:false})
    })
    this.getUsers()
  }
  collectForm=(from)=>{
    this.from = from
  }
  render() {
    const title = <Button type='primary' onClick={()=>{this.setState({isShow:true});this.userobj=null}}>创建用户</Button>
    return (
      <Card title={title} style={{height:'100%'}}>
       <Table dataSource={this.state.users} //显示的数据
        columns={this.columns} //显示数据的格式
        bordered
        rowKey='_id'
        pagination={{pageSize:5,showQuickJumper:true,showSizeChanger:false}}
        size='middle'
      />
       <Modal title={this.userobj?"修改用户":'添加用户'} visible={this.state.isShow} onOk={this.addOrUpdateUser}onCancel={()=>{this.setState({isShow:false});this.from.resetFields()} } >
       <UserForm user={this.userobj} roles={this.state.roles} collectForm={this.collectForm}></UserForm>
      </Modal>
      </Card>
    )
  }
}
