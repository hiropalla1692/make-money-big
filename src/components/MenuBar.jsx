import React, {useState, useEffect } from 'react';
import styled, {css} from 'styled-components';

const Container = styled.div`
  display:flex;
  flex-flow: column nowrap;
  font-family: 'Poppins', sans-serif;
  justify-content: center;
  font-size: calc(4px + 2vmin);
`
const Navigator = styled.nav`
  ul {
    color: gray;
    :hover {
      color: white;
    }
  }
`

const MenuBar = () => {
  return (
    <Container>
      <Navigator>
        <ul>Valuation</ul>
        <ul>Profitability</ul>
        <ul>Income Statement </ul>
        <ul>Balance Sheet</ul>
        <ul>CashFlow</ul>
      </Navigator>
    </Container>
  )
}

export default MenuBar;