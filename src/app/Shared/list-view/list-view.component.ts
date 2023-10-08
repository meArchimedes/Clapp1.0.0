import { Component, Input, OnInit } from "@angular/core";
import { ItemEventData, ObservableArray, TextField } from '@nativescript/core';
import { GooglePlacesAutocomplete } from "nativescript-google-places-autocomplete";

@Component({
  selector: "list-view",
  templateUrl: "list-view.component.html",
  styleUrls: ["list-view.component.scss"],
  moduleId: module.id,
})
export class ListViewComponent implements OnInit {
  @Input() address: string;
  isListViewVisible: boolean = false;
  autocompleteResults: ObservableArray<string> = new ObservableArray<string>();
  displayListView = true;
  elements: Array<string>;
  placesAutocomplete: GooglePlacesAutocomplete;
  placesArray: ObservableArray<GooglePlacesAutocomplete>;

  onInputChange(args) {
    let textField = <TextField>args.object;
    // console.log(textField.text);

    this.placesAutocomplete.search(textField.text).then(
      (places: any) => {
        // console.log(places);
        this.isListViewVisible = places.length > 0 && this.displayListView;
        this.displayListView = true;
        const predictions = places.map((place: any) => place.description);
        this.placesArray = new ObservableArray<GooglePlacesAutocomplete>(
          predictions
        );
      },
      (error) => {
        throw error;
      }
    );
  }
  onItemTap(args: ItemEventData) {
    this.displayListView = false;
    const selectedAddress = this.placesArray.getItem(args.index);
    this.isListViewVisible = false;
  }
  ngOnInit(): void {

  }
}
