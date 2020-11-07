import React, {useState, useEffect } from 'react';
import {
  BarChart, Bar, AreaChart, Area, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import Toggle from './Toggle';
import { fetchDailyData } from '../api';
import SplitPane, { Pane } from 'react-split-pane';
import styled, {css} from 'styled-components';


const Container = styled.div`
  margin: 3%;
  color: #313896;
  font-family: 'Source Sans Pro', sans-serif;
  p {
    text-align: right;
    font-size: 13px;
  }
`

const About = styled.div`
  padding: 4%;
  text-align: left;
  font-family: "Roboto";
  font-weight: "300";
  font-size: 15px;
`

const Barcharts = styled.div`
  display: flex;
  width: 100%;
  flex-flow: column wrap;
  justify-content: center;
  h6 {
    margin-top: 5px;
    margin-bottom: 5px;
  }
`
const Items = styled.div`
  display: flex;
  width: 94%;
  height: 45vh;
  margin: 2%;
  padding: 2%;
  background-color: #f8f8fc;
  flex-flow: row nowrap;
  justify-content: space-around;
  align-items: center;
`
const Box = styled.div`
  display: flex;
  height: 100%;
  width: 40%;
  margin: 1%;
  align-items: center;
  background-color: #f8f8fc;
  flex-flow: row wrap;
  ${props => props.big && css`
    width: 60%;
  `}
`
const BigItem = styled.div`
  height: 100%;
  width: 100%;
  border-radius: 10px;
  align-items: center;
  box-shadow: 
    0 1.9px 5px rgba(238,239,247);
  background-color: white;
`
const Item = styled.div`
  margin: 1% 1% 0 0;
  height: 48%;
  width: 48%;
  border-radius: 10px;
  align-items: center;
  box-shadow: 
    0 1.9px 5px rgba(238,239,247);
  background-color: white;
`

const IncomeStatement = ({ stockInfo }) => {
  const data = 
    stockInfo.length 
    ? stockInfo.map((each) => {
      return (
        {
          name: each.date[0],
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
        }
      )
    }).reverse()
    : [];

  const [isOn, setIsOn] = useState(true);

  const chartColor = [
    {
      one: "#313896",
      two: "#626ec3",
      three: "#a2aadc",
      four: "#c7cbea"
    }, {
      one: "#7f2392",
      two: "#ad4aae",
      three: "#d094cf",
      four: "#e2bee2"
    }
  ]

  const profitStructureData = 
    (isOn === true) 
    ? ["netIncome", "nonOperatingExpense", "operatingExpense", "costOfRevenue", "" ]
    :["netIncomeR", "nonOperatingExpenseR", "operatingExpenseR", "costOfRevenueR", "%"];

  return (
    <div>
      {stockInfo.length 
        ? (
          <Container>
            <h3 align="left" >{stockInfo[0].symbol}</h3>
            <Barcharts>
            <p>In Millions of USD except per share items</p>
            {/* <button onClick={() => setIsOn(!isOn)}>push</button> */}
              <Items>
                <Box>
                  <BigItem>
                    <h6>Profit Structure</h6>
                    <ResponsiveContainer width="90%" height="90%">
                      <AreaChart
                        data={data}
                        margin={{
                          top: 5, right: 5, left: 5, bottom: 5,
                        }}
                      >
                        <XAxis dataKey="name" tick={{ fill: '#313896' , fontSize: 15}}/>
                        <YAxis unit={profitStructureData[4]} tick={{ fill: '#313896' , fontSize: 15}} tickFormatter={(value) => new Intl.NumberFormat('en').format(value)}/>
                        <Tooltip formatter={(value) => new Intl.NumberFormat('en').format(value)} />
                        <Area type="monotone" fillOpacity="1" dataKey={profitStructureData[0]} stackId="1" stroke={chartColor[0].four} fill={chartColor[0].four} />
                        <Area type="monotone" fillOpacity="1" dataKey={profitStructureData[1]} stackId="1" stroke={chartColor[0].three} fill={chartColor[0].three} />
                        <Area type="monotone" fillOpacity="1" dataKey={profitStructureData[2]} stackId="1" stroke={chartColor[0].two} fill={chartColor[0].two} />
                        <Area type="monotone" fillOpacity="1" dataKey={profitStructureData[3]} stackId="1" stroke={chartColor[0].one} fill={chartColor[0].one} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </BigItem>
                </Box>
                <Box big>
                  <Item>
                    <h6>Revenue</h6>
                      <ResponsiveContainer width="90%" height="80%">
                        <BarChart
                          data={data}
                          margin={{
                            top: 5, right: 5, left: 5, bottom: 5,
                          }}
                        >
                          <XAxis dataKey="name" tick={{ fill: '#313896' , fontSize: 15}}/>
                          <YAxis color="#8884d8" tick={{ fill: '#313896' , fontSize: 15}} tickFormatter={(value) => new Intl.NumberFormat('en').format(value)}/>
                          <Tooltip formatter={(value) => new Intl.NumberFormat('en').format(value)} />
                          <Bar dataKey="revenue" fill={chartColor[0].one} />
                        </BarChart>
                      </ResponsiveContainer>
                  </Item>
                  <Item>
                    <h6>Gross Profit</h6>
                      <ResponsiveContainer width="90%" height="80%">
                        <BarChart
                          data={data}
                          margin={{
                            top: 5, right: 5, left: 5, bottom: 5,
                          }}
                        >
                          <XAxis dataKey="name" tick={{ fill: '#313896' , fontSize: 15}}/>
                          <YAxis color="#8884d8" tick={{ fill: '#313896' , fontSize: 15}} tickFormatter={(value) => new Intl.NumberFormat('en').format(value)}/>
                          <Tooltip formatter={(value) => new Intl.NumberFormat('en').format(value)} />
                          <Bar dataKey="grossProfit" fill={chartColor[0].two} />
                        </BarChart>
                      </ResponsiveContainer>
                  </Item>
                  <Item>
                    <h6>Operating Income</h6>
                      <ResponsiveContainer width="90%" height="80%">
                        <BarChart
                          data={data}
                          margin={{
                            top: 5, right: 5, left: 5, bottom: 5,
                          }}
                        >
                          <XAxis dataKey="name" tick={{ fill: '#313896' , fontSize: 15}}/>
                          <YAxis color="#8884d8" tick={{ fill: '#313896' , fontSize: 15}} tickFormatter={(value) => new Intl.NumberFormat('en').format(value)}/>
                          <Tooltip formatter={(value) => new Intl.NumberFormat('en').format(value)}/>
                          <Bar dataKey="operatingIncome" fill={chartColor[0].three} />
                        </BarChart>
                      </ResponsiveContainer>
                  </Item>
                  <Item>
                    <h6>Net Income</h6>
                    <ResponsiveContainer width="90%" height="80%">
                      <BarChart
                        data={data}
                        margin={{
                          top: 5, right: 5, left: 5, bottom: 5,
                        }}
                      >
                        <XAxis dataKey="name" tick={{ fill: '#313896' , fontSize: 15}}/>
                        <YAxis color="#8884d8" tick={{ fill: '#313896' , fontSize: 15}} tickFormatter={(value) => new Intl.NumberFormat('en').format(value)}/>
                        <Tooltip formatter={(value) => new Intl.NumberFormat('en').format(value)}/>
                        <Bar dataKey="netIncome" fill={chartColor[0].four} />
                      </BarChart>
                    </ResponsiveContainer>
                  </Item>
                </Box>
              </Items>
              <div>
                <h6 align="left">● Ratio</h6>
              </div>
              <Items>
                <div>
                  <h6>Gross Profit Ratio</h6>
                  <div>
                    <BarChart
                      width={300}
                      height={150}
                      data={data}
                      margin={{
                        top: 5, right: 30, left: 20, bottom: 5,
                      }}
                    >
                      <XAxis dataKey="name" tick={{ fill: 'white' , fontSize: 15}}/>
                      <YAxis unit="%" color="#8884d8" tick={{ fill: 'white' , fontSize: 15}} tickFormatter={(value) => new Intl.NumberFormat('en').format(value)}/>
                      <Tooltip formatter={(value) => new Intl.NumberFormat('en').format(value)} />
                      <Bar dataKey="grossProfitR" fill="#4ad1c2" />
                    </BarChart>
                  </div>
                </div>
                <div>
                  <h6>Operating Income Ratio</h6>
                  <div>
                    <BarChart
                      width={300}
                      height={150}
                      data={data}
                      margin={{
                        top: 5, right: 30, left: 20, bottom: 5,
                      }}
                    >
                      <XAxis dataKey="name" tick={{ fill: 'white' , fontSize: 15}}/>
                      <YAxis unit="%" color="#8884d8" tick={{ fill: 'white' , fontSize: 15}} tickFormatter={(value) => new Intl.NumberFormat('en').format(value)}/>
                      <Tooltip formatter={(value) => new Intl.NumberFormat('en').format(value)}/>
                      <Bar dataKey="operatingIncomeR" fill="#92e7df" />
                    </BarChart>
                  </div>
                </div>
                <div>
                  <h6>Net Income Ratio</h6>
                  <div>
                    <BarChart
                      width={300}
                      height={150}
                      data={data}
                      margin={{
                        top: 5, right: 30, left: 20, bottom: 5,
                      }}
                    >
                      <XAxis dataKey="name" tick={{ fill: 'white' , fontSize: 15}}/>
                      <YAxis unit="%" color="#8884d8" tick={{ fill: 'white' , fontSize: 15}} tickFormatter={(value) => new Intl.NumberFormat('en').format(value)}/>
                      <Tooltip formatter={(value) => new Intl.NumberFormat('en').format(value)}/>
                      <Bar dataKey="netIncomeR" fill="#e5f9f8" />
                    </BarChart>
                  </div>
                </div>
              </Items>
              <div>
                <h6 align="left">● per Share</h6>
              </div>
              <Items>
                <div>
                  <h6>Diluted Weighted Average Shares Outst. (in millions)</h6>
                  <div>
                    <BarChart
                      width={300}
                      height={150}
                      data={data}
                      margin={{
                        top: 5, right: 30, left: 20, bottom: 5,
                      }}
                    >
                      <XAxis dataKey="name" tick={{ fill: 'white', fontSize: 15 }}/>
                      <YAxis tick={{ fill: 'white', fontSize: 15 }} tickFormatter={(value) => new Intl.NumberFormat('en').format(value)}/>
                      <Tooltip fontSize="15" formatter={(value) => new Intl.NumberFormat('en').format(value)}/>
                      <Bar dataKey="weightedAverageShsOutDil" fill="#e04499" />
                    </BarChart>
                  </div>
                </div>
                <div>
                  <h6>EPS</h6>
                  <div>
                    <BarChart
                      width={300}
                      height={150}
                      data={data}
                      margin={{
                        top: 5, right: 30, left: 20, bottom: 5,
                      }}
                    >
                      <XAxis dataKey="name" tick={{ fill: 'white', fontSize: 15 }}/>
                      <YAxis tick={{ fill: 'white', fontSize: 15 }} tickFormatter={(value) => new Intl.NumberFormat('en').format(value)}/>
                      <Tooltip fontSize="15" formatter={(value) => new Intl.NumberFormat('en').format(value)}/>
                      <Bar dataKey="eps" fill="#e792c5" />
                    </BarChart>
                  </div>
                </div>
              </Items>
              {/* <div>
                {stockInfo.map((each) => { 
                  return (
                  <h6 key={each.date[0]}>{each.date[0]}:{each.eps}</h6>
                  )
                })}
              </div> */}
            </Barcharts>
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
    </div>
  )
}

export default IncomeStatement;