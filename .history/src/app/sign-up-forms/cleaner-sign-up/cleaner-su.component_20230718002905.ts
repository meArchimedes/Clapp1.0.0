import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { RouterExtensions } from "@nativescript/angular";
import { Router } from "@angular/router";
import {
  Validators,
  EmailValidator,
  FormControl,
  FormGroup,
  FormsModule,
} from "@angular/forms";
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
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

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
  emailControlIsValid: boolean = true;
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

  // public emailValidator = new EmailValidator();
  // public formGroup = new FormGroup({
  //   // Other form controls...
  //   email: new FormControl(this.email, [
  //     Validators.required,
  //     this.emailValidator.validate
  //   ]),
  //   // ...
  // });
  constructor(private router: RouterExtensions) {}
  ngOnInit() {
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
    this.onSignUpEnabled();
  }
  onItemTap(args: ItemEventData) {
    this.displayListView = false;
    const selectedAddress = this.placesArray.getItem(args.index);
    this.isListViewVisible = false;
    this.address = selectedAddress;
  }

  onSignUpEnabled() {
    // Check if all required fields are filled
    console.log("the pass is!!! ", this.password);
    if (
      this.name! == null
      // &&
      // this.email !== null &&
      // this.address !== null &&
      // this.gender !== null &&
      // this.password !== null &&
      // this.confirmedPassword !== null
    ) {
      this.isSignUpEnabled = true;
    } else {
      this.isSignUpEnabled = false;
    }
  }
  getPassword(event) {
    this.password = event;
    console.log(this.password);
  }
  getConfirmedPassword(event){
    this.confirmedPassword = event;
    
  }
  isEmailValid() {
    if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(this.email)) {
      this.emailControlIsValid = true;
    } else this.emailControlIsValid = false;
    this.onSignUpEnabled();
  }
  onSelectFile() {
    let context = FilePicker.create({
      mode: "single",
      extensions: ["pdf", "jpg", "doc", "docx"],
    });
    context
      .authorize()
      .then(function () {
        return context.present();
      })
      .then(function (selection) {
        selection.forEach(function (selected) {
          this.workPermitFile = selected;
          // process the selected file
        });
      })
      .catch(function (e) {
        console.log(e);
      });
  }
}
