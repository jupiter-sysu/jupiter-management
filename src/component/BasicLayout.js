// @flow
import React from 'react';
import { Layout, Menu } from 'antd';
import styled from 'styled-components';

import history from '../component/History';

const { Header, Content, Footer } = Layout;

// 样式模块，直接用css书写
const HeaderTitle = styled.h1`
  color: white;
  font-size: 22px;
  font-family: 'Segoe UI', Helvetica, Arial, sans-serif;
  font-weight: normal;
  margin-right: 50px;
`;

type PropType = {
    children: Object,
}

function Test(props: PropType) {
  const { children } = props;
  return (
    <Layout className="layout">
      <Header style={{ display: 'flex', flexDirection: 'row' }}>
        <HeaderTitle>木星管理后台</HeaderTitle>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          style={{ lineHeight: '64px' }}
          onClick={(item) => {
             console.log(props, item.key);
              switch (item.key) {
                  case '1': {
                      history.push('/experience');
                      break;
                  }
                  case '2': {
                      history.push('/location');
                      break;
                  }
                  default:
                      break;
              }
          }}
        >
          <Menu.Item key="1">玩法管理</Menu.Item>
          <Menu.Item key="2">目的地管理</Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        { children }
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        <span role="img">©️</span>2018 SYSU. All Rights Reserved.
      </Footer>
    </Layout>
  );
}

export default Test;
