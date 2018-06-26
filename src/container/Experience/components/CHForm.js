import { Form, Input, Cascader, Button } from 'antd';
import React from 'react';
import { inject, observer } from 'mobx-react';

const FormItem = Form.Item;

@inject(stores => ({
  experience: stores.experience,
}))
@observer
class SearchForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  handleReset = () => {
    this.props.form.resetFields();
    console.log("表格的chongzhi", this.props.experience.countryList);
  }

  componentDidMount = () => {
    console.log("表格的", this.props.experience.countryList);
  };


  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 4 },
        sm: { span: 4 },
        md: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 20 },
        sm: { span: 20 },
        md: { span: 18 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
        md: {
          span: 8,
          offset: 16,
        },
      },
    };

    return (
      <Form
        onSubmit={this.handleSubmit}
        layout="horizontal"
      >
        <FormItem {...formItemLayout} label="玩法编号" >
          {getFieldDecorator('id')(<Input />)}
        </FormItem>

        <FormItem {...formItemLayout} label="状态" >
          {getFieldDecorator('status')(<Cascader options={statusOptions} />)}
        </FormItem>

        <FormItem {...formItemLayout} label="特征" >
          {getFieldDecorator('feature', {
            initialValue: ['全部', '全部', '全部'],
          })(<Cascader options={featureOptions} />)}
        </FormItem>

        <FormItem {...formItemLayout} label="地区" >
          {getFieldDecorator('area', {
            initialValue: ['0', '0'],
          })(<Cascader options={this.props.experience.countryOption} />)}
        </FormItem>

        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" style={{ marginRight: 20 }}>查询</Button>
          <Button onClick={this.handleReset}>重置</Button>
        </FormItem>
      </Form>
    );
  }
}

const SearchExperienceForm = Form.create()(SearchForm);

export default SearchExperienceForm;

const foodF3 = [{
  value: '全部',
  label: '全部',
}, {
  value: '清淡',
  label: '清淡',
}, {
  value: '重口',
  label: '重口',
}, {
  value: '当地',
  label: '当地',
}, {
  value: '大众',
  label: '大众',
}, {
  value: '环境',
  label: '环境',
}, {
  value: '出品',
  label: '出品',
}, {
  value: '性价比',
  label: '性价比',
}];

const shelterF3 = [
  {
    value: '全部',
    label: '全部',
  }, {
    value: '逼格',
    label: '逼格',
  }, {
    value: '豪华',
    label: '豪华',
  }, {
    value: '简约',
    label: '简约',
  }, {
    value: '北欧',
    label: '北欧',
  }, {
    value: '古典',
    label: '古典',
  }, {
    value: '当地特色',
    label: '当地特色',
  }, {
    value: '自然',
    label: '自然',
  }, {
    value: '性价比',
    label: '性价比',
  }, {
    value: '经济',
    label: '经济',
  },
];

const entertainmentF3 = [
  {
    value: '全部',
    label: '全部',
  }, {
    value: '刺激',
    label: '刺激',
  }, {
    value: '浪漫',
    label: '浪漫',
  }, {
    value: '安静',
    label: '安静',
  }, {
    value: '优美',
    label: '优美',
  }, {
    value: '氧气',
    label: '氧气',
  }, {
    value: '潮酷',
    label: '潮酷',
  }, {
    value: '放松',
    label: '放松',
  }, {
    value: '知识',
    label: '知识',
  }, {
    value: '名媛',
    label: '名媛',
  }, {
    value: '青春',
    label: '青春',
  }, {
    value: '生活',
    label: '生活',
  },
];

const featureOptions = [
  {
    value: '全部',
    label: '全部',
    children: [{
      value: '全部',
      label: '全部',
      children: [{
        value: '全部',
        label: '全部',
      }],
    }],
  }, {
    value: '食',
    label: '食',
    children: [{
      value: '全部',
      label: '全部',
      children: foodF3,
    }, {
      value: '餐厅',
      label: '餐厅',
      children: foodF3,
    }, {
      value: '小吃',
      label: '小吃',
      children: foodF3,
    }, {
      value: '居民菜',
      label: '居民菜',
      children: foodF3,
    }, {
      value: '糕点面包',
      label: '糕点面包',
      children: foodF3,
    }, {
      value: '咖啡茗茶',
      label: '咖啡茗茶',
      children: foodF3,
    }, {
      value: '洋食',
      label: '洋食',
      children: foodF3,
    }],
  }, {
    value: '住',
    label: '住',
    children: [
      {
        value: '全部',
        label: '全部',
        children: shelterF3,
      },
      {
        value: '酒店',
        label: '酒店',
        children: shelterF3,
      },
      {
        value: '民居',
        label: '民居',
        children: shelterF3,
      },
      {
        value: '野居',
        label: '野居',
        children: shelterF3,
      },
    ],
  }, {
    value: '行',
    label: '行',
    children: [
      {
        value: '全部',
        label: '全部',
        children: entertainmentF3,
      },
      {
        value: '购物名所',
        label: '购物名所',
        children: entertainmentF3,
      },
      {
        value: '夜蒲',
        label: '夜蒲',
        children: entertainmentF3,
      },
      {
        value: '展览艺术 ',
        label: '展览艺术 ',
        children: entertainmentF3,
      },
      {
        value: '胜地',
        label: '胜地',
        children: entertainmentF3,
      },
      {
        value: '运动极限',
        label: '运动极限',
        children: entertainmentF3,
      },
      {
        value: '书店',
        label: '书店',
        children: entertainmentF3,
      },
      {
        value: '超市',
        label: '超市',
        children: entertainmentF3,
      },
      {
        value: '拍照打卡',
        label: '拍照打卡',
        children: entertainmentF3,
      },
      {
        value: '公益',
        label: '公益',
        children: entertainmentF3,
      },
    ],
  },
];

const statusOptions = [
  {
    value: '首推',
    label: '首推',
  },
  {
    value: '上线',
    label: '上线',
  },
  {
    value: '下线',
    label: '下线',
  },
];

