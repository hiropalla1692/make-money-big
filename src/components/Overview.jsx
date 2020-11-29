import React, {useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import {
  LineChart, Line, BarChart, Bar, AreaChart, Area, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Brush, ResponsiveContainer
} from 'recharts';
import styled, {css, ThemeProvider} from 'styled-components';
import theme from '../ColorChart';

const Container = styled.div`
display: flex;
flex-flow: row nowrap;
color: white;
width: 90%;
height: 30vh;
margin: 2% auto;
border-radius: 10px;
font-family: 'Poppins', sans-serif;
font-size: calc(8px + 2vmin);
  @media screen and (max-width:768px) {
    height: 60vh;
    flex-flow: column nowrap;
  }
`

const Chart = styled.div`
flex: 0 1 40%;

  @media screen and (max-width:768px) {
    flex: 0 1 50%;
  }
`

const Info = styled.div`
flex: 0 1 60%;
display: flex;
padding: 1.5% 3%;
flex-flow: column nowrap;
border: solid 3px ${props => props.theme.cfs1};
border-radius: 1px;
  @media screen and (max-width:768px) {
    flex: 0 1 40%;
    margin-bottom: 5%;
  }
`
const Main = styled.div`
width: 100%;
flex: 0 1 50%;
display: flex;
flex-flow: column nowrap;
align-items: center;
`
const Sub = styled.div`
flex: 0 1 50%;
display: flex;
flex-flow: row nowrap;
font-size: calc(1px + 2vmin);
  @media screen and (max-width:768px) {
    font-size: calc(4px + 2vmin);
  }
`

const SubBox = styled.div`
height: 100%;
margin: 0 3% 0 3%;
flex: 0 1 50%;
display: flex;
flex-flow: column nowrap;
align-items: center;
`
const SubContent = styled.div`
width: 100%;
text-align: left;
display: flex;
justify-content: space-between;
`

const Contents = styled.div`
width: 100%;
flex: 0 1 50%;
display: flex;
flex-flow: row nowrap;
align-items: center;
justify-content: space-around;
text-align: left;
p {
  margin: 0;
}
h3 {
  display: inline;
  margin: 0;
  font-weight: normal;
}
h4 {
  display: inline;
  margin: 0;
  font-size: calc(2px + 2vmin);
  color:${props => props.theme.cfs1};
}
`

const Content = styled.div`
  width: 100%;
  ${props => props.plus && css`
    h4 {
      color: #00e7c3;
    }
  `}
  ${props => props.minus && css`
    h4 {
      color: #f8485f;
    }
  `}
`

const Overview = ({ stockInfo, stockProfile, stockHistoricalPrice }) => {

  const priceData = 
    stockHistoricalPrice.length 
    ? stockHistoricalPrice.map((each) => {
      return (
        {
          date: each.date[1] + "-" + each.date[0],
          price: each.price,
        }
      )
    }).reverse()
    : [];

    const data = 
    stockProfile.length 
    ? stockInfo.map((each, index) => {
      return (
        {
          psr: Math.round((stockProfile[0].marketCap/1000000) / each.revenue * 100) / 100,
        }
      )
    })
    : [];

  return (
    stockProfile.length
    ? (
      <ThemeProvider theme={theme}>
      <Container>
        <Info>
          <Main>
            <Contents>
              <Content>
                <h3>{stockProfile[0].symbol}</h3>&nbsp;&nbsp;<h4>{stockProfile[0].name}&nbsp;&nbsp;&nbsp;{stockProfile[0].exchange}</h4>
              </Content>
            </Contents>
            <Contents>
              {stockProfile[0].change > 0 ?
                <Content plus>
                <h3>${stockProfile[0].price}</h3>&nbsp;&nbsp;
                <h4>▲{stockProfile[0].change}</h4>&nbsp;&nbsp;<h4>({stockProfile[0].changesPercentage}%)</h4>
              </Content> :
              <Content minus>
              <h3>${stockProfile[0].price}</h3>&nbsp;&nbsp;
              <h4>▼{Math.abs(stockProfile[0].change)}&nbsp;({stockProfile[0].changesPercentage}%)</h4>
            </Content> 
              }
            </Contents>
          </Main>
          <Sub>
            <SubBox>
              <SubContent>
                <span>year-high</span><span>${stockProfile[0].yearHigh}</span>
              </SubContent>
              <SubContent>
                <span>year-low</span><span>${stockProfile[0].yearLow}</span>
              </SubContent>
              <SubContent>
                <span>Market Cap</span><span>${Math.round((stockProfile[0].marketCap/ 1000000000) * 100) / 100}B</span>
              </SubContent>
            </SubBox>
            <SubBox>
              <SubContent>
                <span>EPS</span><span>${stockProfile[0].eps}</span>
              </SubContent>
              <SubContent>
                <span>PER</span><span>×{stockProfile[0].pe}</span>
              </SubContent>
              <SubContent>
                <span>PSR</span><span>×{data[0].psr}</span>
              </SubContent>
            </SubBox>
          </Sub>
        </Info>
        <Chart>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={priceData}
              margin={{
                top: 0, right: 0, left: -20, bottom: 0,
              }}
            >
              <XAxis dataKey="date" tick={{ fill: 'white' , fontSize: 10}}/>
              <YAxis  color="white" tick={{ fill: 'white' , fontSize: 10}} tickFormatter={(value) => new Intl.NumberFormat('en').format(value)}/>
              <Tooltip formatter={(value) => new Intl.NumberFormat('en').format(value)} />
              <Area dataKey="price" dot={false} type="monotone" fillOpacity="0.8" stroke={theme.cfs1} fill={theme.cfs1}/>
              <Brush dataKey="date" height={15} stroke="#656565"/>
            </AreaChart>
          </ResponsiveContainer>
        </Chart>
      </Container>
      </ThemeProvider>
    ) : null
  )
}

export default Overview;