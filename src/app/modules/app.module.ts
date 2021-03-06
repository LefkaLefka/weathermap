import { NgModule } from "@angular/core";
import { AgmCoreModule } from "angular2-google-maps/core";
import { HttpModule } from "@angular/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "../components/app.component";
import { SearchComponent } from "../components/search.component";
import { OpenWeatherService } from "../services/open-weather.service";
import { DayWeatherComponent } from "../components/day-weather.component";
import { DarkSkyService } from "../services/dark-sky.service";
import { GoogleChart } from "../directives/angular2-google-chart.directive";
import { WeekWeatherComponent } from "../components/week-weather.component"

@NgModule({
    imports: [
        AgmCoreModule.forRoot({
            apiKey: "AIzaSyBc-P8U-bHtVVN4xm78vuZt6t_qlT4sdNw",
            libraries: ["places"],
            language: "en",
            region: "UA"
        }),
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule
    ],
    declarations: [
        AppComponent,
        SearchComponent,
        DayWeatherComponent,
        WeekWeatherComponent,
        GoogleChart,
    ],
    providers: [
        OpenWeatherService,
        DarkSkyService
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }