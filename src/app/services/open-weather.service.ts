import "rxjs/add/operator/map";
import { Injectable } from "@angular/core";
import { Http } from "@angular/http";

@Injectable()
export class OpenWeatherService {
    private openWeatherID: string = "b4700b8be032515af1e1c1730a13e4b5";
    private openWeatherURL: string = "http://api.openweathermap.org/data/2.5/forecast?";

    constructor(private http: Http) {}

    getWeather(lat: number, lng: number) {
        let url: string = this.openWeatherURL +
            "lat=" + lat.toString() +
            "&lon=" + lng.toString() +
            "&appid=" + this.openWeatherID;
        return this.http
            .get(url)
            .map((response) => {return response.json()});
    }
}