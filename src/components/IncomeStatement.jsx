import React, {useState, useCallback } from 'react';
import {
  LineChart, Line, BarChart, Bar, AreaChart, Area, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import Toggle from './Toggle';
import { fetchDailyData } from '../api';
import SplitPane, { Pane } from 'react-split-pane';
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

const About = styled.div`
  padding: 4%;
  text-align: left;
  color: white;
  font-family: 'Source Sans Pro', sans-serif;
  font-weight: bold;
  font-size: 15px;
`

const Settings = styled.div`
  width: 90%;
  height: 10%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-end;
  align-items: center;
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
  background-color: ${props => props.theme.dark};
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

const IncomeStatement = ({ stockInfo, changePeriod }) => {
  const data = 
    stockInfo.length 
    ? stockInfo.map((each) => {
      return (
        {
          name: each.date[1] + "-" + each.date[0],
          revenue: each.revenue,
          costOfRevenue: each.costOfRevenue,
          operatingExpense: each.revenue - each.costOfRevenue - each.operatingIncome,
          nonOperatingExpense: each.operatingIncome - each.netIncome,
          grossProfit: each.revenue - each.costOfRevenue,
          grossProfitR: (each.revenue - each.costOfRevenue)*100 /each.revenue,
          operatingIncome: each.operatingIncome,
          operatingIncomeR: each.operatingIncome*100 /each.revenue,
          netIncome: each.netIncome,
          netIncomeR: each.netIncome*100 /each.revenue,
          eps: each.eps,
          weightedAverageShsOutDil: each.weightedAverageShsOutDil,
          costOfRevenueR: (each.costOfRevenue*100) / each.revenue,
          operatingExpenseR: (each.revenue - each.costOfRevenue - each.operatingIncome)*100 / each.revenue,
          nonOperatingExpenseR: (each.operatingIncome - each.netIncome)*100 / each.revenue,
          sellingAndMarketingExpenses: each.sellingAndMarketingExpenses,
          sellingAndMarketingExpensesR: each.sellingAndMarketingExpenses*100 / each.operatingExpenses,
          rd: each.researchAndDevelopmentExpenses,
          rdR: each.researchAndDevelopmentExpenses*100 / each.operatingExpenses,
          sga: each.operatingExpenses - each.researchAndDevelopmentExpenses,
          sgaR: (each.operatingExpenses - each.researchAndDevelopmentExpenses )*100 / each.operatingExpenses,
          da: each.depreciationAndAmortization,
          daR: each.depreciationAndAmortization*100 / each.operatingExpenses,
          interestExpense: each.interestExpense,
          incomeTaxExpense: each.incomeTaxExpense,
          ebitdaR: (each.netIncome + each.incomeTaxExpense + each.interestExpense + each.depreciationAndAmortization)*100 / each.revenue,
        }
      )
    }).reverse()
    : [];

  const [isOn, setIsOn] = useState(true);
  const [isAnnual, setIsAnnual] = useState(true);

  const callback = useCallback(() => {
    setIsAnnual(!isAnnual);
    changePeriod(!isAnnual);
  }, [isAnnual]);


  const chartColor = [
    {
      one: "#7827e6",
      two: "#8d39ec",
      three: "#aa4ff6",
      four: "#ea80fc"
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

  const profitStructureData = 
    (isOn === true) 
    ? ["netIncome", "nonOperatingExpense", "operatingExpense", "costOfRevenue", "", "grossProfit", "operatingIncome", "netIncome"  ]
    :["netIncomeR", "nonOperatingExpenseR", "operatingExpenseR", "costOfRevenueR", "%", "grossProfitR", "operatingIncomeR", "netIncomeR"];

  const operatingExpenseStructureData = 
  (isOn === true) 
  ? ["rd", "sga", "da", ""   ]
  :["rdR", "sgaR", "daR", "%" ];

  const ebitdaData = ["netIncome", "incomeTaxExpense", "interestExpense", "da", "" ];

  return (
    <ThemeProvider theme={theme}>
      <React.Fragment>
        {stockInfo.length 
          ? (
            <Container>
              <Settings>
                <Toggle change={callback} annual={true} />
                <Toggle change={() => setIsOn(!isOn)} annual={false} />
                <span>In Millions of USD except per share items</span>
              </Settings>
              <Items>
                <Title>
                  <div>■ Revenue and Income&nbsp;&nbsp;</div>
                </Title>
                <Boxes>
                  <Box main>
                    <Item>
                      <h5>Profit Structure</h5>
                      <ResponsiveContainer width="95%" height="95%">
                        <AreaChart
                          data={data}
                          margin={{
                            top: 5, right: 25, left: 0, bottom: 5,
                          }}
                        >
                          <XAxis dataKey="name" tick={{ fill: 'white' , fontSize: 15}}/>
                          <YAxis unit={profitStructureData[4]} tick={{ fill: 'white' , fontSize: 15}} tickFormatter={(value) => new Intl.NumberFormat('en').format(value)}/>
                          <Tooltip formatter={(value) => new Intl.NumberFormat('en').format(value)} />
                          <Area type="monotone" fillOpacity="0.8" dataKey={profitStructureData[0]} stackId="1" stroke={theme.profit4} fill={theme.profit4} />
                          <Area type="monotone" fillOpacity="0.8" dataKey={profitStructureData[1]} stackId="1" stroke={theme.profit3} fill={theme.profit3} />
                          <Area type="monotone" fillOpacity="0.8" dataKey={profitStructureData[2]} stackId="1" stroke={theme.profit2} fill={theme.profit2} />
                          <Area type="monotone" fillOpacity="0.8" dataKey={profitStructureData[3]} stackId="1" stroke={theme.profit1} fill={theme.profit1} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </Item>
                  </Box>
                  <Box sub>
                    <Item mini>
                      <h5>Revenue</h5>
                        <ResponsiveContainer width="95%" height="95%">
                          <BarChart
                            data={data}
                            margin={{
                              top: 5, right: 25, left: 0, bottom: 5,
                            }}
                          >
                            <XAxis dataKey="name" tick={{ fill: 'white' , fontSize: 15}}/>
                            <YAxis color="#8884d8" tick={{ fill: 'white' , fontSize: 15}} tickFormatter={(value) => new Intl.NumberFormat('en').format(value)}/>
                            <Tooltip formatter={(value) => new Intl.NumberFormat('en').format(value)} />
                            <Bar dataKey="revenue" fill={theme.profit1} />
                          </BarChart>
                        </ResponsiveContainer>
                    </Item>
                    <Item mini>
                      <h5>Gross Profit</h5>
                        <ResponsiveContainer width="95%" height="95%">
                          <BarChart
                            data={data}
                            margin={{
                              top: 5, right: 25, left: 0, bottom: 5,
                            }}
                          >
                            <XAxis dataKey="name" tick={{ fill: 'white' , fontSize: 15}}/>
                            <YAxis unit={profitStructureData[4]} color="white" tick={{ fill: 'white' , fontSize: 15}} tickFormatter={(value) => new Intl.NumberFormat('en').format(value)}/>
                            <Tooltip formatter={(value) => new Intl.NumberFormat('en').format(value)} />
                            <Bar dataKey={profitStructureData[5]} fill={theme.profit2} />
                          </BarChart>
                        </ResponsiveContainer>
                    </Item>
                    <Item mini>
                      <h5>Operating Income</h5>
                        <ResponsiveContainer width="95%" height="95%">
                          <BarChart
                            data={data}
                            margin={{
                              top: 5, right: 25, left: 0, bottom: 5,
                            }}
                          >
                            <XAxis dataKey="name" tick={{ fill: 'white' , fontSize: 15}}/>
                            <YAxis unit={profitStructureData[4]} color="#8884d8" tick={{ fill: 'white' , fontSize: 15}} tickFormatter={(value) => new Intl.NumberFormat('en').format(value)}/>
                            <Tooltip formatter={(value) => new Intl.NumberFormat('en').format(value)}/>
                            <Bar dataKey={profitStructureData[6]} fill={theme.profit3} />
                          </BarChart>
                        </ResponsiveContainer>
                    </Item>
                    <Item mini>
                      <h5>Net Income</h5>
                      <ResponsiveContainer width="95%" height="95%">
                        <BarChart
                          data={data}
                          margin={{
                            top: 5, right: 25, left: 0, bottom: 5,
                          }}
                        >
                          <XAxis dataKey="name" tick={{ fill: 'white' , fontSize: 15}}/>
                          <YAxis unit={profitStructureData[4]} color="#8884d8" tick={{ fill: 'white' , fontSize: 15}} tickFormatter={(value) => new Intl.NumberFormat('en').format(value)}/>
                          <Tooltip formatter={(value) => new Intl.NumberFormat('en').format(value)}/>
                          <Bar dataKey={profitStructureData[7]} fill={theme.profit4} />
                        </BarChart>
                      </ResponsiveContainer>
                    </Item>
                  </Box>
                </Boxes>
              </Items>
              <Items>
                <Title>
                  <div>■ Operating Expenses&nbsp;&nbsp;</div>
                  {/* <button onClick={() => setIsOn(!isOn)}>push</button> */}
                </Title>
                <Boxes>
                  <Box main>
                    <Item>
                      <h5>Operating Expenses Structure</h5>
                      <ResponsiveContainer width="95%" height="95%">
                        <AreaChart
                          data={data}
                          margin={{
                            top: 5, right: 25, left: 0, bottom: 5,
                          }}
                        >
                          <XAxis dataKey="name" tick={{ fill: 'white' , fontSize: 15}}/>
                          <YAxis unit={operatingExpenseStructureData[3]} tick={{ fill: 'white' , fontSize: 15}} tickFormatter={(value) => new Intl.NumberFormat('en').format(value)}/>
                          <Tooltip formatter={(value) => new Intl.NumberFormat('en').format(value)} />
                          <Area type="monotone" fillOpacity="1" dataKey={operatingExpenseStructureData[1]} stackId="1" stroke={chartColor[1].three} fill={chartColor[1].three} />
                          <Area type="monotone" fillOpacity="1" dataKey={operatingExpenseStructureData[0]} stackId="1" stroke={chartColor[1].one} fill={chartColor[1].one} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </Item>
                  </Box>
                  <Box sub>
                    <Item mini>
                      <h5>Operating Expenses / Revenue</h5>
                      <ResponsiveContainer width="95%" height="95%">
                        <LineChart
                          data={data}
                          margin={{
                            top: 5, right: 25, left: 0, bottom: 5,
                          }}
                        >
                          <XAxis dataKey="name" tick={{ fill: 'white' , fontSize: 15}}/>
                          <YAxis unit="%" color="#8884d8" tick={{ fill: 'white' , fontSize: 15}} tickFormatter={(value) => new Intl.NumberFormat('en').format(value)}/>
                          <Tooltip formatter={(value) => new Intl.NumberFormat('en').format(value)}/>
                          <Line stroke={chartColor[1].one} dataKey="operatingExpenseR" fill={chartColor[1].one} />
                        </LineChart>
                      </ResponsiveContainer>
                    </Item>
                    <Item mini>
                      <h5>R&D</h5>
                        <ResponsiveContainer width="95%" height="95%">
                          <BarChart
                            data={data}
                            margin={{
                              top: 5, right: 25, left: 0, bottom: 5,
                            }}
                          >
                            <XAxis dataKey="name" tick={{ fill: 'white' , fontSize: 15}}/>
                            <YAxis unit={operatingExpenseStructureData[3]} color="#8884d8" tick={{ fill: 'white' , fontSize: 15}} tickFormatter={(value) => new Intl.NumberFormat('en').format(value)}/>
                            <Tooltip formatter={(value) => new Intl.NumberFormat('en').format(value)} />
                            <Bar dataKey={operatingExpenseStructureData[0]} fill={chartColor[1].one} />
                          </BarChart>
                        </ResponsiveContainer>
                    </Item>
                    <Item mini>
                      <h5>SG&A</h5>
                        <ResponsiveContainer width="95%" height="95%">
                          <BarChart
                            data={data}
                            margin={{
                              top: 5, right: 25, left: 0, bottom: 5,
                            }}
                          >
                            <XAxis dataKey="name" tick={{ fill: 'white' , fontSize: 15}}/>
                            <YAxis unit={operatingExpenseStructureData[3]} color="#8884d8" tick={{ fill: 'white' , fontSize: 15}} tickFormatter={(value) => new Intl.NumberFormat('en').format(value)}/>
                            <Tooltip formatter={(value) => new Intl.NumberFormat('en').format(value)} />
                            <Bar dataKey={operatingExpenseStructureData[1]} fill={chartColor[1].three} />
                          </BarChart>
                        </ResponsiveContainer>
                    </Item>
                    <Item mini>
                      <h5>Depreciation and Amortization</h5>
                        <ResponsiveContainer width="95%" height="95%">
                          <BarChart
                            data={data}
                            margin={{
                              top: 5, right: 25, left: 0, bottom: 5,
                            }}
                          >
                            <XAxis dataKey="name" tick={{ fill: 'white' , fontSize: 15}}/>
                            <YAxis unit={operatingExpenseStructureData[3]} color="#8884d8" tick={{ fill: 'white' , fontSize: 15}} tickFormatter={(value) => new Intl.NumberFormat('en').format(value)}/>
                            <Tooltip formatter={(value) => new Intl.NumberFormat('en').format(value)}/>
                            <Bar dataKey={operatingExpenseStructureData[2]} fill={chartColor[2].one} />
                          </BarChart>
                        </ResponsiveContainer>
                    </Item>
                  </Box>
                </Boxes>
              </Items>
              <Items>
                <Title>
                  <div>■ EBITDA and Net Income&nbsp;&nbsp;</div>
                  {/* <button onClick={() => setIsOn(!isOn)}>push</button> */}
                  {/* <Toggle change={() => setIsOn(!isOn)}/> */}
                </Title>
                <Boxes>
                  <Box main>
                    <Item>
                      <h5>From Net Income to EBITDA</h5>
                      <ResponsiveContainer width="95%" height="95%">
                        <AreaChart
                          data={data}
                          margin={{
                            top: 5, right: 25, left: 0, bottom: 5,
                          }}
                        >
                          <XAxis dataKey="name" tick={{ fill: 'white' , fontSize: 15}}/>
                          <YAxis unit={ebitdaData[4]} tick={{ fill: 'white' , fontSize: 15}} tickFormatter={(value) => new Intl.NumberFormat('en').format(value)}/>
                          <Tooltip formatter={(value) => new Intl.NumberFormat('en').format(value)} />
                          <Area type="monotone" fillOpacity="0.8" dataKey={ebitdaData[0]} stackId="1" stroke={theme.ebitda4} fill={theme.ebitda4} />
                          <Area type="monotone" fillOpacity="0.8" dataKey={ebitdaData[1]} stackId="1" stroke={theme.ebitda3} fill={theme.ebitda3} />
                          <Area type="monotone" fillOpacity="0.8" dataKey={ebitdaData[2]} stackId="1" stroke={theme.ebitda2} fill={theme.ebitda2} />
                          <Area type="monotone" fillOpacity="0.8" dataKey={ebitdaData[3]} stackId="1" stroke={theme.ebitda1} fill={theme.ebitda1} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </Item>
                  </Box>
                  <Box sub>
                    <Item mini>
                      <h5>EBITDA Margin</h5>
                      <ResponsiveContainer width="95%" height="95%">
                        <LineChart
                          data={data}
                          margin={{
                            top: 5, right: 25, left: 0, bottom: 5,
                          }}
                        >
                          <XAxis dataKey="name" tick={{ fill: 'white' , fontSize: 15}}/>
                          <YAxis unit="%" color="#8884d8" tick={{ fill: 'white' , fontSize: 15}} tickFormatter={(value) => new Intl.NumberFormat('en').format(value)}/>
                          <Tooltip formatter={(value) => new Intl.NumberFormat('en').format(value)}/>
                          <Line stroke={theme.ebitda1} dataKey="ebitdaR" fill={theme.ebitda1} />
                        </LineChart>
                      </ResponsiveContainer>
                    </Item>
                    <Item mini>
                      <h5>Depreciation and Amortization</h5>
                        <ResponsiveContainer width="95%" height="95%">
                          <BarChart
                            data={data}
                            margin={{
                              top: 5, right: 25, left: 0, bottom: 5,
                            }}
                          >
                            <XAxis dataKey="name" tick={{ fill: 'white' , fontSize: 15}}/>
                            <YAxis unit={ebitdaData[4]} color="#8884d8" tick={{ fill: 'white' , fontSize: 15}} tickFormatter={(value) => new Intl.NumberFormat('en').format(value)}/>
                            <Tooltip formatter={(value) => new Intl.NumberFormat('en').format(value)} />
                            <Bar dataKey={ebitdaData[3]} fill={theme.ebitda1} />
                          </BarChart>
                        </ResponsiveContainer>
                    </Item>
                    <Item mini>
                      <h5>Interest Expense</h5>
                        <ResponsiveContainer width="95%" height="95%">
                          <BarChart
                            data={data}
                            margin={{
                              top: 5, right: 25, left: 0, bottom: 5,
                            }}
                          >
                            <XAxis dataKey="name" tick={{ fill: 'white' , fontSize: 15}}/>
                            <YAxis unit={ebitdaData[4]} color="#8884d8" tick={{ fill: 'white' , fontSize: 15}} tickFormatter={(value) => new Intl.NumberFormat('en').format(value)}/>
                            <Tooltip formatter={(value) => new Intl.NumberFormat('en').format(value)} />
                            <Bar dataKey={ebitdaData[2]} fill={theme.ebitda2} />
                          </BarChart>
                        </ResponsiveContainer>
                    </Item>
                    <Item mini>
                      <h5>Income Tax Expense</h5>
                        <ResponsiveContainer width="95%" height="95%">
                          <BarChart
                            data={data}
                            margin={{
                              top: 5, right: 25, left: 0, bottom: 5,
                            }}
                          >
                            <XAxis dataKey="name" tick={{ fill: 'white' , fontSize: 15}}/>
                            <YAxis unit={ebitdaData[4]} color="#8884d8" tick={{ fill: 'white' , fontSize: 15}} tickFormatter={(value) => new Intl.NumberFormat('en').format(value)}/>
                            <Tooltip formatter={(value) => new Intl.NumberFormat('en').format(value)}/>
                            <Bar dataKey={ebitdaData[1]} fill={theme.ebitda3} />
                          </BarChart>
                        </ResponsiveContainer>
                    </Item>
                  </Box>
                </Boxes>
              </Items>
            </Container>
            )
          : (<About>
              <p>
                Howdy! Welcome to Make Money Big🎿 <br></br>
                <br></br>
                This app aims to provide you with valuable visuals from financial data of individual firms, which helps you to figure out what they really were, are and will be.<br></br>
                <br></br>
                There are three principles that I am guided by in making visuals from data.<br></br>
                1. Insightful🦍<br></br>
                2. Easy to understand🚿<br></br>
                3. Aesthetic🖼<br></br>
                <br></br>
                Like this...
                <br></br>
                Gif
                <br></br>
                Let's dive in...
              </p>
            </About>)}
      </React.Fragment>
    </ThemeProvider>
  )
}

export default IncomeStatement;