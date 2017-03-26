import "rxjs/add/operator/map";
import { Injectable } from "@angular/core";
import { Http } from "@angular/http";

@Injectable()
export class DarkSkyService {
    private darkSkyID: string = "607d86493a3c1f2f20fb7d8a9264b05f";
    private darkSkyURL: string = "https://api.darksky.net/forecast/";

    constructor(private http: Http) { }

    getWeather(lat: number, lng: number) {
        let url: string = this.darkSkyURL + this.darkSkyID +
            "/" + lat.toString() +
            "," + lng.toString();
        return this.http
            .get(url)
            .map((response) => {return response.json()});
    }
}