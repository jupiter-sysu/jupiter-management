import { Table } from 'antd';
import reqwest from 'reqwest';
import React from 'react';
import { inject, observer, } from 'mobx-react';
import stores from '../../../store';

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
  title: '所属地区',
  dataIndex: 'country_id',
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

  experience = this.props.experience;

  state = {
    pagination: {},
    loading: false,
  };
  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
    });
    this.fetch({
      results: pagination.pageSize,
      page: pagination.current,
      sortField: sorter.field,
      sortOrder: sorter.order,
      ...filters,
    });
  }
  fetch = () => {
    this.setState({ loading: true });
    reqwest({
      url: 'https://dsn.apizza.net/mock/d219e15359947f0ce7411b7b91fd5668/data/obtain/experience_list',
      method: 'post',
      data: {
        page: 1,
      },
      type: 'json',
    }).then((data) => {
      console.log(data);
      const pagination = { ...this.state.pagination };
      pagination.total = data.data.page_sum * 10;
      this.setState({
        loading: false,
        pagination,
      });
      this.experience.setData(data.data.items);
      this.experience.dataSource.map((item) => {
        console.log(item);
      })
    });
  }
  componentDidMount() {
    this.fetch();
  }
  render() {
    return (
      <Table
        columns={columns}
        rowKey={record => record.experience_id}
        dataSource={this.experience.dataSource}
        pagination={this.state.pagination}
        loading={this.state.loading}
        onChange={this.handleTableChange}
        size="small"
      />
    );
  }
}

export default CHTable;