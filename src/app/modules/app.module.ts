import { NgModule } from "@angular/core";
import { AgmCoreModule } from "angular2-google-maps/core";
import { HttpModule } from "@angular/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "../components/app.component";
import { SearchComponent } from "../components/search.component";
import { OpenWeatherService } from "../services/open-weather.service";
import { WeatherComponent } from "../components/weather.component";
import { DarkSkyService } from "../services/dark-sky.service";
import { GoogleChart } from "../directives/angular2-google-chart.directive";

@NgModule({
    imports: [
        AgmCoreModule.forRoot({
              apiKey: "AIzaSyCbLvTnXR_ekev6d3tmIlSbMjDaPzp4g00",
              libraries: ["places"]
            }),
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule
    ],
    declarations: [
        AppComponent,
        SearchComponent,
        WeatherComponent,
        GoogleChart,
    ],
    providers: [
        OpenWeatherService,
        DarkSkyService
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }