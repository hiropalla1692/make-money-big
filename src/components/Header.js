import React, {useState, useEffect } from 'react';
import styled, {css} from 'styled-components';

const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1% 4%;
  background-color: #b2bec0;
  font-family: 'Poppins', sans-serif;
  color: white;
  h5 {
    font-weight: normal;
    font-size: calc(7px + 2vmin);
    margin-top: 5px;
    margin-bottom: 5px;
  }
  a {
    text-align: left;
  }
`

const Navigation = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: calc(5px + 2vmin);
  ul {
    margin: 0;
  }
`

const Header = () => {
  return (
    <Container>
        <div>
          <a href="http://localhost:3000/">
            <h5>Make Money Big 🎿</h5>
          </a>
        </div>
        <div>
          <nav>
            <Navigation>
              <div><ul>Home</ul></div>
              <div><ul>About</ul></div>
              <div><ul>Price</ul></div>
              <div><ul>Contact</ul></div>
            </Navigation>
          </nav>
        </div>
    </Container>
  )
}

export default Header;