import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "@nativescript/angular";
import { Router } from "@angular/router";
import { File, knownFolders, path } from "@nativescript/core/file-system";
// import { ListViewComponent } from "../../Shared/list-view/list-view.component";
import {
  EventData,
  Label,
  ListPicker,
  Page,
  TextField,
  fromObject,
  Http,
} from "@nativescript/core";
// import { HttpClient } from "@angular/common/http";
import { openFile } from "@nativescript/core/utils";
import * as FilePicker from "@prabudevarrajan/filepicker";
import { GooglePlacesAutocomplete } from "n7-google-places-autocomplete";
import { ItemEventData, ListView } from "@nativescript/core";
import { ObservableArray } from "@nativescript/core/data/observable-array";

@Component({
  selector: "cleaner-su",
  templateUrl: "cleaner-su.component.html",
  styleUrls: ["cleaner-su.component.scss"],
  moduleId: module.id,
})
export class CleanerSignUpComponent implements OnInit {
  placesArray: ObservableArray<GooglePlacesAutocomplete>;
  placesAutocomplete: any;
  isListViewVisible: boolean = false;
  displayListView = false;
  autocompleteResults: ObservableArray<GooglePlacesAutocomplete>;
  isSignUpEnabled: boolean = false;
  name: string = "";
  id: string = "";
  workPermitFile: any = null;
  proofOfIdFile: any;
  photoFile: File;
  address: any;
  gender: string = "";
  email: string = "";
  password: string = "";
  confirmedPassword: string = "";
  genderOptions: Array<string> = ["Female", "Male", "Rather not say"];
  selectedOption: string;
  selectedFile: File | null;

  constructor(private router: RouterExtensions) {}
  ngOnInit() {
    this.onSignUpEnabled();
    this.placesAutocomplete = new GooglePlacesAutocomplete(
      "AIzaSyArDTr6RHhG1z3AZxR8uQCKem7eXbXn-ow"
    );
  }

  signUp() {
    // Handle the sign-up logic here
    // You can access the form values stored in the component properties (e.g., this.name, this.email)

    // Upload work permit file and proof of ID file
    // You can use the workPermitFile and proofOfIdFile properties to upload the corresponding files
    //
    // Redirect to the desired page after successful sign-up
    this.router.navigate(["/calendars/calendar/calendar-tabs"]);
  }
  onAddressInputChange(args) {
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
    this.address = selectedAddress;
  }

  onSignUpEnabled() {
    // Check if all required fields are filled
    if (
      this.name !== "" &&
      this.email !== "" &&
      this.workPermitFile !== "" &&
      this.proofOfIdFile !== "" &&
      this.address !== "" &&
      this.gender !== "" &&
      this.password !== ""
    ) {
      this.isSignUpEnabled = true;
    } else {
      this.isSignUpEnabled = false;
    }
  }
  // onPredictionSelected(selectedIndex: number) {
  //   const selectedPrediction = this.autocompleteResults[selectedIndex];
  //   console.log("Selected Prediction:", selectedPrediction);
  //   this.address = selectedPrediction.description;
  // }
  onSelectFile() {

    let context = FilePicker.create({
      mode: "single",
      extensions: ["pdf", "jpg", "doc", "docx"],
    });
    cn
    context
      .authorize()
      .then(function () {

        return context.present();
      })
      .then(function (selection) {
        selection.forEach(function (selected) {
          console.log(selected);
          // process the selected file
        });
      })
      .catch(function (e) {
        // process error
      });

  }
}