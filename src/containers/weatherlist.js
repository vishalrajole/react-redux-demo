import React, { Component } from 'react';
import { connect } from 'react-redux';
import SparkLineChart from '../components/sparkline-chart';
import GoogleMap from '../components/google_map';

class WeatherList extends Component {
    renderWeather(cityData) {
        const name = cityData.city.name;
        const temps = cityData.list.map(weather => weather.main.temp);
        const pressures = cityData.list.map(weather => weather.main.pressure);
        const humidities = cityData.list.map(weather => weather.main.humidity);
        const { lon, lat } = cityData.city.coord;

        return (
            <tr key={name}>
                <td><GoogleMap lat={lat} lon={lon} /></td>
                <td><SparkLineChart data={temps} color="red" unit="K" /></td>
                <td><SparkLineChart data={pressures} color="blue" unit="hPa" /></td>
                <td><SparkLineChart data={humidities} color="black" unit="%" /></td>
            </tr>
        )
    }
    render() {
        return (
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>City </th>
                        <th>Temperature (K)</th>
                        <th>Pressure (hPa)</th>
                        <th>Humidity (%)</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.weather.map(this.renderWeather)}
                </tbody>
            </table>
        )
    }
}

function mapStateToProp({ weather }) {
    return { weather };
}
export default connect(mapStateToProp)(WeatherList);