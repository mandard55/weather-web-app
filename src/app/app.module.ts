import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { allAppRoutes } from './routes';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import { WeatherListComponent } from './weather/weather-list/weather-list.component';
import { MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { WeatherForecastListComponent } from './weather/weather-forecast-list/weather-forecast-list.component';
import { WeatherDetailsComponent } from './weather/weather-details/weather-details.component';
import {MatRadioModule} from '@angular/material/radio';
import {MatToolbarModule, MatSidenavModule, MatListModule, MatIconModule} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    WeatherListComponent,
    WeatherForecastListComponent,
    WeatherDetailsComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(allAppRoutes),
    HttpClientModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatGridListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatRadioModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule
  ],
  providers: [HttpClientModule, HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
