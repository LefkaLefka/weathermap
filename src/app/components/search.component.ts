import { ElementRef, NgZone, ViewChild, Component, OnInit } from "@angular/core";
import { MapsAPILoader, MouseEvent } from "angular2-google-maps/core";
import { FormControl } from "@angular/forms";

@Component({
    selector: "search",
    templateUrl: "../templates/search.component.html"
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
        private ngZone: NgZone) {}

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
            let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
                types: ["(cities)"]
            });
            autocomplete.addListener("place_changed", () => {
                this.ngZone.run(() => {
                    //get the place result
                    let place: google.maps.places.PlaceResult = autocomplete.getPlace();

                    //verify result
                    if (place.geometry === undefined || place.geometry === null) {
                        return;
                    }

                    //set latitude, longitude and zoom
                    this.latitude = place.geometry.location.lat();
                    this.longitude = place.geometry.location.lng();
                    this.zoom = 12;
                });
            });
        });
    }

    private setCurrentPosition() {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.latitude = position.coords.latitude;
                this.longitude = position.coords.longitude;
                this.zoom = 12;
            });
        }
    }

    mapClicked($event: MouseEvent) {
        this.latitude = $event.coords.lat;
        this.longitude = $event.coords.lng;
        this.zoom = 12;
    }
}