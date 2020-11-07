import React, {useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import styled, {css} from 'styled-components';

const Container = styled.div`
  display:flex;
  flex-flow: column nowrap;
  font-family: 'Poppins', sans-serif;
  justify-content: center;
  font-size: calc(4px + 2vmin);
`
const Navigator = styled.nav`
  a {
    color: gray;
    :hover {
      color: white;
    }
  }
`

const MenuBar = () => {
  return (
    <Container>
      <p>MakeMoneyBig.</p>
      <Navigator>
        <ul>
          <Link to="/val">Valuation</Link>
        </ul>
        <ul>
          <Link to="/profit">Profitability</Link>
        </ul>
        <ul>
          <Link to="/">Income Statement</Link>
        </ul>
        <ul>
          <Link to="/bs">Balance Sheet</Link>
        </ul>
        <ul>
          <Link to="/cs">Cash Flow Statement</Link>
        </ul>
      </Navigator>
    </Container>
  )
}

export default MenuBar;