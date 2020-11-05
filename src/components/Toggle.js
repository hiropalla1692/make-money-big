import React, {useState, useEffect } from 'react';
import styled, {css} from 'styled-components';

const Toggle = () => {
  return (
  <Switch>
    <label class="switch__label">
        <input type="checkbox" class="switch__input"/>
        <span class="switch__content"></span>
        <span class="switch__circle"></span>
    </label>
  </Switch>
  );
};

const Switch = styled.div`
.switch__label {
    width: 60px;
    position: relative;
    display: inline-block;
}
.switch__content {
    display: block;
    cursor: pointer;
    position: relative;
    border-radius: 30px;
    height: 31px;
    overflow: hidden;
}
.switch__content:before {
    content: "%";
    display: block;
    padding: 0 -25%;
    position: absolute;
    text-align: right;
    width: calc(100% - 3px);
    height: calc(100% - 3px);
    top: 0;
    left: 0;
    border-radius: 10px;
    background-color: black;
}
.switch__content:after {
    content: "$";
    display: block;
    padding: 0 15%;
    position: absolute;
    text-align: left;
    background-color: #fff;
    width: 0;
    height: 0;
    top: 90%;
    border-radius: 10px;
    -webkit-transition: all .2s;
       -moz-transition: all .2s;
        -ms-transition: all .2s;
         -o-transition: all .2s;
            transition: all .2s;
}
.switch__input {
    display: none;
}
.switch__circle {
    display: block;
    top: 2px;
    left: 2px;
    position: absolute;
    -webkit-box-shadow: 0 2px 6px #999;
            box-shadow: 0 2px 6px #999;
    width: 27px;
    height: 27px;
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
    left: 33px;
}
.switch__input:checked ~ .switch__content:after {
    background-color: #0078D7;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
`

export default Toggle;