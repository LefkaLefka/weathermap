import "rxjs/add/operator/map";
import { Injectable } from "@angular/core";
import { Http } from "@angular/http";

@Injectable()
export class DarkSkyService {
    private corsApiUrl = "https://cors-anywhere.herokuapp.com/";
    private darkSkyURL: string = "https://api.darksky.net/forecast/";
    private darkSkyID: string = "607d86493a3c1f2f20fb7d8a9264b05f";
    private units: string = "units=si";

    constructor(private http: Http) { }

    getWeather(lat: number, lng: number): any {
        let url: string = this.corsApiUrl +
            this.darkSkyURL +
            this.darkSkyID +
            "/" + lat.toString() +
            "," + lng.toString() +
            "?" + this.units;
        return this.http
            .get(url)
            .map((response) => { return response.json() });
    }
}