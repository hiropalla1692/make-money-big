import React, {useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import styled, {css} from 'styled-components';

const Container = styled.div`
width: 90%;
height: 25vh;
margin: 2% auto;
background: pink;
`

const Overview = ({ stockProfile }) => {
  return (
    stockProfile.length
    ? (
      <Container>
        <p>{stockProfile[0].companyName}</p>
      </Container>
    ) : null
  )
}

export default Overview;