import React, {useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import {
  LineChart, Line, BarChart, Bar, AreaChart, Area, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Brush, ResponsiveContainer
} from 'recharts';
import styled, {css} from 'styled-components';

const Container = styled.div`
display: flex;
flex-flow: row nowrap;
width: 90%;
height: 25vh;
margin: 2% auto;
border-radius: 10px;
font-family: 'Poppins', sans-serif;
font-size: calc(8px + 2vmin);
`

const Chart = styled.div`
flex: 0 1 40%;
`

const Info = styled.div`
flex: 0 1 60%;
display: flex;
padding: 1.5% 3%;
flex-flow: column nowrap;
border: solid 3px #315689;
border-radius: 1px;
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
font-size: calc(1px + 2vmin);
display: flex;
flex-flow: row nowrap;
`

const SubBox = styled.div`
height: 100%;
margin: 0 3% 0 3%;
flex: 0 1 50%;
font-size: calc(1px + 2vmin);
display: flex;
flex-flow: column nowrap;
align-items: center;
`
const SubContent = styled.div`
width: 100%;
font-size: calc(1px + 2vmin);
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
  color: gray;
  font-size: calc(2px + 2vmin);
  color: #efbb32;
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

const StyledBrush = styled.div`
font-size: 10px;
`
const customTickFormatter = () => {
      return (<StyledBrush>
                <Brush dataKey="date" height={30} stroke="#efbb32"/>
              </StyledBrush>)
    }

const Overview = ({ stockProfile, stockHistoricalPrice }) => {

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

  return (
    stockProfile.length
    ? (
      <Container>
        <Chart>
        <ResponsiveContainer width="95%" height="100%">
          <AreaChart
            data={priceData}
            margin={{
              top: 0, right: 0, left: 0, bottom: 0,
            }}
          >
            <XAxis dataKey="date" tick={{ fill: '#303037' , fontSize: 10}}/>
            <YAxis  color="#303037" tick={{ fill: '#303037' , fontSize: 10}} tickFormatter={(value) => new Intl.NumberFormat('en').format(value)}/>
            <Tooltip formatter={(value) => new Intl.NumberFormat('en').format(value)} />
            <Area dataKey="price" dot={false} type="monotone" fillOpacity="0.6" stroke="#efbb32" fill="#efbb32"/>
            <Brush dataKey="date" height={15} stroke="#315689"/>
          </AreaChart>
        </ResponsiveContainer>
        </Chart>
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
            </SubBox>
            <SubBox>
              <SubContent>
                <span>EPS</span><span>${stockProfile[0].eps}</span>
              </SubContent>
              <SubContent>
                <span>PER</span><span>×{stockProfile[0].pe}</span>
              </SubContent>
              <SubContent>
                <span>PSR</span><span>{stockProfile[0].pe}</span>
              </SubContent>
            </SubBox>
          </Sub>
        </Info>
      </Container>
    ) : null
  )
}

export default Overview;