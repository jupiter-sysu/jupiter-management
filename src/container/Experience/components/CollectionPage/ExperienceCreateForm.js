import { Modal, Form, Input } from 'antd';
import React from 'react';

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

// class CollectionsPage extends React.Component {
//   state = {
//     visible: false,
//   };
//   showModal = () => {
//     this.setState({ visible: true });
//   }
//   handleCancel = () => {
//     this.setState({ visible: false });
//   }
//   handleCreate = () => {
//     const form = this.formRef.props.form;
//     form.validateFields((err, values) => {
//       if (err) {
//         return;
//       }

//       console.log('Received values of form: ', values);
//       form.resetFields();
//       this.setState({ visible: false });
//     });
//   }
//   saveFormRef = (formRef) => {
//     this.formRef = formRef;
//   }
//   render() {
//     return (
//       <div>
//         <Button type="primary" onClick={this.showModal}>+ 新建</Button>
//         <CollectionCreateForm
//           wrappedComponentRef={this.saveFormRef}
//           visible={this.state.visible}
//           onCancel={this.handleCancel}
//           onCreate={this.handleCreate}
//         />
//       </div>
//     );
//   }
// }

// export default CollectionsPage;

// ReactDOM.render(<CollectionsPage />, mountNode);