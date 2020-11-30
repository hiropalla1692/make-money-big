import React, {useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Link, NavLink} from 'react-router-dom';
import styled, {css, ThemeProvider} from 'styled-components';
import theme from '../ColorChart';


const Container = styled.div`
  height: 100%;
  display:flex;
  flex-flow: column nowrap;
  font-family: 'Poppins', sans-serif;
  font-weight: bold;
  align-items: center;
  font-size: calc(2px + 2vmin);
`
const Menu = styled.div`
  margin: 5% 0 5% 0;
  padding: 3%;
  width: 90%;
  border-radius: 60px;
  font-size: calc(6px + 1vmin);
  transition : all 0.2s ease-in-out;
  span {
    transition : all 0.2s ease-in-out;
  }
  :hover {
    background-color: ${props => props.theme.dark};
    span {
      color: ${props => props.theme.cfs1};
    }
  }
  @media screen and (max-width:768px) {
    font-size: calc(4px + 3vmin);
  }
`
const current = {
  color: '#f8b5c1',
};

const MenuBar = ({ menuList }) => {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Menu>
          <NavLink exact to="/pl" activeStyle={current}><span>Income Statement</span></NavLink>
        </Menu>
        <Menu>
          <NavLink exact to="/bs" activeStyle={current}><span>Balance Sheet</span></NavLink>
        </Menu>
        <Menu>
          <NavLink exact to="/cs" activeStyle={current}><span>Cash Flow Statement</span></NavLink>
        </Menu>
        <Menu>
          <NavLink exact to="/div" activeStyle={current}><span>Dividends</span></NavLink>
        </Menu>
        <Menu>
          <NavLink exact to="/val" activeStyle={current}><span>Valuation</span></NavLink>
        </Menu>
        <Menu>
          <NavLink exact to="/profit" activeStyle={current}><span>Profitability</span></NavLink>
        </Menu>
      </Container>
    </ThemeProvider>
  )
}

export default MenuBar;