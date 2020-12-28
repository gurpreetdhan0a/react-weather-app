import React, { Component } from 'react';
import axios from 'axios';
const KEY = process.env.REACT_APP_WEATHER_API_KEY;

class Forecast extends Component {
    state = {
        cityName: '',
        result:null, 
        loading:false
    }

    displayWeather = () =>{
        //Show loading div when api is loading
        if(this.state.loading) return (
            <div className="ui active dimmer">
                <div className="ui text loader">Loading</div>
            </div>
        )
        //If no result dont show anything
        if(!this.state.result || this.state.cityName==='') return null;
        //If city is invalid then show an error message
        if (this.state.result[0].error) return (
            <h1 style={{ color:"red" }}>Inavlid city name</h1>
        );
        //Ulimately return JSX
        return (
            this.state.result.map((res, index) =>{
                return(
                <div key={index}>
                <h2 style={{paddingTop : "10px"}}>Showing results for {res.request[0].query}</h2>
                <h2>It is currenty {res.current_condition[0].temp_C}&#8451; <img alt="Weather Icon" src={(res.current_condition[0].weatherIconUrl[0].value)}/></h2>
                <div>
                <table id="weather">
                <tbody>
                <tr><td colSpan="3" style={{textAlign:"center"}}>4 Day forecast</td></tr>
                {res.weather.map((weather, i)=>{
                    return (
                        <tr key={i}>
                            <td>Date: {weather.date}</td>
                            <td>Max Temp: {weather.maxtempC}&#8451;</td>
                            <td>Min Temp: {weather.mintempC}&#8451;</td>
                        </tr>
                    )
                })}
                </tbody>
                </table>
                </div>
                </div>
                )
            })
        )
    }

    getForecast = async () => {
            this.setState({loading:true});
            const response = await axios.get(`https://api.worldweatheronline.com/premium/v1/weather.ashx?key=${KEY}&q=${this.state.cityName}&num_of_days=4&tp=3&format=json`);
            this.setState({result: [response.data.data], loading:false});
    }
    
    render() {
        return (
            <div className="center">
                <h2>Find weather conditions in your area</h2>
                <input autoFocus
                value={this.state.cityName}
                onChange={(e)=> this.setState({cityName: e.target.value, result:null})}
                type="text" placeholder="Enter City"></input>
                <button onClick={()=>this.getForecast()}>Get Forecast</button>
                <div>
                   {this.displayWeather()}
                </div>
            </div>
        );
    }
}

export default Forecast;
