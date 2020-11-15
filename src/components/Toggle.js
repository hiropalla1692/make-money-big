import React, {useState, useEffect } from 'react';
import styled, {css} from 'styled-components';

const Toggle = (props) => {
  if (props.annual === true) {
  return (
    <Switch period>
      <label class="switch__label">
          <input type="checkbox" class="switch__input" onClick={props.change}/>
          <span class="switch__content"></span>
          {/* <span class="switch__circle"></span> */}
      </label>
    </Switch>
  )} else {
    return (
      <Switch>
        <label class="switch__label">
            <input type="checkbox" class="switch__input" onClick={props.change}/>
            <span class="switch__content"></span>
            {/* <span class="switch__circle"></span> */}
        </label>
      </Switch>
    );
  }
};

const Switch = styled.div`
  display: inline-block;
  text-align: center;
  font-weight: bold;
  margin: 1%;

  .switch__label {
      width: 80px;
      position: relative;
      display: inline-block;
      text-align: center;
  }
  .switch__content {
      display: block;
      cursor: pointer;
      position: relative;
      border-radius: 30px;
      height: 20px;
      overflow: hidden;
  }
  .switch__content:before {
      content: "$";
      display: block;
      position: absolute;
      text-align: center;
      width: calc(100% - 0px);
      height: calc(100% - 0px);
      top: 0px;
      left: 0px;
      border-radius: 10px;
      color: #f8f8fc;
      background-color: #313896;
  }
  .switch__content:after {
      content: "%";
      display: block;
      position: absolute;
      text-align: center;
      background-color: #a93abc;
      color: white;
      width: 0;
      height: 0;
      top: 100%;
      border-radius: 10px;
      -webkit-transition: all .5s;
        -moz-transition: all .5s;
          -ms-transition: all .5s;
          -o-transition: all .5s;
              transition: all .5s;
  }
  .switch__input {
      display: none;
  }
  .switch__circle {
      display: block;
      top: 0px;
      left: 0px;
      position: absolute;
      -webkit-box-shadow: 0 2px 6px #999;
              box-shadow: 0 2px 6px #999;
      width: 20px;
      height: 20px;
      -webkit-border-radius: 20px;
              border-radius: 20px;
      background-color: #fff;
      -webkit-transition: all .5s;
        -moz-transition: all .5s;
          -ms-transition: all .5s;
          -o-transition: all .5s;
              transition: all .5s;
  }
  .switch__input:checked ~ .switch__circle {
      left: 20px;
  }
  .switch__input:checked ~ .switch__content:after {
      background-color: #ff5e5e;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
  }

  ${props => props.period && css`
    .switch__content:before {
      content: "Annual";
    }
    .switch__content:after {
      content: "Quarter";
    }
  `}
`

export default Toggle;