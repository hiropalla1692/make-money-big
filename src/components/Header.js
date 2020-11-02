import React, {useState, useEffect } from 'react';
import styled, {css} from 'styled-components';

const Container = styled.div`
  margin: 2%;
  color: white;
  h2 {
    margin-bottom: 10px;
  }
  a {
    text-align: left;
  }
  p {
    margin: 0;
    font-size: 15px;
  }
`

const Header = () => {
  return (
    <Container>
        <a href="http://localhost:3000/">
          <h2>Make Money Big 🎿⛄️</h2>
          <p> -Financial Data Visualizer for Long-term Investors</p>
        </a>
    </Container>
  )
}

export default Header;