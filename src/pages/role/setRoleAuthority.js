
import React from 'react'
import {Tree,Form,Input} from 'antd'
import authoritylist from '../../config/authoritylist';

export default function SetRoleAuthority(props) {
    const {role} = props
    //根据authoritylist数组生成标签数组
    const [selectKey,setSelectKey]= React.useState(role.menus)

    const onCheck=(checkedKeys)=>{
      // let selectarr = new Set([...selectKey,...checkedKeys]) //去重
        setSelectKey([...checkedKeys])
        props.currentOptions([...checkedKeys])
    }
  return (
    < >
        <Form >
          <Form.Item  label='角色名称' >
            <Input value={role.name} disabled / >
          </Form.Item>
      </Form>
      <Tree
      checkable //是否可以选中
      defaultExpandAll={true}
     checkedKeys={selectKey} //["/home"] ["/category","/home","/product","/products"]
    // defaultCheckedKeys={role.menus} 使用这个需要在Modal标签中设置destroyOnClose属性,让每次都清空数据
      //onSelect={onSelect} //点击树节点触发	
      onCheck={onCheck} //点击复选框触发
      treeData={authoritylist}
    />
    </>
  )
}

