// @flow
import React from 'react';
import styled from 'styled-components';


// 样式模块，直接用css书写
const Container = styled.div`
  background-color: #FFF;
  margin-top: 20px;
  padding: 20px;
`;


type PropType = {
}

function Location(props: PropType) {
  console.log('hi', props);
  return (
    <Container>
      <p>目的地</p>
    </Container>
  );
}

export default Location;
