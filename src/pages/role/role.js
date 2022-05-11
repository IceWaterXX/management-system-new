import React, { Component } from 'react'
import { Card, Button, Table ,Modal, message} from 'antd'
import { reqRoles ,reqAddRole,reqUpdataRole} from '../../api'
import AddForm from './addForm'
import SetRoleAuthority from './setRoleAuthority'
import memoryUtils from '../../utils/memoryUtils'


const columns = [
  {
    title: '角色名称',
    dataIndex: 'name',
  },
  {
    title: '创建时间',
    dataIndex: 'create_time',
  },
  {
    title: '授权时间',
    dataIndex: 'auth_time',
  },
  {
    title: '授权人',
    dataIndex: 'auth_name',
  }
]
let form1fun = '' ; let form2fun = ''
export default function Role() {
  const [rolelist, setRolelist] = React.useState([])  //所有角色的列表
  const [role, setRole] = React.useState({})  //选中的列表
  const [selectKey,setSelectKey ] =React.useState('')
  const [isShowAdd, setIsShowAdd] = React.useState(false)
  const [isShowAuth, setIsShowAuth] = React.useState(false)
  const title = (
    <span>
      <Button type='primary' style={{ marginRight: 20 }} onClick={()=>{setIsShowAdd(true)}}>创建角色</Button>
      <Button type='primary' disabled={!role._id} onClick={()=>{setIsShowAuth(true)}}>设置角色权限</Button>
    </span>
  )
  const getRolelist = async () => {
    const { data } = await reqRoles()
    if (data.status === 0) {
      setRolelist(data.data)
    }
  }
  const onRowfun = (record) => {
    return {
      onClick: event => {
        //点击此行的回调
        setRole(record)
        setSelectKey(record._id)
      }
    }
  }
  const addRole = async(event)=>{
    form1fun().then(async(values)=>{
      console.log(values);
      const {data}=await reqAddRole(values.rolelist)
      console.log(data);
      if(data.status===0){
        message.success('创建角色成功')
       setRolelist([...rolelist,data.data])
       setIsShowAdd(false)
      }else{
          message.error('创建角色失败')
      }
    })
  }
  const updateRole =async()=>{
    let currentrole = role
      currentrole.menus =form2fun
      currentrole.auth_name =memoryUtils.user.username
   const {data} = await reqUpdataRole(currentrole)
      if(data.status===0){
          message.success('设置角色权限成功')
        //  setRole(currentrole)
        getRolelist()
      }else{
          message.error('设置角色权限失败')
      }
      setIsShowAuth(false)
  }
    const collectForm = (from)=>{form1fun= from.validateFields}
    const currentOptions = (options)=>{form2fun=options; }
  React.useEffect(() => {
    getRolelist()
  }, [])
  
  return (
    <>
    <Card title={title} style={{ height: '100%' }} >
      <Table
        bordered
        rowKey='_id'
        dataSource={rolelist}
        columns={columns}
        pagination={{ defaultPageSize: 5 }}
        rowSelection={{ type: 'radio', selectedRowKeys: [selectKey], onChange: (a,b) => { setSelectKey(a[0]);setRole(b[0]); } }}
        onRow={onRowfun}
      >
      </Table> 
    </Card>
    <Modal title="创建角色" visible={isShowAdd} onOk={addRole} onCancel={()=>{setIsShowAdd(false)}} destroyOnClose>
            <AddForm collectForm={collectForm}/>
        </Modal>
        <Modal title="设置角色权限" visible={isShowAuth}  onOk={updateRole} onCancel={()=>{setIsShowAuth(false)}} destroyOnClose>
            <SetRoleAuthority role={role} currentOptions={currentOptions}/>
        </Modal>
      
      </>
  )
}

