// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import { Menu, Dropdown, Button, Icon, message } from 'antd';
import { Input } from 'antd';
import { Avatar } from 'antd';
import { inject, observer, } from 'mobx-react';

import Country_item from './component/Country_item'

function handleButtonClick(e) {
  message.info('Click on left button.');
  console.log('click left button', e);
}

function handleMenuClick(e) {
  message.info('Click on menu item.');
  console.log('click', e);
}

const menu = (
  <Menu onClick={handleMenuClick}>
    <Menu.Item key="1">1st menu item</Menu.Item>
    <Menu.Item key="2">2nd menu item</Menu.Item>
    <Menu.Item key="3">3rd item</Menu.Item>
  </Menu>
);

// 样式模块，直接用css书写
const Container = styled.div`
  background-color: #FFF;
  margin-top: 40px;
  padding: 20px;
`;
//搜索栏
const SearchBar = styled.div`
  margin-top: 35px;
  margin-left: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;
//国家城市
const Country = styled.div`
  margin-left: 45px;
  margin-top: 50px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  
`;
//加载更多
const Loadmore = styled.div`
  display: flex;
  flex-direction: row;
  justify-content : center;
`;

type PropType = {
}

@inject(stores => ({
  location: stores.location
}))
@observer
class Location extends Component {
  componentDidMount() {
    // 请求资源
    this.props.location.loadCountryList();
  }
  render (){
    const { location } = this.props;
    console.log(location);
        const { countrylist } = location;
        const { countrynum } = location;
        const { shownum } = location;
        if (this.props.location.isCountryIniting) {
            return (
              <text>loading</text>
            )
        }
    return(
      <Container>
      <SearchBar>
        <text style={{color: 'black', fontSize: 15}}>
          国家编号：
        </text>
        <Input value="请输入" placeholder="Basic usage" style={{ marginLeft: 8, height: 33, width: 250 }}/>
        <text style={{color: 'black', fontSize: 15, marginLeft: 55}}>
          状态：
        </text>
        <Dropdown overlay={menu}>
          <Button style={{ marginLeft: 8, height: 33, }}>
            请选择 <Icon type="down" />
          </Button>
        </Dropdown>
        <Button type="primary" style={{marginLeft: 280}}>查询</Button>
        <Button style={{marginLeft: 20}}>重置</Button>
      </SearchBar>
      <Country>
        <Button style={{borderStyle: 'dashed', width: 270, height: 313, marginRight: 25, marginBottom: 25}}>+添加</Button>
        {
          countrylist === null ? [] :
                        countrylist.map(function(c, index){
                            if(index < (location === null ? 3 : shownum))
                              return <Country_item 
                                      name={countrylist === null ? [] : c.country_name}
                                      id={countrylist === null ? [] : c.country_id}
                                      photo={countrylist === null ? [] : c.card_img}
                                      num={countrylist === null ? [] : c.number_of_city}/> 
                            })
        }
      </Country>
      <Loadmore>
        <Button 
          style={{}}
          onClick={()=>{location.addShownum()}}>
          加载更多...
        </Button>
      </Loadmore>
    </Container>
    )
  }
    
}

export default Location;
