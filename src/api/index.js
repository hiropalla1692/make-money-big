import axios from 'axios';

require('dotenv').config();
const url = 'https://financialmodelingprep.com/api/v3';
const apikey = process.env.REACT_APP_API_KEY;

export const fetchData = async (e) => {

  const [firstResponse, secondResponse] = await Promise.all([
    axios.get(`${url}/profile/${e}?apikey=${apikey}`),
    axios.get(`${url}/income-statement/${e}?limit=10&apikey=${apikey}`)
  ]);
  console.log(secondResponse.data);
  const profile = firstResponse.data.map((profileInfo) => ({
    symbol: profileInfo.symbol,
    price: profileInfo.price,
    beta: profileInfo.beta,
    companyName: profileInfo.companyName,
    industry: profileInfo.industry,
    sector: profileInfo.sector,
    website: profileInfo.website
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

  return [modifiedPlData, profile];
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
