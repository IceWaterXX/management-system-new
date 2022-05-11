// import { Upload, Modal, message } from 'antd';
// import React from 'react';
// import { PlusOutlined } from '@ant-design/icons';

// function getBase64(file) {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => resolve(reader.result);
//     reader.onerror = error => reject(error);
//   });
// }

// export default class PicturesWall extends React.Component {
//   state = {
//     previewVisible: false, //标识是否显示大图预览
//     previewImage: '',  //大图的url
//     previewTitle: '',
//     fileList: [
//       // {
//       //   uid: '-1',  //每个file有一个独自的uid 文件唯一标识,建议设置为负数,防止与内部产生的id冲突
//       //   name: 'image.png',  //图片文件名
//       //   status: 'done',  //图片状态  状态有：uploading done error removed
//       //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
//       // },
//     ],
//   };

//   handleCancel = () => this.setState({ previewVisible: false }); //退出预览,隐藏model

//   handlePreview = async file => {
//     if (!file.url && !file.preview) {
//       file.preview = await getBase64(file.originFileObj);
//     }

//     this.setState({  //file.preview是把图片转为base64字符串,不算上传图片,防止服务器失效,图片不能上传
//       previewImage: file.url || file.preview,
//       previewVisible: true,
//       previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
//     });
//   };
//     /*  
//         file是当前操作的图片文件(上传\删除),fileList是所有已上传的文件
//         但是file与fileList里的最后一个,不是同一个,内容相同但对象不同
//     */
//   handleChange = ({file,fileList }) => {
// console.log(file,fileList);
//     //一但请求接口成功,就讲当前的file的信息修正
//     if(file.status==='done'){ //上传图片并请求完毕
//       const {response} = file
//         if(response.status ===0){
//           message.success('上传图片成功')
//          const file = fileList[fileList.length-1] 
//           file.name=response.data.name
//           file.url = response.data.url
//         }else{
//           message.error('上传图片失败')
//         }
//     }
//       this.setState({fileList})
//   };

//   render() {
//     const { previewVisible, previewImage, fileList, previewTitle } = this.state;
//     const uploadButton = (
//       <div>
//         <PlusOutlined />
//         <div style={{ marginTop: 8 }}>Upload</div>
//       </div>
//     );
//     return (
//       <>
//         <Upload
//           action="/api1/manage/img/upload"  //上传图片其实就是发送请求  这里是图片的上传接口地址
//           listType="picture-card"  //图片列表的样式
//           fileList={fileList}  //所有已上传图片文件对象的数组
//           onPreview={this.handlePreview} //显示图片预览
//           onChange={this.handleChange} //上传文件改变时的状态
//           accept='image/*'  //指定只接收图片格式
//           name='image'  //请求参数名,参数值为图片路径,这也是接口需要的数据
//         >
//           {fileList.length >= 8 ? null : uploadButton}
//         </Upload>
//         <Modal
//           visible={previewVisible}
//           title={previewTitle}
//           footer={null}  //footer里是确认和取消按钮
//           onCancel={this.handleCancel}
//         >
//           <img alt="example" style={{ width: '100%' }} src={previewImage} />
//         </Modal>
//       </>
//     );
//   }
// }

import { Upload, Modal, message } from 'antd';
import React,{useImperativeHandle} from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { reqDeleteImg } from '../../../api';

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

function PicturesWall(props, ref) {
  const [previewVisible, setpreviewVisible] = React.useState(false)
  const [previewImage, setpreviewImage] = React.useState('')
  const [previewTitle, setpreviewTitle] = React.useState('')
  const [fileList, setfileList] = React.useState([])

  const handleCancel = () => setpreviewVisible(false); //退出预览,隐藏model

  const handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    //file.preview是把图片转为base64字符串,不算上传图片,防止服务器失效,图片不能上传
    setpreviewImage(file.url || file.preview)
    setpreviewVisible(true)
    setpreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1))

  };
  /*  
      file是当前操作的图片文件(上传\删除),fileList是所有已上传的文件
      但是file与fileList里的最后一个,不是同一个,内容相同但对象不同
  */
  const handleChange = async ({ file, fileList }) => {
    //一但请求接口成功,就讲当前的file的信息修正
    if (file.status === 'done') { //上传图片并请求完毕
      const { response } = file
      if (response.status === 0) {
        message.success('上传图片成功')
        const file = fileList[fileList.length - 1]
        file.name = response.data.name
        file.url = response.data.url
      } else {
        message.error('上传图片失败')
      }
    } else if (file.status === 'removed') {//进行删除图片的操作 fileList是删除后的列表
      const { data } = await reqDeleteImg(file.name)
      if (data.status === 0) {
        message.success('删除图片成功')
      } else {
        message.error('删除图片失败')
      }
    }
    setfileList(fileList)
  };
  React.useEffect(()=>{
    if (props.imgs) {
      let newarr = props.imgs.map((index) => {
       const {uid,name,url} =index
      return(
        {
          uid: -uid,  
          name: name, 
          status: 'done',
          url: url,
        }
      )}
     )
        setfileList(newarr)
    }
  },[])
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  const imglist = React.useRef()
  useImperativeHandle(ref,()=>({
    fileList
  }))
  return (
    <>
      <Upload
        action="/api1/manage/img/upload"  //上传图片其实就是发送请求  这里是图片的上传接口地址
        listType="picture-card"  //图片列表的样式
        fileList={fileList}  //所有已上传图片文件对象的数组
        onPreview={handlePreview} //显示图片预览
        onChange={handleChange} //上传文件改变时的状态
        accept='image/*'  //指定只接收图片格式
        name='image'  //请求参数名,参数值为图片路径,这也是接口需要的数据
        ref={imglist}
      >
        {fileList.length >= 8 ? null : uploadButton}
      </Upload>
      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={null}  //footer里是确认和取消按钮
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  );

}
export default React.forwardRef(PicturesWall)