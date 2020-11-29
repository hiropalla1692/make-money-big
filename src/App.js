import React, { useState } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import IncomeStatement from './components/IncomeStatement';
import Profitability from './components/Profitability';
import CashFlowStatement from './components/CashFlowStatement';
import MenuBar from './components/MenuBar';
import Overview from './components/Overview';
import { fetchData, fetchQuarterData } from './api';
import styled, {css, ThemeProvider} from 'styled-components';
import LogoImage from './MMB_LOGO.png';
import searchIcon from './search.svg';
import theme from './ColorChart';
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
  min-height: 100vh;
  background-color: ${props => props.theme.light_dark};
  @media screen and (max-width:768px) {
    flex: 0 1 15%;
    min-height: 10vh;
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
  margin: 12% 4% 4% 4%;
  text-align: center;
  display: flex;
  flex-flow: nowrap;
  justify-content: center;
  span {
    background-image: url(logomark.svg);
    position: absolute;
    display: flex;
    padding: 4% 5%;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  input {
    border-radius: 60px;
    width: 70%;
    padding: 8px 12px 8px 36px;
    background-color: #a8aab2;
    font-family: "Poppins";
    -webkit-appearance: none;
    border: none;
    :focus {
      outline: none;
      box-shadow: 0 0 0 1.5px ${props => props.theme.cfs1};
    } 
  }
  button {
    display: none;
    border-radius: 60px;
    padding: 4% 6% 4% 6%;
    background-color: ${props => props.theme.red};
    color: white;
    font-family: "Poppins";
    -webkit-appearance: none;
    border: none;
    :focus {
    outline: none;
    } 
  }
`

const Menu = styled.div`
  flex: 0 1 70%;
  text-align: center;

  @media screen and (max-width:768px) {
  display: none;
  position: absolute;
  z-index: 100;
  flex-direction: column;
  justify-content: flex-start;
  right: 0px;
  top: 100%;
  height: 100vh;
  opacity: 0.95;
  width: 100%;
  background-color: black;
  transform: translateX(100%);
  transition: transform 0.3s ease-in;
  &.nav-active {
    display: block;
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
  font-family: "Poppins";
  width: 100%;
  color: white;
  background-color: ${props => props.theme.dark};
  p {
    text-align: left;
    padding: 10%;
  }
`

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      stockInfo: [],
      stockProfile: {},
      stockHistoricalPrice: {},
    };
    this.handleChange = this.handleChange.bind(this);
    this.searchSymbol = this.searchSymbol.bind(this);
    this.resetSymbol = this.resetSymbol.bind(this);
    this.changePeriod = this.changePeriod.bind(this);

  }

  searchSymbol = async (e) => {
    e.preventDefault();
    const menu = document.querySelector('#b')
    menu.classList.toggle('nav-active');
    const searchword = this.state.value
    const fetchedData = await fetchData(searchword);
    this.setState({stockInfo: fetchedData[0]});
    this.setState({stockProfile: fetchedData[1]});
    this.setState({stockHistoricalPrice: fetchedData[2]});
  }

  resetSymbol = () => {
    this.setState({stockInfo:[]});
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
    const burgers = document.querySelectorAll('.burger')
  
    menu.classList.toggle('nav-active');
  
    burgers.forEach((burger) => {
      if (burger.style.animation) {
        burger.style.animation = '';
      } else {
        burger.style.animation = 'Rotate 0.6s ease forwards';
      }
    });
  };

  render() {
  const { stockInfo, stockProfile, stockHistoricalPrice } = this.state;
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Wrapper>
          <SideBar>
            <Widget>
              <Logo onClick={this.resetSymbol}>
                <Link to="/">
                  <h3>makeMoneyBig.</h3>
                </Link>
              </Logo>
              <MenuBurger id="a" onClick={this.navSlide}>
                <Line className="burger"></Line>
                <Line className="burger"></Line>
                <Line className="burger"></Line>
              </MenuBurger>
              <Menu id="b">
                <form onSubmit={this.searchSymbol}>
                  <Search>
                    <div>
                      <span><img src={searchIcon} width="18px"></img></span>
                    </div>
                    <div>
                      <input type="text" placeholder="ex. AAPL" value={this.state.value} onChange={this.handleChange} />
                    </div>
                    <div>
                      <button type="submit">Search</button>
                    </div>
                  </Search>
                </form>
                <MenuBar />
              </Menu>
            </Widget>
          </SideBar>
          <Contents>
            {stockInfo.length ? <Overview stockInfo={stockInfo} stockProfile={stockProfile} stockHistoricalPrice={stockHistoricalPrice}/> : null }
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
                      <h1>makeMoneyBig. satisfies you.</h1>
                      <img src={DrakeMeme} width="532" height="512" alt="ドレイク"></img>
                      <p>
                        makeMoneyBig. provides you with valuable visuals from financial data of individual firms, which helps you to instantly figure out what they really were, are and will be.<br></br>
                        <br></br>
                        There are three principles that I am guided by in making visuals from data.<br></br>
                        1. Insightful🦍<br></br>
                        2. Easy to understand🚿<br></br>
                        3. Aesthetic🖼<br></br>
                        <br></br>
                        Let's dive in...
                      </p>
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
                <CashFlowStatement stockInfo={stockInfo}/>
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
      </ThemeProvider>
    </BrowserRouter>
  )}
};

function Valuation() {
  return <h2>Valuationだよ</h2>;
}

function BalanceSheet() {
  return <h2>B/Sだよ</h2>;
}


export default App;
