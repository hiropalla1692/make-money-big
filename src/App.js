import React, { useState } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import IncomeStatement from './components/IncomeStatement';
import Profitability from './components/Profitability';
import MenuBar from './components/MenuBar';
import Overview from './components/Overview';
import { fetchData, fetchQuarterData } from './api';
import styled, {css} from 'styled-components';
import LogoImage from './MMB_LOGO.png';
import DrakeMeme from './drakememe_mmb.jpg';

import './App.css';

const Wrapper = styled.div`
  text-align: center;
  display: flex;
  height: 100%;
  flex-flow: row nowrap;

  img {
    max-width: 80%;
    height: auto;
  }

  @media screen and (max-width:768px) {
  flex-flow: column nowrap;
  }
`

const SideBar = styled.div`
  flex: 0 1 20%;
  text-align: center;
  background-color: #315689;
  @media screen and (max-width:768px) {
    flex: 0 1 15%;
  }
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

  @media screen and (max-width:768px) {
  flex-flow: row nowrap;
  }
`

const Logo = styled.div`
  margin: 5%;
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
  margin: 2%;
  text-align: center;
`

const Menu = styled.div`
  flex: 0 1 70%;
  text-align: center;
  z-index: 10;

  @media screen and (max-width:768px) {
  position: absolute;
  flex-direction: column;
  justify-content: flex-start;
  right: 0px;
  top: 100%;
  height: 100vh;
  opacity: 0.8;
  width: 100%;
  background-color: black;
  transform: translateX(100%);
  transition: transform 0.3s ease-in;
  &.nav-active {
    transform: translateX(0%);
  }
}
`
const MenuBurger = styled.div`
  display: none;
  margin: 3%;
  div {
  width: 25px;
  height: 3px;
  background-color: white;
  margin: 5px;
  }
  @media screen and (max-width:768px) {
  display: block;
  cursor: pointer;
}
`
const Line = styled.div`
  @keyframes Rotate {
    from{
        transform: rotate(0deg);
    }
    to{
        transform: rotate(360deg);
    }
  };
`

const Contents = styled.div`
  flex: 0 1 80%;
  display: flex;
  min-height: 100%;
  padding: 5% 0 5% 0;
  flex-flow: column nowrap;
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
    const menu = document.querySelector('#b')
    menu.classList.toggle('nav-active');
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

  navSlide = () => {
    const menu = document.querySelector('#b')
    const menuLists = document.querySelectorAll('li')
    const burgers = document.querySelectorAll('.burger')
  
    menu.classList.toggle('nav-active');
  
    burgers.forEach((burger) => {
      if (burger.style.animation) {
        burger.style.animation = '';
      } else {
        burger.style.animation = 'Rotate 0.6s ease forwards';
      }
    });
  
    menuLists.forEach((list, index) => {
      if (list.style.animation) {
        list.style.animation = '';
      } else {
        list.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 +0.4}s`
      }
    });
  };

  render() {
  const { stockInfo, stockProfile, stockHistoricalPrice } = this.state;
  return (
    <BrowserRouter>
      <Wrapper>
        <SideBar>
          <Widget>
            <Logo>
              <Link to="/">
                <img border="0" src={LogoImage} width="64" height="64" alt="ロゴ"></img>
              </Link>
            </Logo>
            <MenuBurger id="a" onClick={this.navSlide}>
              <Line className="burger"></Line>
              <Line className="burger"></Line>
              <Line className="burger"></Line>
            </MenuBurger>
            <Menu id="b">
              <Search>
                <input type="text" placeholder="ex. AAPL" value={this.state.value} onChange={this.handleChange}/>
                <button onClick={this.searchSymbol}>search</button>
              </Search>
              <MenuBar/>
            </Menu>
          </Widget>
        </SideBar>
        <Contents>
          {stockInfo.length ? <Overview stockProfile={stockProfile} stockHistoricalPrice={stockHistoricalPrice}/> : null }
          <Switch>
            <Route path="/" exact>
              {stockInfo.length ? 
                (
                  <IncomeStatement 
                  stockInfo={stockInfo}
                  changePeriod = {this.changePeriod}
                  />
                ) 
                : (
                  <div>
                    <h1>MAKE MONEY BIG satisfies him.</h1>
                    <img src={DrakeMeme} width="532" height="512" alt="ドレイク"></img>
                  </div>
                ) }
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
