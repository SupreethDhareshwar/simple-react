//src/components/Home.js
import React, { Component } from 'react';
import BodyArea from './BodyArea';

export default class Home extends Component{
  render(){
    return(
      <div>
        <BodyArea sendRowData={ this.getRowData } />
      </div>
    )
  }
}


