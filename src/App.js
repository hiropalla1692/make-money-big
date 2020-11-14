import React, { useState } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import IncomeStatement from './components/IncomeStatement';
import Profitability from './components/Profitability';
import Header from './components/Header';
import MenuBar from './components/MenuBar';
import Toggle from './components/Toggle';
import { fetchData, fetchQuarterData } from './api';
import SplitPane, { Pane } from 'react-split-pane';
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
  background-color: #313896;
  
`
const Widget = styled.div`
  position: sticky;
  top: 20px;
  display: flex;
  flex-direction: column;
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
  flex: 0 1 10%;
  text-align: center;
   div {
     padding: 1vh;
     border-radius: 8px;
     /* background: rgb(255,94,94);
     background: linear-gradient(90deg, rgba(255,94,94,1) 0%, rgba(0,215,255,1) 0%, rgba(53,207,78,1) 100%); */
     background: linear-gradient(90deg, rgba(255,94,94,1) 0%, rgba(0,215,255,1) 0%, rgba(53,207,78,1) 100%);
     -webkit-background-clip: text;
     -webkit-text-fill-color: transparent;
   }
`
const Search = styled.div`
  flex: 0 1 10%;
  text-align: center;
`
const Menu = styled.div`
  flex: 0 1 80%;
  text-align: center;
`

const Contents = styled.div`
  flex: 0 1 80%;
  display: flex;
  width: 100%;
  background-color: #eeeff7;
`

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      stockInfo: [],
      menu: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.searchSymbol = this.searchSymbol.bind(this);
    this.changePeriod = this.changePeriod.bind(this);

  }

  searchSymbol = async () => {
    const searchword = this.state.value
    const fetchedData = await fetchData(searchword);
    this.setState({stockInfo: fetchedData});
  }

  handleChange = (e) => {
    this.setState({value: e.target.value.toUpperCase()})
  }

  changePeriod = async (e) => {
    console.log(e);
    if (e === true) {
      const fetchedData = await fetchData(this.state.value);
      this.setState({stockInfo: fetchedData});
    } else {
      const fetchedData = await fetchQuarterData(this.state.value);
      this.setState({stockInfo: fetchedData});
    }
  }

  render() {
  const { stockInfo } = this.state;
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
          <Switch>
            <Route path="/val">
              <Valuation />
            </Route>
            <Route path="/profit">
              <Profitability stockInfo={stockInfo} />
            </Route>
            <Route path="/" exact >
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
