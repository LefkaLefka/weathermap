import { NgModule } from "@angular/core";
import { AgmCoreModule } from "angular2-google-maps/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "../components/app.component";
import { SearchComponent } from "../components/search.component";

@NgModule({
    imports: [
        AgmCoreModule.forRoot({
              apiKey: "AIzaSyCbLvTnXR_ekev6d3tmIlSbMjDaPzp4g00",
              libraries: ["places"]
            }),
        BrowserModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        AppComponent,
        SearchComponent
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }