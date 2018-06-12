// @flow
import React from 'react';
import styled from 'styled-components';
import CHForm from './components/CHForm';
import CHTable from './components/CHTable';


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


type PropType = {
}

function Experience(props: PropType) {
  return (
    <Container>
      <FormContainer>
        <CHForm />
      </FormContainer>
      <TableContainer>
        <CHTable />
      </TableContainer>
    </Container>
  );
}

export default Experience;
