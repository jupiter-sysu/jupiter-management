// @flow
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './Test';
import { Upload, Icon, message } from 'antd';
import styled from 'styled-components';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/braft.css';

const uploadProps = {
  action: `https://up-z2.qiniu.com`,
  name: 'file',
  listType: 'picture-card',
  className: 'avatar-uploader',
  imageUrl: '',
};

// 样式模块，直接用css书写
const Container = styled.div`
  /* border: solid 1px red; */
`;


type PropType = {
  match: Object,
}

class Test extends Component<PropType> {
  state = {
    token: 'aUgM2zW-emQ08r67WZgiCVKdZX5yh6cRupAvn6_F:011cCiZBx0xkETaepBPRMduyYrM=:eyJzY29wZSI6Imp1cGl0ZXIiLCJkZWFkbGluZSI6MTUyODQ5NDAxNH0=',
    key: 'testtt',
    domain: 'http://p9alq612u.bkt.clouddn.com/',
    loading: false,
  }

  handleAvatarChange = ({ file }) => {
    if (file.status === 'uploading') {
      this.setState({ loading: true })
      return
    }
    if (file.status === 'done') {
      const { response: { key } } = file;
      const imageSrc = `${this.state.domain}${key}`;
      console.log('上传成功');
    }
  }

  
  render() {
    const { token, key, imageUrl } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">上传</div>
      </div>
    );
    const editorProps = {
      height: 500,
      contentFormat: 'html',
      initialContent: '<p>Hello World!</p>',
      onChange: this.handleChange,
      onRawChange: this.handleRawChange
    }
    return (
      <Container>
        <div className="container"> 

        </div>
        <Upload {...uploadProps}
          className={'profile-uploader'}
          accept="image/*"
          showUploadList={false}
          data={{ token, key }}
          // beforeUpload={beforeUpload}
          onChange={this.handleAvatarChange}>
          {imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton}
        </Upload>
        <BraftEditor {...editorProps} />
      </Container>
    );
  }
}

export default Test;
