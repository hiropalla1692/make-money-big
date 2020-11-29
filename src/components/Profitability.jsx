import React, {useState, useEffect } from 'react';
import {
  LineChart, Line, BarChart, Bar, AreaChart, Area, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import Toggle from './Toggle';
import { fetchProfitData } from '../api';
import styled, {css, ThemeProvider} from 'styled-components';
import theme from '../ColorChart';

const Container = styled.div`
  margin: 3%;
  color: white;
  font-family: 'Source Sans Pro', sans-serif;
  p {
    text-align: right;
    font-size: 13px;
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
      <ThemeProvider theme={theme}>
        <Container>
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
              <Box main>
                <Item>
                  <h5>Comparison Equity with Net Income</h5>
                  <ResponsiveContainer width="90%" height="90%">
                    <BarChart
                    data={data}
                    margin={{
                      top: 5, right: 5, left: 5, bottom: 5,
                    }}
                  >
                    <XAxis dataKey="name" tick={{ fill: 'white' , fontSize: 15}}/>
                    <YAxis  tick={{ fill: 'white' , fontSize: 15}} tickFormatter={(value) => new Intl.NumberFormat('en').format(value)}/>
                    <Bar dataKey="totalStockholdersEquity"  stackId="a" fill={theme.ebitda1} />
                    <Bar dataKey="totalLiabilities"  stackId="a" fill="#8b8c99" />
                    <Bar dataKey="netIncome"  stackId="b" fill={theme.velvet4} />
                    <Bar dataKey="nonOperatingExpense"  stackId="b" fill="#8b8c99" />
                    <Bar dataKey="operatingExpense"  stackId="b" fill="#8b8c99" />
                    <Bar dataKey="costOfRevenue"  stackId="b" fill="#8b8c99" />
                  </BarChart>
                </ResponsiveContainer>
                </Item>
              </Box>
              <Box sub>
                <Item mini>
                  <h5>ROE and ROA</h5>
                  <ResponsiveContainer width="95%" height="95%">
                    <LineChart
                    data={data}
                    margin={{
                      top: 5, right: 25, left: 0, bottom: 5,
                    }}
                    >
                    <XAxis dataKey="name" tick={{ fill: 'white' , fontSize: 15}}/>
                    <YAxis unit="%" color="white" tick={{ fill: 'white' , fontSize: 15}} tickFormatter={(value) => new Intl.NumberFormat('en').format(value)}/>
                    <Tooltip formatter={(value) => new Intl.NumberFormat('en').format(value)} />
                    <Line stroke={theme.pink} dataKey="roe" fill={theme.pink} />
                    <Line stroke="#8b8c99" dataKey="roa" fill="#8b8c99" />
                    </LineChart>
                  </ResponsiveContainer>
                </Item>
                <Item mini>
                  <h5>Net Profit to Sales</h5>
                  <ResponsiveContainer width="95%" height="95%">
                    <LineChart
                    data={data}
                    margin={{
                      top: 5, right: 25, left: 0, bottom: 5,
                    }}
                    >
                    <XAxis dataKey="name" tick={{ fill: 'white' , fontSize: 15}}/>
                    <YAxis unit="%" color="white" tick={{ fill: 'white' , fontSize: 15}} tickFormatter={(value) => new Intl.NumberFormat('en').format(value)}/>
                    <Tooltip formatter={(value) => new Intl.NumberFormat('en').format(value)} />
                    <Line stroke={theme.velvet4} dataKey="netIncomeR" fill={theme.velvet4} />
                    </LineChart>
                  </ResponsiveContainer>
                </Item>
                <Item mini>
                  <h5>Asset Turnover</h5>
                  <ResponsiveContainer width="95%" height="95%">
                    <LineChart
                    data={data}
                    margin={{
                      top: 5, right: 25, left: 0, bottom: 5,
                    }}
                    >
                    <XAxis dataKey="name" tick={{ fill: 'white' , fontSize: 15}}/>
                    <YAxis unit="%" color="white" tick={{ fill: 'white' , fontSize: 15}} tickFormatter={(value) => new Intl.NumberFormat('en').format(value)}/>
                    <Tooltip formatter={(value) => new Intl.NumberFormat('en').format(value)} />
                    <Line stroke={theme.yellow} dataKey="totalAssetTurnover" fill={theme.yellow} />
                    </LineChart>
                  </ResponsiveContainer>
                </Item>
                <Item mini>
                  <h5>Equity Multiplier</h5>
                  <ResponsiveContainer width="95%" height="95%">
                    <LineChart
                    data={data}
                    margin={{
                      top: 5, right: 25, left: 0, bottom: 5,
                    }}
                    >
                    <XAxis dataKey="name" tick={{ fill: 'white' , fontSize: 15}}/>
                    <YAxis color="white" tick={{ fill: 'white' , fontSize: 15}} tickFormatter={(value) => new Intl.NumberFormat('en').format(value)}/>
                    <Tooltip formatter={(value) => new Intl.NumberFormat('en').format(value)} />
                    <Line stroke={theme.ebitda1} dataKey="equityMultiplier" fill={theme.ebitda1} />
                    </LineChart>
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

export default Profitability;