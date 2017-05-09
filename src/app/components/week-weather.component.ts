import { Component, Input } from "@angular/core";

@Component({
    selector: "week-weather",
    templateUrl: "../templates/week-weather.component.html"
})

export class WeekWeatherComponent {
    dateFormat = require("dateformat");
    _weekData: any;
    selectedDay: any;
    classes: string = "moon";

    @Input()
    set weekData(data: any) {
        if(data) {
            this._weekData = data.daily.data;
            for(let i = 0; i < 8; ++i) {
                this._weekData[i].time = this.dateFormat(new Date(this._weekData[i].time * 1000), "dddd, mmmm dS, yyyy");
                this._weekData[i].sunriseTime = this.dateFormat(new Date(this._weekData[i].sunriseTime * 1000),
                    "h:MM:ss TT");
                this._weekData[i].sunsetTime = this.dateFormat(new Date(this._weekData[i].sunsetTime * 1000),
                    "h:MM:ss TT");
            }
            this.selectedDay = null;
        }
    }

    get weekData() {
        return this._weekData;
    }

    onSelect(dayWeather: any) {
        this.selectedDay = dayWeather;
        let moonPhase = this.selectedDay.moonPhase;
        if(moonPhase >= 0 && moonPhase < 0.125) {
            this.classes = "moon phase1";
        } else
            if(moonPhase >= 0.125 && moonPhase < 0.25) {
                this.classes = "moon phase2";
            } else
                if(moonPhase >= 0.25 && moonPhase < 0.375) {
                    this.classes = "moon phase3";
                } else
                    if(moonPhase >= 0.375 && moonPhase < 0.5) {
                        this.classes = "moon phase4";
                    } else
                        if(moonPhase >= 0.5 && moonPhase < 0.625) {
                            this.classes = "moon phase5";
                        } else
                            if(moonPhase >= 0.625 && moonPhase < 0.75) {
                                this.classes = "moon phase6";
                            } else
                                if(moonPhase >= 0.75 && moonPhase < 0.875) {
                                    this.classes = "moon phase7";
                                } else
                                    if(moonPhase >= 0.875 && moonPhase <= 1) {
                                        this.classes = "moon phase8";
                                    }
    }
}