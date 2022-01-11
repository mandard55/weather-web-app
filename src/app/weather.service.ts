import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  constructor(private http: HttpClient) {}


   // Handle API errors
   handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }

  // get weather search by city name
  getWeatherSearchByCity(cityId) {
    const promise = new Promise((resolve, reject) => {
        const url = 'https://api.openweathermap.org/data/2.5/weather?id=' + cityId + '&appid=e93ea4b0201bd57e60f0673c24e3fccd';
        this.http.get(url).pipe(
          retry(2),
          catchError(this.handleError)
        ).toPromise().then(
            res => { resolve(res); }
        );
    });
    return promise;
  }

  // get list of hourly and daily weather
  getWeatherHourlyandDaily(lat, lon) {
    const promise = new Promise((resolve, reject) => {
        // tslint:disable-next-line: max-line-length
        const url = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude=minutely&appid=e93ea4b0201bd57e60f0673c24e3fccd';
        this.http.get(url).pipe(
          retry(2),
          catchError(this.handleError))
          .toPromise().then(
            res => { resolve(res); }
        );
    });
    return promise;
  }

  // get weather forecast list
  getWeatherForecastList() {
    const promise = new Promise((resolve, reject) => {
        const url = 'https://950cd602-53ea-4cd5-991d-5d794738ac65.mock.pstmn.io/weatherForecastList';
        this.http.get(url).pipe(
          retry(2),
          catchError(this.handleError)
          ).toPromise().then(
            res => { resolve(res); }
        );
    });
    return promise;
  }
}

