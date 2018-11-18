//src/compoennts/Main.js
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './Home.js';
export default class Main extends Component{
    render(){
        return(
            <Router>
            <div>
              <Route exact path="/" component={Home} />
              <Route path="/about" component={About} />
            </div>
          </Router>
        );
    }
}
const About = () => (
    <div>
      <h2>About</h2>
    </div>
  );