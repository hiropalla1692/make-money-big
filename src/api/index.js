import axios from 'axios';

require('dotenv').config();
const url = 'https://financialmodelingprep.com/api/v3';
const apikey = process.env.REACT_APP_API_KEY;

var yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);
var yesterdayForApi = yesterday.getFullYear() + "-" +  (yesterday.getMonth()+ 1) + "-" + yesterday.getDate();

var fiveYearsAgo = new Date();
fiveYearsAgo.setDate(fiveYearsAgo.getDate() - 1824);
var fiveYearsAgoForApi = fiveYearsAgo.getFullYear() + "-" +  (fiveYearsAgo.getMonth()+ 1) + "-" + fiveYearsAgo.getDate();

export const fetchData = async (e) => {

  const [firstResponse, secondResponse, thirdResponse ] = await Promise.all([
    axios.get(`${url}/quote/${e}?apikey=${apikey}`),
    axios.get(`${url}/income-statement/${e}?limit=10&apikey=${apikey}`),
    axios.get(`${url}/historical-price-full/${e}?from=${fiveYearsAgoForApi}&to=${yesterdayForApi}&apikey=${apikey}`)
  ]);
  console.log(thirdResponse.data);
  const profile = firstResponse.data.map((profileInfo) => ({
    symbol: profileInfo.symbol,
    name: profileInfo.name,
    price: profileInfo.price,
    changesPercentage: profileInfo.changesPercentage,
    change: profileInfo.change,
    yearHigh: profileInfo.yearHigh,
    yearLow: profileInfo.yearLow,
    exchange: profileInfo.exchange,
    eps: Math.round(profileInfo.eps * 100) / 100,
    pe: Math.round(profileInfo.pe * 100) / 100,
  }))

  const modifiedPlData = secondResponse.data.map((plInfo) => ({
    date: plInfo.date.split('-'),
    period: plInfo.period,
    symbol: plInfo.symbol,
    revenue: plInfo.revenue/1000000,
    costOfRevenue: plInfo.costOfRevenue/1000000,
    researchAndDevelopmentExpenses: plInfo.researchAndDevelopmentExpenses/1000000,
    generalAndAdministrativeExpenses: plInfo.generalAndAdministrativeExpenses/1000000,
    sellingAndMarketingExpenses: plInfo.sellingAndMarketingExpenses/1000000,
    depreciationAndAmortization: plInfo.depreciationAndAmortization/1000000,
    otherExpenses: plInfo.otherExpenses/1000000,
    operatingIncome: plInfo.operatingIncome/1000000,
    operatingExpenses: plInfo.operatingExpenses/1000000,
    interestExpense: plInfo.interestExpense/1000000,
    incomeTaxExpense: plInfo.incomeTaxExpense/1000000,
    netIncome: plInfo.netIncome/1000000,
    eps: Math.round(plInfo.epsdiluted * 100) / 100,
    weightedAverageShsOutDil: plInfo.weightedAverageShsOutDil/1000000,
  }))

  const historicalPrice = thirdResponse.data.historical.map((dailyPrice) => ({
    price: dailyPrice.close,
    date: dailyPrice.date.split('-'),
    volume: dailyPrice.volume,
  }))



  return [modifiedPlData, profile, historicalPrice];
}

export const fetchProfitData = async (e) => {
  const { data } = await axios.get(`${url}/balance-sheet-statement/${e}?apikey=${apikey}&limit=10`);
  const modifiedBsData = data.map((bsInfo) => ({
    date: bsInfo.date,
    totalLiabilities: bsInfo.totalLiabilities/1000000,
    totalStockholdersEquity: bsInfo.totalStockholdersEquity/1000000,
  }))
  return modifiedBsData;
}

export const fetchQuarterData = async (e) => {
  const { data } = await axios.get(`${url}/income-statement/${e}?period=quarter&limit=10&apikey=${apikey}`);
  const modifiedPlqData = data.map((plInfo) => ({
      date: plInfo.date.split('-'),
      period: plInfo.period,
      symbol: plInfo.symbol,
      revenue: plInfo.revenue/1000000,
      costOfRevenue: plInfo.costOfRevenue/1000000,
      researchAndDevelopmentExpenses: plInfo.researchAndDevelopmentExpenses/1000000,
      generalAndAdministrativeExpenses: plInfo.generalAndAdministrativeExpenses/1000000,
      sellingAndMarketingExpenses: plInfo.sellingAndMarketingExpenses/1000000,
      depreciationAndAmortization: plInfo.depreciationAndAmortization/1000000,
      otherExpenses: plInfo.otherExpenses/1000000,
      operatingIncome: plInfo.operatingIncome/1000000,
      operatingExpenses: plInfo.operatingExpenses/1000000,
      interestExpense: plInfo.interestExpense/1000000,
      incomeTaxExpense: plInfo.incomeTaxExpense/1000000,
      netIncome: plInfo.netIncome/1000000,
      eps: Math.round(plInfo.epsdiluted * 100) / 100,
      weightedAverageShsOutDil: plInfo.weightedAverageShsOutDil/1000000,
  }))
  return modifiedPlqData;
}
