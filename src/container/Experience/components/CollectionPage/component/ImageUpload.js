import { Upload, Icon, message } from 'antd';
import React from 'react';
import { inject, observer } from 'mobx-react';
import { height } from 'window-size';

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

@inject((stores) => ({
  experience: stores.experience,
}))
@observer
export default class Avatar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      imageUrl: '',
    };
    this.beforeUpload = this.beforeUpload.bind(this);
  }

  beforeUpload(file) {
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG) {
      message.error('You can only upload JPG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }

    return isJPG && isLt2M;
  }

  handleChange = (info) => {
    console.log(info);
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      this.setState({
        imageUrl: `http://p9alq612u.bkt.clouddn.com/${info.file.response.key}`, 
      });
    }
  }
  render() {
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const imageUrl = this.state.imageUrl;
    return (
      <div onClick={() => {this.props.experience.getToken()}}>
        <Upload
          name="file"
          listType="picture-card"
          showUploadList={false}
          action="http://up-z2.qiniu.com/"
          onChange={this.handleChange}
          beforeUpload={this.beforeUpload}
          data={{
            token: this.props.experience.token,
            key: (new Date()).valueOf(),
          }}
        >
          {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: 200, height: 150 }} /> : uploadButton}
        </Upload>
      </div>
      
    );
  }
}
