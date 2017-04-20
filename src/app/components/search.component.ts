import { ElementRef, NgZone, ViewChild, Component, OnInit } from "@angular/core";
import { MapsAPILoader, MouseEvent } from "angular2-google-maps/core";
import { FormControl } from "@angular/forms";
// import { OpenWeatherService } from "../services/open-weather.service";
import { DarkSkyService } from "../services/dark-sky.service";

@Component({
    selector: "search",
    templateUrl: "../templates/search.component.html",
    providers: [
        // OpenWeatherService,
        DarkSkyService ]
})

export class SearchComponent implements OnInit {
    public latitude: number;
    public longitude: number;
    public zoom: number;
    public searchControl: FormControl;

    @ViewChild("search")
    public searchElementRef: ElementRef;

    constructor(
        private mapsAPILoader: MapsAPILoader,
        private ngZone: NgZone,
        // private openWeatherService: OpenWeatherService,
        private darkSkyService: DarkSkyService) {}

    ngOnInit() {
        // set google maps defaults
        this.latitude = 0;
        this.longitude = 0;
        this.zoom = 9;
        // create search FormControl
        this.searchControl = new FormControl();
        // set current position
        this.setCurrentPosition();
        // load places autoComplete
        this.mapsAPILoader.load().then(() => {
            let autoComplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
                types: ["(cities)"]
            });
            autoComplete.addListener("place_changed", () => {
                this.ngZone.run(() => {
                    // get the place result
                    let place: google.maps.places.PlaceResult = autoComplete.getPlace();
                    // verify result
                    if (place.geometry === undefined || place.geometry === null) {
                        return;
                    }
                    // set latitude, longitude and zoom
                    this.updateCoordinate(place.geometry.location.lat(), place.geometry.location.lng());
                });
            });
        });
    }

    private setCurrentPosition() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                // console.log(position.coords.latitude + " " + position.coords.longitude);
                this.updateCoordinate(position.coords.latitude, position.coords.longitude);
                this.getPlace();
            },
                (error) => {
                console.log(error);
            });
        }
    }

    mapClicked($event: MouseEvent) {
        this.updateCoordinate($event.coords.lat, $event.coords.lng);
        this.getPlace();
    }

    private getPlace() {
        let geoCoder = new google.maps.Geocoder();
        let geoLocate = new google.maps.LatLng(this.latitude, this.longitude);
        geoCoder.geocode({location: geoLocate}, ((results, status) => {
            let result;
            if (status == google.maps.GeocoderStatus.OK) {
                if (results.length > 1) {
                    result = results[1];
                } else {
                    result = results[0];
                }
                result = result.formatted_address;
            } else {
                result = "Error";
            }
            this.searchControl.setValue(result);
        }).bind(this));
    }

    private updateCoordinate(lat: number, lng: number) {
        this.latitude = lat;
        this.longitude = lng;
        this.zoom = 9;

        this.getWeather();
    }

    private getWeather() {
        // this.openWeatherService.getWeather(this.latitude, this.longitude)
        //     .subscribe((data) => {
        //         console.log(data);
        //     });
        this.darkSkyService.getWeather(this.latitude, this.longitude)
            .subscribe((data) => {
                console.log(data);
            });
    }
}