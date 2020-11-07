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