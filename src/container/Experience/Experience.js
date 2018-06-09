// @flow
import React from 'react';
import styled from 'styled-components';
import CHForm from './components/CHForm';


// 样式模块，直接用css书写
const Container = styled.div`
  background-color: #FFF;
  margin-top: 20px;
  padding: 20px;
`;


type PropType = {
}

function Experience(props: PropType) {
  console.log('hi', props);
  return (
    <Container>
      <CHForm></CHForm>
    </Container>
    
  );
}

export default Experience;
