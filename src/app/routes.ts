import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WeatherListComponent } from './weather/weather-list/weather-list.component';
import { WeatherForecastListComponent } from './weather/weather-forecast-list/weather-forecast-list.component';
import { WeatherDetailsComponent } from './weather/weather-details/weather-details.component';

export const allAppRoutes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'weather/weather-list', component: WeatherListComponent },
  { path: 'weather/weather-forecast-list', component: WeatherForecastListComponent },
  { path: 'weather/weather-details/:name', component: WeatherDetailsComponent},
];
