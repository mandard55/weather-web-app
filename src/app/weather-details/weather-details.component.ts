import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WeatherService } from "../weather.service";

@Component({
    selector: 'app-form',
    templateUrl: './weather-details.component.html',
    styleUrls: ['./weather-details.component.css'],
})

export class WeatherDetailsComponent implements OnInit {
    public weatherForecastData: any;
    public weatherData: any;
    public cityname;
    public show:boolean = false;
    public buttonName:any = 'Comment';
    public Date;
    public color;
    pressbtlike = true;
    pressbtdislike = true;
    statuslike = 'Enable';
    statusdislike = 'Enable';
    requiredname:string;

    constructor(private weatherService: WeatherService,private route: ActivatedRoute) {
    }

    //show details of weather forecast using city id
    ngOnInit() {
        let cityname = this.route.snapshot.paramMap.get('name');
        this.cityname = cityname;
        this.selectOption(cityname)
    }

    async selectOption(cityname) {
        await this.weatherService.getWeatherForecastList().then(data => {
            const mappeddata = Object.keys(data).map(key => (data[key]));
            let matches = [], i;
            for (i = 0; i < mappeddata.length; i++) {
                if(mappeddata[i]["name"].includes(cityname)) {

                    matches.push(mappeddata[i]);
                }
            }
            console.log("matches",matches);
            this.weatherData = matches;
        })

      };

      toggle() {
        this.show = !this.show;

        // CHANGE THE NAME OF THE BUTTON.
        if(this.show)
          this.buttonName = "Hide";
        else
          this.buttonName = "Comment";
      }

      addcomment(name, details){
        if(name != '' && details != ''){
        this.show = !this.show;
        this.buttonName = "Comment";
        var d = new Date();
        this.Date = d.toDateString() +" "+ d.toLocaleTimeString();
        this.weatherData.push({"Date" : this.Date,
        "Description":details,
        "username":name})
        }

      }

      presslike() {
        this.pressbtlike = !this.pressbtlike;
        this.statuslike = this.pressbtlike ? 'Enable' : 'Disable';

      }
      pressdislike() {
        this.pressbtdislike = !this.pressbtdislike;
        this.statusdislike = this.pressbtdislike ? 'Enable' : 'Disable';
      }
}
