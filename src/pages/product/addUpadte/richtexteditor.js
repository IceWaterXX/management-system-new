import React, { Component } from 'react';
import { EditorState, convertToRaw,ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'


export default class Richtexteditor extends Component {
    constructor(props) {
        super(props);
        const html = this.props.detail; 
        if (html) {
            const contentBlock = htmlToDraft(html); //将我们的文本标签进行检验和转换为它自己的格式
          const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
          const editorState = EditorState.createWithContent(contentState);
          this.state = {
            editorState,
          };
        }else{
            this.state = {
                    editorState: EditorState.createEmpty(), //创建一个没有内容的编辑对象 ,但是当修改时要为初始化内容
                  }
        }
      }
//   state = {
//     editorState: EditorState.createEmpty(), //创建一个没有内容的编辑对象 ,但是当修改时要为初始化内容
//   }
        /*  
            editorState是最新的编辑对象
        */
  onEditorStateChange= (editorState) => { //输入框的内容改变的回调函数
    this.setState({
      editorState,
    });
  };
  //触发提交在父组件,所有让父组件提交时取结果效率比较高,当触发在子组件时,子组件提交给父组件比较合适
  getDetail=()=>{
      //返回对应的html格式文本
      return draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
  }
  uploadImageCallBack=(file)=> {
    return new Promise(
      (resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/api1/manage/img/upload');
        xhr.setRequestHeader('Authorization', 'Client-ID XXXXX');
        const data = new FormData();
        data.append('image', file);
        xhr.send(data);
        xhr.addEventListener('load', () => {
          const response = JSON.parse(xhr.responseText);
          const url = response.data.url
          resolve({data:{link:url}}); //注意,结果必须是这种格式,否则不识别
        });
        xhr.addEventListener('error', () => {
          const error = JSON.parse(xhr.responseText);
          reject(error);
        });
      }
    );
  }
  render() {
    const { editorState } = this.state;
    return (
      <div>
        <Editor
          editorState={editorState}
          editorStyle={{border:'1px solid black',minHeight:200,paddingLeft:10}}
          onEditorStateChange={this.onEditorStateChange}
          toolbar={{
            image: { uploadCallback: this.uploadImageCallBack, alt: { present: true, mandatory: true } },
          }}
        />
        {/* <textarea //这是实时生成标签文本,方便我们保存或在其它组件展示
          disabled //draftToHtml(convertToRaw(editorState.getCurrentContent())) 根据文本内容生成文本标签
          value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
        /> */}
      </div>
    );
  }
}