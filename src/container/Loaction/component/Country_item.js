import React, { Component } from 'react';
import { Menu, Dropdown, Button, Icon, message } from 'antd';
import { Card } from 'antd';
import { observer, inject } from 'mobx-react';
const { Meta } = Card;
const Country_item = ({
    name, id, num, photo
  }) => {
    return(
      <Card
      style={{ width: 270, marginRight: 25, marginBottom: 25}}
      cover={<img alt="example" src={photo} />}
      actions={[<Icon type="edit" />]}
    >
      <Meta 
        style={{  }}
        
        title={name}
        description={`城市数量: ${num}`}
      />
      <text>{`ID: ${id}`}</text>
    </Card>
    );
  }

  export default inject(stores=> ({
    location: stores.location,
}))(observer(Country_item));