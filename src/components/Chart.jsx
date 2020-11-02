import React, {useState, useEffect } from 'react';
import {
  BarChart, Bar, AreaChart, Area, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { fetchDailyData } from '../api';
import styled, {css} from 'styled-components';

const Container = styled.div`
  margin: 3%;
  color: white;
  p {
    text-align: right;
    font-size: 13px;
  }
`

const Barcharts = styled.div`
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  color: white;
  h6 {
    margin-top: 10px;
    margin-bottom: 10px;
  }
`
const Items = styled.div`
  display: flex;
  flex-flow: row wrap;
`

const Chart = ({ stockInfo }) => {
  const data = 
    stockInfo.length 
    ? stockInfo.map((each) => {
      return (
        {
          name: each.date[0],
          revenue: each.revenue,
          grossMargin: each.revenue - each.costOfRevenue,
          grossMarginR: (each.revenue - each.costOfRevenue)/each.revenue,
          operatingIncome: each.operatingIncome,
          operatingIncomeR: each.operatingIncome/each.revenue,
          netIncome: each.netIncome,
          netIncomeR: each.netIncome/each.revenue,
          eps: each.eps,
          weightedAverageShsOutDil: each.weightedAverageShsOutDil,
          costOfRevenue: each.costOfRevenue,
          operatingExpense: each.revenue - each.costOfRevenue - each.operatingIncome,
          nonOperatingExpense: each.operatingIncome - each.netIncome,
        }
      )
    }).reverse()
    : [];

  return (
    <div>
      {stockInfo.length 
        ? (
          <Container>
            <p>In Millions of USD except per share items</p>
            <h3 align="left" >{stockInfo[0].symbol}</h3>
            <Barcharts>
              <div>
                <h6 align="left">● Absolute</h6>
              </div>
              <Items>
                <div>
                  <h6>Revenue</h6>
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
                      <YAxis color="#8884d8" tick={{ fill: 'white' , fontSize: 15}} tickFormatter={(value) => new Intl.NumberFormat('en').format(value)}/>
                      <Tooltip formatter={(value) => new Intl.NumberFormat('en').format(value)} />
                      <Bar dataKey="revenue" fill="#0060ac" />
                    </BarChart>
                  </div>
                </div>
                <div>
                  <h6>Gross Margin</h6>
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
                      <YAxis color="#8884d8" tick={{ fill: 'white' , fontSize: 15}} tickFormatter={(value) => new Intl.NumberFormat('en').format(value)}/>
                      <Tooltip formatter={(value) => new Intl.NumberFormat('en').format(value)} />
                      <Bar dataKey="grossMargin" fill="#3e9fde" />
                    </BarChart>
                  </div>
                </div>
                <div>
                  <h6>Operating Income</h6>
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
                      <YAxis color="#8884d8" tick={{ fill: 'white' , fontSize: 15}} tickFormatter={(value) => new Intl.NumberFormat('en').format(value)}/>
                      <Tooltip formatter={(value) => new Intl.NumberFormat('en').format(value)}/>
                      <Bar dataKey="operatingIncome" fill="#92c5e7" />
                    </BarChart>
                  </div>
                </div>
                <div>
                  <h6>Net Income</h6>
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
                      <YAxis color="#8884d8" tick={{ fill: 'white' , fontSize: 15}} tickFormatter={(value) => new Intl.NumberFormat('en').format(value)}/>
                      <Tooltip formatter={(value) => new Intl.NumberFormat('en').format(value)}/>
                      <Bar dataKey="netIncome" fill="#e3f1f9" />
                    </BarChart>
                  </div>
                </div>
                <div>
                  <h6>balance</h6>
                  <div>
                    <AreaChart
                      width={500}
                      height={300}
                      data={data}
                      margin={{
                        top: 5, right: 30, left: 20, bottom: 5,
                      }}
                    >
                      <XAxis dataKey="name" tick={{ fill: 'white' , fontSize: 15}}/>
                      <YAxis tick={{ fill: 'white' , fontSize: 15}} tickFormatter={(value) => new Intl.NumberFormat('en').format(value)}/>
                      <Tooltip formatter={(value) => new Intl.NumberFormat('en').format(value)} />
                      <Area type="monotone" fillOpacity="1" dataKey="netIncome" stackId="1" stroke="#e3f1f9" fill="#e3f1f9" />
                      <Area type="monotone" fillOpacity="1" dataKey="nonOperatingExpense" stackId="1" stroke="#92c5e7" fill="#92c5e7" />
                      <Area type="monotone" fillOpacity="1" dataKey="operatingExpense" stackId="1" stroke="#3e9fde" fill="#3e9fde" />
                      <Area type="monotone" fillOpacity="1" dataKey="costOfRevenue" stackId="1" stroke="#0060ac" fill="#0060ac" />
                    </AreaChart>
                  </div>
                </div>
              </Items>
              <div>
                <h6 align="left">● Ratio</h6>
              </div>
              <Items>
                <div>
                  <h6>Gross Margin Ratio</h6>
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
                      <YAxis color="#8884d8" tick={{ fill: 'white' , fontSize: 15}} tickFormatter={(value) => new Intl.NumberFormat('en').format(value)}/>
                      <Tooltip formatter={(value) => new Intl.NumberFormat('en').format(value)} />
                      <Bar dataKey="grossMarginR" fill="#4ad1c2" />
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
                      <YAxis color="#8884d8" tick={{ fill: 'white' , fontSize: 15}} tickFormatter={(value) => new Intl.NumberFormat('en').format(value)}/>
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
                      <YAxis color="#8884d8" tick={{ fill: 'white' , fontSize: 15}} tickFormatter={(value) => new Intl.NumberFormat('en').format(value)}/>
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
        : null}
    </div>
  )
}

export default Chart;