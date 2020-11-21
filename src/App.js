import React, { useState } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import IncomeStatement from './components/IncomeStatement';
import Profitability from './components/Profitability';
import MenuBar from './components/MenuBar';
import Overview from './components/Overview';
import { fetchData, fetchQuarterData } from './api';
import styled, {css} from 'styled-components';

import './App.css';

const Wrapper = styled.div`
  text-align: center;
  background-color: #313896;
  display: flex;
  flex-direction: row nowrap;
`

const SideBar = styled.div`
  flex: 0 1 20%;
  text-align: center;
  background-color: #315689;
`
const Widget = styled.div`
  position: sticky;
  top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  font-size: calc(4px + 2vmin);
  font-family: "Poppins";
  font-weight: bold;
  color: white;
  a {
    color: white;
    text-decoration: none;
  }
`

const Logo = styled.div`
  margin: 0;
  flex: 0 1 15%;
  text-align: center;
   div {
     padding: 1vh;
     border-radius: 8px;
     color: #f2c85e;
   }
`
const Search = styled.div`
  flex: 0 1 15%;
  text-align: center;
`
const Menu = styled.div`
  flex: 0 1 70%;
  text-align: center;
`

const Contents = styled.div`
  flex: 0 1 80%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  width: 100%;
  background-color: #f5f3f0;
`

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      stockInfo: [],
      stockProfile: {},
      stockHistoricalPrice: {},
      menu: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.searchSymbol = this.searchSymbol.bind(this);
    this.changePeriod = this.changePeriod.bind(this);

  }

  searchSymbol = async () => {
    const searchword = this.state.value
    const fetchedData = await fetchData(searchword);
    this.setState({stockInfo: fetchedData[0]});
    this.setState({stockProfile: fetchedData[1]});
    this.setState({stockHistoricalPrice: fetchedData[2]});
  }

  handleChange = (e) => {
    this.setState({value: e.target.value.toUpperCase()})
  }

  changePeriod = async (e) => {
    console.log(e);
    if (e === true) {
      const fetchedData = await fetchData(this.state.value);
      this.setState({stockInfo: fetchedData[0]});
    } else {
      const fetchedData = await fetchQuarterData(this.state.value);
      this.setState({stockInfo: fetchedData});
    }
  }

  render() {
  const { stockInfo, stockProfile, stockHistoricalPrice } = this.state;
  return (
    <BrowserRouter>
      <Wrapper>
        <SideBar>
          <Widget>
            <Logo>
              <div>
                MakeMoneyBig.
              </div>
            </Logo>
            <Search>
              <input type="text" placeholder="ex. AAPL" value={this.state.value} onChange={this.handleChange}/>
              <button onClick={this.searchSymbol}>search</button>
            </Search>
            <Menu>
              <MenuBar/>
            </Menu>
          </Widget>
        </SideBar>
        <Contents>
          {stockInfo.length ? <Overview stockProfile={stockProfile} stockHistoricalPrice={stockHistoricalPrice}/> : null }
          <Switch>
            <Route path="/" exact>
              <div>hi</div>
            </Route>
            <Route path="/pl" >
              <IncomeStatement 
                stockInfo={stockInfo}
                changePeriod = {this.changePeriod}
              />
            </Route>
            <Route path="/bs" >
              <BalanceSheet/>
            </Route>
            <Route path="/cs" >
              <CashFlowStatement/>
            </Route>
            <Route path="/val">
              <Valuation />
            </Route>
            <Route path="/profit">
              <Profitability stockInfo={stockInfo} />
            </Route>
          </Switch>
        </Contents>
      </Wrapper>
    </BrowserRouter>
  )}
};

function Valuation() {
  return <h2>Valuationだよ</h2>;
}

function BalanceSheet() {
  return <h2>B/Sだよ</h2>;
}

function CashFlowStatement() {
  return <h2>C/Sだよ</h2>;
}


export default App;
