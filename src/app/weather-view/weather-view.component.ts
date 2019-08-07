import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../shared/services/weather.service';

@Component({
  selector: 'app-weather-view',
  templateUrl: './weather-view.component.html',
  styleUrls: ['./weather-view.component.css']
})
export class WeatherViewComponent implements OnInit {

  settingCityActive = [false, false, false, false, false, false, false, false, false];
  hideControls = [true, true, true, true, true, true, true, true, true];
  cityName = ['', '', '', '', '', '', '', '', ''];
  currentCity: string;
  isCityActive = false;
  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
  }

  cityClicked(id: number) {
    this.settingCityActive[id - 1] = true;
  }
  getWeather(event: any, id: number) {
    this.currentCity = event;
    this.cityName[id - 1] = event;
  }
  validCityCheck(event, id: number) {
    if (!event) {
      this.hideControls[id - 1] = true;
    }
    this.cityName[id - 1] = '';
  }
  enterEditMode(event, id: number) {
    if (event) {
      this.settingCityActive[id - 1] = true;
      this.hideControls[id - 1] = true;
    }
  }
}
