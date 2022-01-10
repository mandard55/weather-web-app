import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WeatherListComponent } from './weather-list/weather-list.component';
import { WeatherForecastListComponent } from './weather-forecast-list/weather-forecast-list.component';
import { WeatherDetailsComponent } from './weather-details/weather-details.component';

export const allAppRoutes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'weather-list', component: WeatherListComponent },
  { path: 'weather-forecast-list', component: WeatherForecastListComponent },
  { path: 'weather-details/:name', component: WeatherDetailsComponent},
];
