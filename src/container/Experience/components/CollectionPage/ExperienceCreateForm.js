import { Modal, Form, Input } from 'antd';
import React from 'react';
import ImageUpload from './component/ImageUpload';

const FormItem = Form.Item;

const ExperienceCreateForm = Form.create()(
  class extends React.Component {
    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title="玩法管理"
          okText="保存"
          cancleText="取消"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <ImageUpload />
          <Form layout="vertical">
            <FormItem label="玩法介绍">
              {getFieldDecorator('experience_introduction', {
                rules: [{ required: true, message: '请输入玩法介绍'}],
              })(
                <Input />
              )}
            </FormItem>

            <FormItem label="主标题">
              {getFieldDecorator('experience_title', {
                rules: [{ required: true, message: '请输入玩法标题' }],
              })(
                <Input />
              )}
            </FormItem>

            <FormItem label="辅助描述">
              {getFieldDecorator('experience_brief_description', {
                rules: [{ required: true, message: '请输入辅助描述'}],
              })(<Input type="textarea" />)}
            </FormItem>

            <FormItem label="注意事项">
              {getFieldDecorator('stress_information', {
                rules: [{ required: true, message: '请输入注意事项, 如无请填\'无\' '}],
              })(<Input type="textarea" />)}
            </FormItem>

            <FormItem label="推荐原因">
              {getFieldDecorator('recommend_reason', {
                rules: [{ required: true, message: '请输入推荐原因' }],
              })(<Input type="textarea" />)}
            </FormItem>

            
          </Form>
        </Modal>
      );
    }
  }
);

export default ExperienceCreateForm;
