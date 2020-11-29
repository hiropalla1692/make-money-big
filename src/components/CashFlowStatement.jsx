import React, {useState, useEffect } from 'react';
import {
  ComposedChart, Brush, LineChart, Line, BarChart, Bar, AreaChart, Area, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import Toggle from './Toggle';
import { fetchCfsData } from '../api';
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


const CashFlowStatement = ({ stockInfo }) => {

  const [cfsData, setCfsData] = useState([]);

  useEffect(() => {
    if (stockInfo.length) {
      const fetchAPI = async () => {
        setCfsData(await fetchCfsData(stockInfo[0].symbol));
      }
      fetchAPI();
    }
  }, [stockInfo]);

  const data = 
    cfsData.length && cfsData.length==stockInfo.length
    ? stockInfo.map((each, index) => {
      return (
        {
          name: each.date[0],
          date: cfsData.date,
          operatingCashFlow: cfsData[index].operatingCashFlow,
          operatingCashFlowRatio: cfsData[index].operatingCashFlow*100 / each.revenue,
          netIncomeRatio: each.netIncome*100 / each.revenue,
          capitalExpenditure: cfsData[index].capitalExpenditure,
          freeCashFlow: cfsData[index].freeCashFlow,
          acquisitionsNet: cfsData[index].acquisitionsNet,
          debtRepayment: cfsData[index].debtRepayment,
          commonStockRepurchased: cfsData[index].commonStockRepurchased,
          dividendsPaid: cfsData[index].dividendsPaid,
          returnToShareholders: cfsData[index].commonStockRepurchased + cfsData[index].dividendsPaid,
          reInvestment: cfsData[index].capitalExpenditure + cfsData[index].acquisitionsNet,
        }
      )
    }).reverse()
    : [];

  const chartColor = [
    {
      dark_blue: "#2f4673",
      red: "#e06c77",
      orange: "#ff9786",
      light_orange:"#ffc0b5",
      yellow: "#ffdc7c",
    }, {
      one: "#af395f",
      two: "#ed486d",
      three: "#f79ab5",
      four: "#f9c1d2"
    }, {
      one: "#af8738",
      two: "#f2c85e",
      three: "#fade9b",
      four: "#fdeac2"
    }
  ]

  if (cfsData.length && cfsData.length==stockInfo.length) {
    return (
      <ThemeProvider theme={theme}>
        <Container>
          <Items>
            <Title>
              <div>■ Capital Allocation&nbsp;&nbsp;</div>
            </Title>
            <Boxes>
              <Box main>
                <Item>
                  <h5>How to Use Cash</h5>
                  <ResponsiveContainer width="95%" height="95%">
                    <ComposedChart
                      data={data}
                      margin={{
                        top: 5, right: 25, left: 0, bottom: 5,
                      }}
                    >
                      <XAxis dataKey="name" tick={{ fill: 'white' , fontSize: 15}}/>
                      <YAxis tick={{ fill: 'white' , fontSize: 15}} tickFormatter={(value) => new Intl.NumberFormat('en').format(value)}/>
                      <Tooltip formatter={(value) => new Intl.NumberFormat('en').format(value)} />
                      <Legend align="left"/>
                      <Area type="monotone" dataKey="operatingCashFlow"  fillOpacity="0.4" stroke={theme.pink} fill={theme.pink} />
                      <Bar dataKey="capitalExpenditure" stackId="1"  fill={theme.cfs1} />
                      <Bar dataKey="acquisitionsNet" stackId="1"  fill={theme.cfs2} />
                      <Bar dataKey="debtRepayment" stackId="1"  fill={theme.cfs3} />
                      <Bar dataKey="returnToShareholders" stackId="1"  fill={theme.cfs4} />
                      <Brush dataKey="name" height={15} stroke="#656565"/>
                    </ComposedChart>
                  </ResponsiveContainer>
                </Item>
              </Box>
              <Box sub>
                <Item mini>
                  <h5>Cash from Operations & Net Income / Sales ratio</h5>
                    <ResponsiveContainer width="95%" height="95%">
                      <LineChart
                        data={data}
                        margin={{
                          top: 5, right: 25, left: 0, bottom: 5,
                        }}
                      >
                        <XAxis dataKey="name" tick={{ fill: 'white' , fontSize: 15}}/>
                        <YAxis unit="%" color="#8884d8" tick={{ fill: 'white' , fontSize: 15}} tickFormatter={(value) => new Intl.NumberFormat('en').format(value)}/>
                        <Tooltip formatter={(value) => new Intl.NumberFormat('en').format(value)} />
                        <Line dataKey="netIncomeRatio" stroke="gray" fill="white" />
                        <Line dataKey="operatingCashFlowRatio" stroke={theme.pink} fill={theme.pink} />
                      </LineChart>
                    </ResponsiveContainer>
                </Item>
                <Item mini>
                  <h5>Capex + Free Cash Flow = Cash from Operations</h5>
                    <ResponsiveContainer width="95%" height="95%">
                      <BarChart
                        data={data}
                        margin={{
                          top: 5, right: 25, left: 0, bottom: 5,
                        }}
                      >
                        <XAxis dataKey="name" tick={{ fill: 'white' , fontSize: 15}}/>
                        <YAxis color="white" tick={{ fill: 'white' , fontSize: 15}} tickFormatter={(value) => new Intl.NumberFormat('en').format(value)}/>
                        <Tooltip formatter={(value) => new Intl.NumberFormat('en').format(value)} />
                        <Bar dataKey="capitalExpenditure" stackId="1" fill={theme.cfs1} />
                        <Bar dataKey="freeCashFlow" stackId="1" fill={theme.cfs4} />
                      </BarChart>
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

export default CashFlowStatement;