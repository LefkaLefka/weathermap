import { Component, Input } from "@angular/core";

@Component({
    selector: "day-weather",
    templateUrl: "../templates/day-weather.component.html"
})

export class DayWeatherComponent {
    _bubbleChartData: any;

    @Input()
    set bubbleChartData(data: any) {
        if(data) {
            this._bubbleChartData = [];
            let names = ["Temperature", "Date", "Temperature(°C)", "Summary", "Wind speed(m/s)"];
            this._bubbleChartData.push(names);

            let buffData = data.hourly.data;

            this.bubbleChartOptions.hAxis.minValue = new Date((buffData[0].time - 3600) * 1000);
            this.bubbleChartOptions.hAxis.maxValue = new Date((buffData[24].time + 3600) * 1000);

            for (let i = 0; i < 25; ++i) {
                let buffArray = [];
                buffArray.push(buffData[i].apparentTemperature.toString() + " °C");
                buffArray.push(new Date(buffData[i].time * 1000));
                buffArray.push(buffData[i].apparentTemperature);
                buffArray.push(buffData[i].summary);
                buffArray.push(data.currently.windSpeed);
                // buffArray.push(buffData[i].pressure);
                this._bubbleChartData.push(buffArray);

                if(buffData[i].apparentTemperature > this.bubbleChartOptions.vAxis.maxValue) {
                    this.bubbleChartOptions.vAxis.maxValue = buffData[i].apparentTemperature + 5;
                }
                if(buffData[i].apparentTemperature < this.bubbleChartOptions.vAxis.minValue) {
                    this.bubbleChartOptions.vAxis.minValue = buffData[i].apparentTemperature - 5;
                }
            }
        }
    }

    get bubbleChartData() {
        return this._bubbleChartData;
    }

    public bubbleChartOptions = {
        title: "24hr temperature",
        hAxis: {
            minValue: null,
            maxValue: null,
            gridlines: {
                count: 25,
            }
        },
        vAxis: {
            minValue: 100,
            maxValue: -100
        },
        bubble: {
            textStyle: {
                fontSize: 11
            }
        }
    }
}