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
            this.bubbleChartOptions.vAxis.maxValue = -100;
            this.bubbleChartOptions.vAxis.minValue = 100;

            for (let i = 0; i < 25; ++i) {
                let buffArray = [];
                buffArray.push(buffData[i].apparentTemperature.toString().slice(0, -3) + " °C");
                buffArray.push(new Date(buffData[i].time * 1000));
                buffArray.push(buffData[i].apparentTemperature);
                buffArray.push(buffData[i].summary);
                buffArray.push(data.currently.windSpeed);
                // buffArray.push(buffData[i].pressure);
                this._bubbleChartData.push(buffArray);

                if(buffData[i].apparentTemperature > this.bubbleChartOptions.vAxis.maxValue) {
                    this.bubbleChartOptions.vAxis.maxValue = buffData[i].apparentTemperature + 10;
                }
                if(buffData[i].apparentTemperature < this.bubbleChartOptions.vAxis.minValue) {
                    this.bubbleChartOptions.vAxis.minValue = buffData[i].apparentTemperature - 10;
                }
            }
        }
    }

    get bubbleChartData() {
        return this._bubbleChartData;
    }

    public bubbleChartOptions = {
        backgroundColor: "#F3F1ED",
        title: "",
        chartArea: {
            left: "5%",
            right: "10%",
            width: "100%",
            backgroundColor: "#FAFAD2"
        },
        hAxis: {
            minValue: null,
            maxValue: null,
            gridlines: {
                count: 12
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