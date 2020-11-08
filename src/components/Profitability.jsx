import React, {useState, useEffect } from 'react';
import {
  LineChart, Line, BarChart, Bar, AreaChart, Area, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import Toggle from './Toggle';
import { fetchProfitData } from '../api';
import SplitPane, { Pane } from 'react-split-pane';
import styled, {css} from 'styled-components';

const Overview = styled.div`
  p {
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
        }
      )
    }).reverse()
    : [];

  if (profitData.length && profitData.length==stockInfo.length) {
    return (
      <div>
        <Overview>
          <p>ROE{Math.round(data[data.length - 1].netIncome*100 / profitData[0].totalStockholdersEquity * 100)/100}% 
          | ＄{(Math.round(data[data.length - 1].netIncome* 10)/10).toLocaleString()} 
          / ＄{(Math.round(profitData[0].totalStockholdersEquity * 10)/10).toLocaleString()}</p>
        </Overview>
        <Items>
          <Title>
            <div>■ Revenue and Income&nbsp;&nbsp;</div>
          </Title>
          <Boxes>
            <Box>
              <BigItem>
                <h6>Profit Structure</h6>

              </BigItem>
            </Box>
            <Box big>
              <Item>
                <h6>Revenue</h6>

              </Item>
              <Item>
                <h6>Gross Profit</h6>

              </Item>
              <Item>
                <h6>Operating Income</h6>

              </Item>
              <Item>
                <h6>Net Income</h6>
              </Item>
            </Box>
          </Boxes>
        </Items>
        <div>
          <h6>ROE</h6>
            <div>
              <LineChart
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
                <Line dataKey="roe" fill="#0060ac" />
              </LineChart>
            </div>
        </div>
        <div>
          <h6>ROE</h6>
            <div>
              <BarChart
                width={600}
                height={400}
                data={data}
                margin={{
                  top: 5, right: 30, left: 20, bottom: 5,
                }}
              >
                <XAxis dataKey="name" tick={{ fill: 'white' , fontSize: 15}}/>
                <YAxis color="#8884d8" tick={{ fill: 'white' , fontSize: 15}} tickFormatter={(value) => new Intl.NumberFormat('en').format(value)}/>
                <Bar dataKey="totalStockholdersEquity"  stackId="a" fill="white" />
                <Bar dataKey="totalLiabilities"  stackId="a" fill="#e17186" />
                <Bar dataKey="netIncome"  stackId="b" fill="white" />
                <Bar dataKey="nonOperatingExpense"  stackId="b" fill="#92e7df" />
                <Bar dataKey="operatingExpense"  stackId="b" fill="#4ad1c2" />
                <Bar dataKey="costOfRevenue"  stackId="b" fill="#2f9584" />
              </BarChart>
            </div>
        </div>
      </div>
    )
  } else {
    return (
      <div>
        <h2>Loading...</h2>
      </div>)
  }


}

export default Profitability;