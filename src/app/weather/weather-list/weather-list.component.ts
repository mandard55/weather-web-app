import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { WeatherListDataSource } from './weather-list-datasource';
import { WeatherService } from '../../weather.service';


@Component({
  selector: 'app-weather-list',
  templateUrl: './weather-list.component.html',
  styleUrls: ['./weather-list.component.css']
})
export class WeatherListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: WeatherListDataSource;

  public hourlyData: any;
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name', 'lon', 'lat'  ];
  constructor(private weatherService: WeatherService) { }
  ngOnInit() {
    this.dataSource = new WeatherListDataSource(this.paginator, this.sort);
  }

  async onSelect(city: WeatherListComponent, option) {
   // this.selectedCity = city;
    if (option === 'Hourly') {
        await this.weatherService.getWeatherHourlyandDaily(city['lat'], city['lon']).then( data => {
            this.hourlyData = data['hourly'];
            const hourlyData = [];
            for (let i = 0; i < 8; i++) {
                const date = new Date(this.hourlyData[i]['dt'] * 1000);
                const temp = (this.hourlyData[i]['temp'] - 273.15).toFixed(0);
                hourlyData.push({time: date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}), temp: temp + '°C'});
            }
            this.hourlyData = hourlyData;
            console.log(this.hourlyData);
        });
    } else {
        await this.weatherService.getWeatherHourlyandDaily(city['lat'], city['lon']).then(
            data => {
            this.hourlyData = data['daily'];
            const hourlyData = [];
            const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Frsi', 'Sat'];
            for (let i = 0; i < 8; i++) {
                const minTemp = this.hourlyData[i]['temp'];
                const date = new Date(this.hourlyData[i]['dt'] * 1000);
                const min = (minTemp.min - 273.15).toFixed(0);
                const max = (minTemp.max - 273.15).toFixed(0);
                hourlyData.push({time: days[date.getDay()] + ' ' + date.getUTCFullYear(), minTemp: min + '°C ' + max + '°C'});
            }
            this.hourlyData = hourlyData;
        });
    }
  }
}
