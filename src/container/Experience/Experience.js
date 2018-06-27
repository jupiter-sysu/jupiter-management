// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import CHForm from './components/CHForm';
import CHTable from './components/CHTable';
import CollectionsPage from './components/CollectionPage/CollectionPage';
import myFetch from '../../utils/fetch';
import { inject, observer } from 'mobx-react';


// 样式模块，直接用css书写
const Container = styled.div`
  background-color: #FFF;
  margin-top: 20px;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border: 1px solid black;
`;

const FormContainer = styled.div`
  width: 50%;
  border: 1px solid black;
`;

const TableContainer = styled.div`
  width: 90%;
  border: 1px solid black;
`;

const BarContainer = styled.div`
  width: 90%;
  display: 'flex';
  justify-content: flex-start;
  align-items; center;
`;


type PropType = {
}

class Experience extends Component {
  

  componentWillMount() {
    this.props.nav.changeTab(1);
  }

  componentDidMount() {
    myFetch('/data/obtain/country_list/', {}, (data) => {
      const countryCity = data.data.country_list;
      const country = {};
      const countryOption = [
        {
          value: '0',
          label: '全部',
          children: [
            {
              value: '0',
              label: '全部',
            },
          ],
        },
      ];
  
      countryCity.map((item) => {
        // 表单用到的国家城市列表
        const countryOptionItem = {};
        countryOptionItem.value = item.country_id;
        countryOptionItem.label = item.country_name;
        countryOptionItem.children = [
          {
            value: '0',
            label: '全部',
          },
        ];
  
        // 表格用到的国家城市列表
        country[item.country_id] = {};
        country[item.country_id].name = item.country_name;
        country[item.country_id].city = {};
  
        const city = item.city_list;
        city.map((temp) => {
          country[item.country_id].city[temp.city_id] = temp.city_name;
          countryOptionItem.children.push({
            value: temp.city_id,
            label: temp.city_name,
          });
          return 0;
        });
        countryOption.push(countryOptionItem);
        return 0;
      });
      console.log('experience 的: ', countryOption);
      this.props.experience.setCountry(country);
      this.props.experience.setCountryOption(countryOption);
    });
  }

  render() {
    return (
      <Container>
        <FormContainer>
          <CHForm />
        </FormContainer>
        <BarContainer>
          <CollectionsPage />
        </BarContainer>
        <TableContainer>
          <CHTable />
        </TableContainer>
      </Container>
    );
  }
}

export default inject(stores => ({
  experience: stores.experience,
  nav: stores.nav,
}))(observer(Experience));
