import { Component, OnInit, Output, OnChanges, EventEmitter } from '@angular/core';
import { WeatherService } from '../shared/services/weather.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-weather-fetch',
  templateUrl: './weather-fetch.component.html',
  styleUrls: ['./weather-fetch.component.css']
})
export class WeatherFetchComponent implements OnInit {

  @Output() isValidCity = new EventEmitter();
  @Output() editMode = new EventEmitter();
  cityName: string;
  windDirection: string;
  weatherDescription: string;
  sunrise: string;
  sunset: string;
  imageURL: string;
  temperature: number;
  minTemperature: number;
  maxTemperature: number;
  pressure: number;
  humidity: number;
  weatherId: number;
  windSpeed: number;
  isWeatherValid = false;
  constructor(private weatherService: WeatherService, private toastr: ToastrService) { }

  ngOnInit() {
  }
  getWeather(city: string) {
    if (city !== '' && city !== undefined) {
      this.weatherService.getWeatherData(city).subscribe((resp) => {
        if (resp.cod !== 404) {
          this.isWeatherValid = true;
          this.cityName = resp.name;
          this.weatherDescription = resp.weather[0].description;
          const mainWeather = resp.weather[0].main;
          const windDirection = resp.wind.deg;
          this.windSpeed = +(resp.wind.speed * 3.6).toFixed(2);
          this.humidity = resp.main.humidity;
          this.pressure = resp.main.pressure;
          this.temperature = +(resp.main.temp - 273.15).toFixed(2);
          this.maxTemperature = +(resp.main.temp_max - 273.15).toFixed(2);
          this.minTemperature = +(resp.main.temp_min - 273.15).toFixed(2);
          this.sunset = this.getTime(resp.sys.sunset);
          this.sunrise = this.getTime(resp.sys.sunrise);
          this.getDirection(windDirection);
          this.getWeatherIcons(mainWeather);
        } else {
          this.isWeatherValid = false;
          this.toastr.error('Please enter a valid city', 'Invalid City');
          this.isValidCity.emit(false);
        }
      },
        err => {
          this.isWeatherValid = false;
          this.toastr.error('Please enter a valid city', 'Invalid City');
          this.isValidCity.emit(false);
        });
    } else {
      this.isWeatherValid = false;
      this.toastr.error('Please enter a valid city', 'Invalid City');
      this.isValidCity.emit(false);
    }
  }

  getTime(seconds: number) {
    const date = new Date(seconds * 1000);
    let hours = date.getHours().toString();
    let minutes = date.getMinutes().toString();
    if (minutes.toString().length === 1) {
      minutes = '0' + minutes;
    }
    if (hours.toString().length === 1) {
      hours = '0' + hours;
    }
    const time = hours + ':' + minutes;
    return time;
  }

  getWeatherIcons(weather: string) {
    switch (weather.toLowerCase()) {
      case 'thunderstorm':
        this.imageURL = 'assets/11d@2x.png';
        break;
      case 'drizzle':
        this.imageURL = 'assets/10d@2x.png';
        break;
      case 'rain':
        this.imageURL = 'assets/09d@2x.png';
        break;
      case 'snow':
        this.imageURL = 'assets/13d@2x.png';
        break;
      case 'clear':
        this.imageURL = 'assets/01d@2x.png';
        break;
      case 'clouds':
        this.imageURL = 'assets/02d@2x.png';
        break;
      default:
        this.imageURL = 'assets/50d@2x.png';
        break;
    }
  }

  getDirection(degree: number) {
    if (degree >= 11.25 && degree <= 78.75) {
      this.windDirection = 'North';
    } else if (degree >= 78.75 && degree <= 168.75) {
      this.windDirection = 'East';
    } else if (degree >= 168.75 && degree <= 258.75) {
      this.windDirection = 'South';
    } else if (degree >= 258.75 && degree <= 348.75) {
      this.windDirection = 'West';
    } else {
      this.windDirection = 'North';
    }
  }

  editCity() {
    this.isWeatherValid = false;
    this.editMode.emit(true);
  }

}
