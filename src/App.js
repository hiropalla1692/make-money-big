import React, { useState } from 'react';
import Chart from './components/Chart';
import Header from './components/Header';
import MenuBar from './components/MenuBar';
import { fetchData } from './api';
import SplitPane, { Pane } from 'react-split-pane';
import styled, {css} from 'styled-components';

import './App.css';

const Container = styled.div`
  text-align: center;
  background-color: #282c34;
  min-height: 100vh;
  /* display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; */
  font-size: calc(10px + 2vmin);
  font-family: "Roboto";
  color: white;
  a {
    color: white;
    text-decoration: none;
  }
`

const Contents = styled.div`
  display: flex;
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
  }

  searchSymbol = async () => {
    const searchword = this.state.value
    const fetchedData = await fetchData(searchword);
    this.setState({stockInfo: fetchedData});
  }

  handleChange = (e) => {
    this.setState({value: e.target.value.toUpperCase()})
  }

  render() {
  const { stockInfo } = this.state;
  return (
      <Container>
        <Header/>
        <input type="text" placeholder="search symbol" value={this.state.value} onChange={this.handleChange}/>
        <button onClick={this.searchSymbol}>search</button>
        <SplitPane split="vertical" minSize={50} defaultSize={"20%"} style={ {overflow: "auto"} }>
          <Pane style={ {position: "fixed"} }>
            <MenuBar/>
          </Pane>
          <Contents>
            <Chart stockInfo={stockInfo} />
          </Contents>
        </SplitPane>
      </Container>
  )}
};



export default App;
