import React, { Component } from 'react';
import Logo from './Logo/Logo'
import Forecast from './Forecast';
import '../App.css'


class App extends Component {
    render() {
        return (
            <div className="ui container">
            <div className="center">
            <Logo />
            <h1>React Weather App</h1>
            <Forecast/>
            </div>
            </div>
        );
    }
}

export default App;