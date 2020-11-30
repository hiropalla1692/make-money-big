import React, {useState, useEffect } from 'react';
import {
  ComposedChart, Brush, LineChart, Line, BarChart, Bar, AreaChart, Area, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import Toggle from './Toggle';
import { fetchDivData } from '../api';
import styled, {css, ThemeProvider} from 'styled-components';
import theme from '../ColorChart';


const Container = styled.div`
  margin: 2%;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  color: white;
  font-family: 'Source Sans Pro', sans-serif;
  p {
    text-align: right;
    font-size: 13px;
  }
`

const Items = styled.div`
  display: flex;
  width: 90%;
  height: 50vh;
  padding: 2%;
  margin-bottom: 2%;
  background-color: ${props => props.theme.light_dark};
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  @media screen and (max-width:768px) {
    height: 150vh;
  }
`

const Boxes = styled.div`
  display: flex;
  flex-flow: row nowrap;
  height: 90%;
  width: 100%;
  @media screen and (max-width:768px) {
    flex-flow: column nowrap;
  }
`
const Title = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0;
  margin-bottom: 1%;
  height: 6%;
  width: 100%;
  text-align: left;
  font-family: "Poppins";
  font-size: calc(2px + 2vmin);
  font-weight: bold;
`

const Box = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  background-color: transparent;
  color: white;
  flex-flow: row wrap;
  ${props => props.main && css`
    width: 40%;
    margin-right: 1%;
  `}
  ${props => props.sub && css`
    width: 60%;
  `}

  @media screen and (max-width:768px) {
    ${props => props.main && css`
        width: 100%;
        height: 25%;
        margin-right: 1%;
    `}
    ${props => props.sub && css`
        width: 100%;
        height: 75%;
        flex-flow: column nowrap;
    `}
  }
`
const Item = styled.div`
  display: flex;
  flex-flow: column nowrap;
  height: 100%;
  width: 100%;
  border-radius: 10px;
  align-items: center;
  background-color:${props => props.theme.dark};
  h5 {
    margin: 2% 0 1% 0;
  }
  ${props => props.mini && css`
    margin: 0.5% 0.5% 0 0;
    height: 49%;
    width: 49%;
  `}

  @media screen and (max-width:768px) {
    ${props => props.mini && css`
      height: 100%;
      width: 100%;
  `}
  }
`


const Dividends = ({ stockInfo, keyMetrics }) => {

  const [divData, setDivData] = useState([]);

  useEffect(() => {
    if (stockInfo.length) {
      const fetchAPI = async () => {
        setDivData(await fetchDivData(stockInfo[0].symbol));
      }
      fetchAPI();
    }
  }, [stockInfo]);

  const data = 
    divData.length
    ? divData.map((each) => {
      return (
        {
          date: each.date[1] + "-" + each.date[0],
          adjDividend: each.adjDividend,
        }
      )
    }).reverse()
    : "nodividends";
  
  const divKeyMetrics =
    keyMetrics.length
    ? keyMetrics.map((each) => {
      return (
        {
          date: each.date[1] + "-" + each.date[0],
          dividendYield: each.dividendYield,
          payoutRatio: each.payoutRatio,
        }
      )
    }).reverse()
    : [];
  
  if (divData.length) {
    return (
      <ThemeProvider theme={theme}>
        <Container>
          <Items>
            <Title>
              <div>■ Dividends</div>
            </Title>
            <Boxes>
              <Box main>
                <Item>
                  <h5>Dividends History</h5>
                  <ResponsiveContainer width="95%" height="95%">
                    <BarChart
                      data={data}
                      margin={{
                        top: 5, right: 25, left: 0, bottom: 5,
                      }}
                    >
                      <XAxis dataKey="date" tick={{ fill: 'white' , fontSize: 15}}/>
                      <YAxis color="#8884d8" tick={{ fill: 'white' , fontSize: 15}} tickFormatter={(value) => new Intl.NumberFormat('en').format(value)}/>
                      <Tooltip formatter={(value) => new Intl.NumberFormat('en').format(value)} />
                      <Bar dataKey="adjDividend" stroke={theme.pink} fill={theme.pink} />
                    </BarChart>
                  </ResponsiveContainer>
                </Item>
              </Box>
              <Box sub>
                <Item mini>
                  <h5>Dividends Yield</h5>
                    <ResponsiveContainer width="95%" height="95%">
                      <LineChart
                        data={divKeyMetrics}
                        margin={{
                          top: 5, right: 25, left: 0, bottom: 5,
                        }}
                      >
                        <XAxis dataKey="date" tick={{ fill: 'white' , fontSize: 15}}/>
                        <YAxis unit="%" color="#8884d8" tick={{ fill: 'white' , fontSize: 15}} tickFormatter={(value) => new Intl.NumberFormat('en').format(value)}/>
                        <Tooltip formatter={(value) => new Intl.NumberFormat('en').format(value)} />
                        <Line dataKey="dividendYield" stroke={theme.pink} fill={theme.pink} />
                      </LineChart>
                    </ResponsiveContainer>
                </Item>
                <Item mini>
                  <h5>Payout Ratio</h5>
                    <ResponsiveContainer width="95%" height="95%">
                      <LineChart
                        data={divKeyMetrics}
                        margin={{
                          top: 5, right: 25, left: 0, bottom: 5,
                        }}
                      >
                        <XAxis dataKey="date" tick={{ fill: 'white' , fontSize: 15}}/>
                        <YAxis  unit="%" color="white" tick={{ fill: 'white' , fontSize: 15}} tickFormatter={(value) => new Intl.NumberFormat('en').format(value)}/>
                        <Tooltip formatter={(value) => new Intl.NumberFormat('en').format(value)} />
                        <Line dataKey="payoutRatio" stackId="1" fill={theme.cfs4} />
                      </LineChart>
                    </ResponsiveContainer>
                </Item>
                <Item mini>
                  <h5>Return to Shareholders</h5>
                  <ResponsiveContainer width="95%" height="95%">
                    <BarChart
                      data={data}
                      margin={{
                        top: 5, right: 25, left: 0, bottom: 5,
                      }}
                    >
                      <XAxis dataKey="name" tick={{ fill: 'white' , fontSize: 15}}/>
                      <YAxis color="white" tick={{ fill: 'white' , fontSize: 15}} tickFormatter={(value) => new Intl.NumberFormat('en').format(value)}/>
                      <Tooltip formatter={(value) => new Intl.NumberFormat('en').format(value)}/>
                      <Bar dataKey="dividendsPaid" stackId="1" fill={theme.cfs4} />
                      <Bar dataKey="commonStockRepurchased" stackId="1" fill={theme.cfs5} />
                    </BarChart>
                  </ResponsiveContainer>
                </Item>
                <Item mini>
                  <h5>Long-Term Debt Repaid</h5>
                    <ResponsiveContainer width="95%" height="95%">
                      <BarChart
                        data={data}
                        margin={{
                          top: 5, right: 25, left: 0, bottom: 5,
                        }}
                      >
                        <XAxis dataKey="name" tick={{ fill: 'white' , fontSize: 15}}/>
                        <YAxis color="white" tick={{ fill: 'white' , fontSize: 15}} tickFormatter={(value) => new Intl.NumberFormat('en').format(value)}/>
                        <Tooltip formatter={(value) => new Intl.NumberFormat('en').format(value)}/>
                        <Bar dataKey="debtRepayment" fill={theme.cfs3} />
                      </BarChart>
                    </ResponsiveContainer>
                </Item>
              </Box>
            </Boxes>
          </Items>
        </Container>
      </ThemeProvider>
    )
  } else {
    return (
      <div>
        <h2>Loading...</h2>
      </div>)
  }


}

export default Dividends;