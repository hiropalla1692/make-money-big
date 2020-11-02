import axios from 'axios';

require('dotenv').config();
const url = 'https://financialmodelingprep.com/api/v3';
const apikey = process.env.REACT_APP_API_KEY;

export const fetchData = async (e) => {
    const { data } = await axios.get(`${url}/income-statement/${e}?limit=10&apikey=${apikey}`);
    const modifiedData = data.map((plInfo) => ({
      date: plInfo.date.split('-'),
      symbol: plInfo.symbol,
      revenue: plInfo.revenue/1000000,
      costOfRevenue: plInfo.costOfRevenue/1000000,
      researchAndDevelopmentExpenses: plInfo.researchAndDevelopmentExpenses,
      generalAndAdministrativeExpenses: plInfo.generalAndAdministrativeExpenses,
      sellingAndMarketingExpenses: plInfo.sellingAndMarketingExpenses,
      otherExpenses: plInfo.otherExpenses,
      operatingIncome: plInfo.operatingIncome/1000000,
      netIncome: plInfo.netIncome/1000000,
      eps: Math.round(plInfo.epsdiluted * 100) / 100,
      weightedAverageShsOutDil: plInfo.weightedAverageShsOutDil/1000000,
    }))
    return modifiedData;
}