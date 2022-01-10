import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  constructor(private http: HttpClient) {}

  // get weather search by city name
  getWeatherSearchByCity(cityId) {
    const promise = new Promise((resolve, reject) => {
        const url = 'https://api.openweathermap.org/data/2.5/weather?id=' + cityId + '&appid=e93ea4b0201bd57e60f0673c24e3fccd';
        this.http.get(url).toPromise().then(
            res => { resolve(res); },
            err => { console.log(err); }
        );
    });
    return promise;
  }

  // get list of hourly and daily weather
  getWeatherHourlyandDaily(lat, lon) {
    const promise = new Promise((resolve, reject) => {
        // tslint:disable-next-line: max-line-length
        const url = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude=minutely&appid=e93ea4b0201bd57e60f0673c24e3fccd';
        this.http.get(url).toPromise().then(
            res => { resolve(res); },
            err => { console.log(err); }
        );
    });
    return promise;
  }

  // get weather forecast list
  getWeatherForecastList() {
    const promise = new Promise((resolve, reject) => {
        const url = 'https://950cd602-53ea-4cd5-991d-5d794738ac65.mock.pstmn.io/weatherForecastList';
        this.http.get(url).toPromise().then(
            res => { resolve(res); },
            err => { console.log(err); }
        );
    });
    return promise;
  }
}

