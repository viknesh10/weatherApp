import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  url = 'http://api.openweathermap.org/data/2.5/weather?';
  apiKey = 'f8e6adefda1f6718d671a7dddc561b33';
  constructor(private http: HttpClient) { }

  getWeatherData(city: string): Observable<any> {
    return this.http.get(this.url + `q=${city}` + `&appid=${this.apiKey}`);
  }
}
