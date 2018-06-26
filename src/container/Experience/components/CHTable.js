import { Table } from 'antd';
import React from 'react';
import { inject, observer } from 'mobx-react';
import simpleFetch from '../../../utils/simpleFetch';

const columns = [{
  title: '玩法编号',
  dataIndex: 'experience_id',
}, {
  title: '玩法标题',
  dataIndex: 'experience_title',
}, {
  title: '点赞次数',
  dataIndex: 'like_num',
}, {
  title: '国家',
  dataIndex: 'country_name',
}, {
  title: '城市',
  dataIndex: 'city_name',
}, {
  title: 'F1',
  dataIndex: 'experience_feature1',
}, {
  title: 'F2',
  dataIndex: 'experience_feature2',
}, {
  title: 'F3',
  dataIndex: 'experience_feature3',
}];

@inject(stores => ({
  experience: stores.experience,
}))
@observer
class CHTable extends React.Component {
  state = {
    pagination: {},
    loading: false,
  };

  componentWillMount() {
    this.fetch(1);
  }

  experience = this.props.experience;

  handleTableChange = (pagination) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
    });
    this.fetch(pagination.current);
  }

  fetch = (currentPage) => {
    this.setState({ loading: true });
    simpleFetch(
      '/data/obtain/experience_list/',
      { page: currentPage },
    ).then((data) => {
      console.log(data);
      const pagination = { ...this.state.pagination };
      pagination.total = data.data.page_sum * 10;
      this.setState({
        loading: false,
        pagination,
      });
      console.log("表格数据列表: \n", data.data.items);
      const dataSource = data.data.items.map((item) => {
        item['country_name'] = this.experience.countryList[item.country_id]['name'];
        item['city_name'] = this.experience.countryList[item.country_id]['city'][item.city_id];
        return item;
      });
      console.log("添加了国家名字的列表: \n " , dataSource);
      this.experience.setData(dataSource);
    });
  }

  render() {
    return (
      <Table
        columns={columns}
        rowKey={record => record.experience_id}
        dataSource={this.experience.dataSource.slice()}
        pagination={this.state.pagination}
        loading={this.state.loading}
        onChange={this.handleTableChange}
        size="small"
      />
    );
  }
}

export default CHTable;
