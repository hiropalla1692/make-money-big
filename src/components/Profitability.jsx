import React, {useState, useEffect } from 'react';
import {
  LineChart, Line, BarChart, Bar, AreaChart, Area, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import Toggle from './Toggle';
import { fetchProfitData } from '../api';
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

const Barcharts = styled.div`
  display: flex;
  width: 130vh;
  flex-flow: column wrap;
  color: #313896;
  justify-content: center;
  h6 {
    margin-top: 5px;
    margin-bottom: 5px;
  }
`

const Overview = styled.div`
  p {
    color: #313896;
    font-size: calc(2px + 2vmin);;
  }
`
const Items = styled.div`
  display: flex;
  width: 95%;
  height: 50vh;
  margin: 2%;
  padding: 2%;
  background-color: #f8f8fc;
  flex-flow: column nowrap;
  justify-content: space-around;
  align-items: center;
`

const Boxes = styled.div`
  display: flex;
  flex-flow: row nowrap;
  height: 100%;
  width: 100%;
`
const Title = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0;
  margin-bottom: 1%;
  width: 100%;
  text-align: left;
  font-family: "Poppins";
  font-size: calc(2px + 2vmin);
  font-weight: bold;
`
const Box = styled.div`
  display: flex;
  height: 100%;
  margin-right: 1%;
  width: 40%;
  align-items: center;
  background-color: #f8f8fc;
  color: #303037;
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
  margin: 0.5% 0.5% 0 0;
  height: 49%;
  width: 49%;
  border-radius: 10px;
  align-items: center;
  box-shadow: 
    0 1.9px 5px rgba(238,239,247);
  background-color: white;
`

const Profitability = ({ stockInfo }) => {

  const [profitData, setProfitData] = useState([]);

  useEffect(() => {
    if (stockInfo.length) {
      const fetchAPI = async () => {
        setProfitData(await fetchProfitData(stockInfo[0].symbol));
      }
      fetchAPI();
    }
  }, [stockInfo]);

  const data = 
    profitData.length && profitData.length==stockInfo.length
    ? stockInfo.map((each, index) => {
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
          totalLiabilities: profitData[index].totalLiabilities,
          totalStockholdersEquity: profitData[index].totalStockholdersEquity,
          totalAssets: profitData[index].totalLiabilities + profitData[index].totalStockholdersEquity,
          roe: each.netIncome*100 / profitData[index].totalStockholdersEquity,
          roa: each.netIncome*100 / (profitData[index].totalStockholdersEquity + profitData[index].totalLiabilities),
          totalAssetTurnover: each.revenue*100 / (profitData[index].totalLiabilities + profitData[index].totalStockholdersEquity),
          equityMultiplier: (profitData[index].totalLiabilities + profitData[index].totalStockholdersEquity) / profitData[index].totalStockholdersEquity,
        }
      )
    }).reverse()
    : [];

  if (profitData.length && profitData.length==stockInfo.length) {
    return (
      <Container>
        <Barcharts>
          <Overview>
            <p>ROE{Math.round(data[data.length - 1].netIncome*100 / profitData[0].totalStockholdersEquity * 100)/100}% 
            | ＄{(Math.round(data[data.length - 1].netIncome* 10)/10).toLocaleString()} 
            / ＄{(Math.round(profitData[0].totalStockholdersEquity * 10)/10).toLocaleString()}</p>
          </Overview>
          <Items>
            <Title>
              <div>■ ROE&nbsp;&nbsp;</div>
            </Title>
            <Boxes>
              <Box>
                <BigItem>
                  <h6>Comparison Equity with Net Income</h6>
                  <ResponsiveContainer width="90%" height="90%">
                    <BarChart
                    data={data}
                    margin={{
                      top: 5, right: 5, left: 5, bottom: 5,
                    }}
                  >
                    <XAxis dataKey="name" tick={{ fill: '#313896' , fontSize: 15}}/>
                    <YAxis  tick={{ fill: '#313896' , fontSize: 15}} tickFormatter={(value) => new Intl.NumberFormat('en').format(value)}/>
                    <Bar dataKey="totalStockholdersEquity"  stackId="a" fill="#35cf4e" />
                    <Bar dataKey="totalLiabilities"  stackId="a" fill="#8b8c99" />
                    <Bar dataKey="netIncome"  stackId="b" fill="#ff5e5e" />
                    <Bar dataKey="nonOperatingExpense"  stackId="b" fill="#8b8c99" />
                    <Bar dataKey="operatingExpense"  stackId="b" fill="#8b8c99" />
                    <Bar dataKey="costOfRevenue"  stackId="b" fill="#8b8c99" />
                  </BarChart>
                </ResponsiveContainer>
                </BigItem>
              </Box>
              <Box big>
                <Item>
                  <h6>ROE and ROA</h6>
                  <ResponsiveContainer width="90%" height="80%">
                    <LineChart
                    data={data}
                    margin={{
                      top: 5, right: 5, left: 5, bottom: 5,
                    }}
                    >
                    <XAxis dataKey="name" tick={{ fill: '#313896' , fontSize: 15}}/>
                    <YAxis unit="%" color="#8884d8" tick={{ fill: '#313896' , fontSize: 15}} tickFormatter={(value) => new Intl.NumberFormat('en').format(value)}/>
                    <Tooltip formatter={(value) => new Intl.NumberFormat('en').format(value)} />
                    <Line stroke="#313896" dataKey="roe" fill="#313896" />
                    <Line stroke="#35cf4e" dataKey="roa" fill="#00d7ff" />
                    </LineChart>
                  </ResponsiveContainer>
                </Item>
                <Item>
                  <h6>Net Profit to Sales</h6>
                  <ResponsiveContainer width="90%" height="80%">
                    <LineChart
                    data={data}
                    margin={{
                      top: 5, right: 5, left: 5, bottom: 5,
                    }}
                    >
                    <XAxis dataKey="name" tick={{ fill: '#313896' , fontSize: 15}}/>
                    <YAxis unit="%" color="#8884d8" tick={{ fill: '#313896' , fontSize: 15}} tickFormatter={(value) => new Intl.NumberFormat('en').format(value)}/>
                    <Tooltip formatter={(value) => new Intl.NumberFormat('en').format(value)} />
                    <Line stroke="#ff5e5e" dataKey="netIncomeR" fill="#ff5e5e" />
                    </LineChart>
                  </ResponsiveContainer>
                </Item>
                <Item>
                  <h6>Asset Turnover</h6>
                  <ResponsiveContainer width="90%" height="80%">
                    <LineChart
                    data={data}
                    margin={{
                      top: 5, right: 5, left: 5, bottom: 5,
                    }}
                    >
                    <XAxis dataKey="name" tick={{ fill: '#313896' , fontSize: 15}}/>
                    <YAxis unit="%" color="#8884d8" tick={{ fill: '#313896' , fontSize: 15}} tickFormatter={(value) => new Intl.NumberFormat('en').format(value)}/>
                    <Tooltip formatter={(value) => new Intl.NumberFormat('en').format(value)} />
                    <Line stroke="#313896" dataKey="totalAssetTurnover" fill="#313896" />
                    </LineChart>
                  </ResponsiveContainer>
                </Item>
                <Item>
                  <h6>Equity Multiplier</h6>
                  <ResponsiveContainer width="90%" height="80%">
                    <LineChart
                    data={data}
                    margin={{
                      top: 5, right: 5, left: 5, bottom: 5,
                    }}
                    >
                    <XAxis dataKey="name" tick={{ fill: '#313896' , fontSize: 15}}/>
                    <YAxis color="#8884d8" tick={{ fill: '#313896' , fontSize: 15}} tickFormatter={(value) => new Intl.NumberFormat('en').format(value)}/>
                    <Tooltip formatter={(value) => new Intl.NumberFormat('en').format(value)} />
                    <Line stroke="#35cf4e" dataKey="equityMultiplier" fill="#35cf4e" />
                    </LineChart>
                  </ResponsiveContainer>
                </Item>
              </Box>
            </Boxes>
          </Items>
        </Barcharts>
      </Container>
    )
  } else {
    return (
      <div>
        <h2>Loading...</h2>
      </div>)
  }


}

export default Profitability;