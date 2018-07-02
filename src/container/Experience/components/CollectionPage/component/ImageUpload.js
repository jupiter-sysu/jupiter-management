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
    console.log("this.props.isCover", this.props.isCover);
    if (info.file.status === 'done') {
      if (this.props.isCover === 'true') {
        console.log("jinlai cover shezhi la")
        this.props.experience.setCoverImageUrl(`http://p9alq612u.bkt.clouddn.com/${info.file.response.key}`);
      } else {
        this.props.experience.setCardImageUrl(`http://p9alq612u.bkt.clouddn.com/${info.file.response.key}`);
        console.log("jinlai card shezhi la")
      }
    }
  }
  render() {
    const { Width, Height, isCover } = this.props;
    console.log("shuitshit ", Width, Height, isCover);

    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const imageUrl = isCover === 'true' ?  this.props.experience.coverImageUrl : this.props.experience.cardImageUrl;
    return (
      <div style={{ display: "flex", width: Width + 'px', height: Height + 'px', marginRight: 28, marginBottom: 18, }} onClick={() => {this.props.experience.getToken()}}>
        <Upload
          className="experience__image__upload"
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
          {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: (Width-8) + 'px', height: Height + 'px' }} /> : uploadButton}
        </Upload>
      </div>
    );
  }
}
