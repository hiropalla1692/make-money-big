import React, {useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import styled, {css} from 'styled-components';

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
  margin-bottom: 10%;
`

const MenuBar = () => {
  return (
    <Container>
      <Menu>
        <Link to="/val">Valuation</Link>
      </Menu>
      <Menu>
        <Link to="/profit">Profitability</Link>
      </Menu>
      <Menu>
        <Link to="/">Income Statement</Link>
      </Menu>
      <Menu>
        <Link to="/bs">Balance Sheet</Link>
      </Menu>
      <Menu>
        <Link to="/cs">Cash Flow Statement</Link>
      </Menu>
    </Container>
  )
}

export default MenuBar;