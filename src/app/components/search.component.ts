import { ElementRef, NgZone, ViewChild, Component, OnInit } from "@angular/core";
import { MapsAPILoader, MouseEvent } from "angular2-google-maps/core";
import { FormControl } from "@angular/forms";
import { OpenWeatherService } from "../services/open-weather.service";

@Component({
    selector: "search",
    templateUrl: "../templates/search.component.html",
    providers: [ OpenWeatherService ]
})

export class SearchComponent implements OnInit {
    public latitude: number;
    public longitude: number;
    public searchControl: FormControl;
    public zoom: number;

    @ViewChild("search")
    public searchElementRef: ElementRef;

    constructor(
        private mapsAPILoader: MapsAPILoader,
        private ngZone: NgZone,
        private openWeatherService: OpenWeatherService) {}

    ngOnInit() {
        //set google maps defaults
        this.zoom = 4;
        this.latitude = 0;
        this.longitude = 0;
        //create search FormControl
        this.searchControl = new FormControl();
        //set current position
        this.setCurrentPosition();
        //load Places Autocomplete
        this.mapsAPILoader.load().then(() => {
            let autoComplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
                types: ["(cities)"]
            });
            autoComplete.addListener("place_changed", () => {
                this.ngZone.run(() => {
                    //get the place result
                    let place: google.maps.places.PlaceResult = autoComplete.getPlace();
                    //verify result
                    if (place.geometry === undefined || place.geometry === null) {
                        return;
                    }
                    //set latitude, longitude and zoom
                    this.updateCoordinate(place.geometry.location.lat(), place.geometry.location.lng());
                });
            });
        });
    }

    private setCurrentPosition() {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.updateCoordinate(position.coords.latitude, position.coords.longitude);
                this.getPlace();
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
        this.zoom = 12;

        this.getWeather();
    }

    private getWeather() {
        this.openWeatherService.getWeather(this.latitude, this.longitude)
            .subscribe((data) => {
                console.log(data);
            });
    }
}