import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { WeatherListDataSource } from './weather-list-datasource';
import { WeatherService } from '../weather.service';


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
  displayedColumns = ['name','lon', 'lat'  ];
  constructor(private weatherService: WeatherService) { }
  ngOnInit() {
    this.dataSource = new WeatherListDataSource(this.paginator, this.sort);
  }

  async onSelect(city: WeatherListComponent,option) {

    console.log("####",city["lat"],city["lon"]);
   // this.selectedCity = city;
    if(option == 'Hourly'){
        await this.weatherService.getWeatherHourlyandDaily(city["lat"],city["lon"]).then(data =>{
            this.hourlyData = data["hourly"];
            let hourlyData = [], i;
            for (i = 0; i < 8; i++) {
                var date = new Date(this.hourlyData[i]["dt"] * 1000);
                var temp = (this.hourlyData[i]["temp"] - 273.15).toFixed(0)
                hourlyData.push({time:date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),temp:temp+"°C"});
            }
            this.hourlyData = hourlyData;
            console.log(this.hourlyData);
        });
    }
    else
    {
        await this.weatherService.getWeatherHourlyandDaily(city["lat"],city["lon"]).then(
            data =>{
            this.hourlyData = data["daily"];
            let hourlyData = [], i;
            var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            for (i = 0; i < 8; i++) {
                var minTemp = this.hourlyData[i]["temp"]
                var date = new Date(this.hourlyData[i]["dt"] * 1000);
                var min = (minTemp.min - 273.15).toFixed(0)
                var max = (minTemp.max - 273.15).toFixed(0)
                hourlyData.push({time:days[date.getDay()]+" "+ date.getUTCFullYear(),minTemp:min+'°C '+max+'°C',});
            }
            this.hourlyData = hourlyData;
        });
    }
  }
}
