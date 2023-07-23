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
import { HttpHeaders } from "@angular/common/http";

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
  isEmailControlValid: boolean = true;
  passwordsMatch: boolean = true;
  isPasswordValid: boolean = false;
  displayListView = false;
  autocompleteResults: ObservableArray<GooglePlacesAutocomplete>;
  isSignUpEnabled: boolean = false;
  name: string = "";
  id: string = "";
  workPermitFile: File;
  proofOfIdFile: any;
  photoFile: any;
  address: any;
  gender: string;
  email: string = "";
  password: string = "";
  confirmedPassword: string = "";
  genderOptions: Array<string> = ["Female", "Male", "Rather not say"];
  url: string = "https://clapp-368121-70341.firebaseio.com/";
  selectedFile: File | null;
  http: any;

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


    const formData = new FormData();
    formData.append("workPermitFile", this.workPermitFile);
    formData.append("proofOfIdFile", this.proofOfIdFile);
    formData.append("photoFile", this.photoFile);

    // Prepare the other user data
    const userData = {
      name: this.name,
      email: this.email,
      address: this.address,
      gender: this.gender,
      password: this.password,
    };
    // Make the HTTP POST request to your server or file storage service
    this.http
      .post(this.url, formData, {
        headers: new HttpHeaders({ "Content-Type": "multipart/form-data" }),
      })
      .subscribe(
        (response) => {
          // Handle the success response (if needed)
          console.log("File upload success!");
          console.log("Response:", response);

          // After successful file upload, you can now proceed to save the user data to your database
          // You can do this with another HTTP request to your backend API
          this.saveUserData(userData);
        },
        (error) => {
          // Handle the error response (if needed)
          console.log("File upload error!");
          console.error(error);
        }
      );
    this.router.navigate(["/calendars/calendar/calendar-tabs"]);
  }
  saveUserData(userData: {
    name: string;
    email: string;
    address: any;
    gender: string;
    password: string;
  }) {
    throw new Error("Method not implemented.");
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
    const isNameValid = this.name !== null && this.name.trim() !== "";
    const isAddressValid = this.address !== null && this.address.trim() !== "";

    console.log("the pass is!!! ", this.password);
    if (
      isNameValid &&
      isAddressValid &&
      this.password !== null &&
      this.confirmedPassword !== null &&
      this.isEmailControlValid &&
      this.isPasswordValid &&
      this.passwordsMatch
    ) {
      this.isSignUpEnabled = true;
    } else {
      this.isSignUpEnabled = false;
    }
  }
  getPassword(event) {
    this.password = event;
    console.log(this.password);
    if (this.password == this.confirmedPassword) this.passwordsMatch = true;
    else this.passwordsMatch = false;
  }
  getConfirmedPassword(event) {
    this.confirmedPassword = event;
    if (this.password !== this.confirmedPassword) this.passwordsMatch = false;
    else this.passwordsMatch = true;
  }
  getPassMatch(event) {
    console.log(event);
    this.passwordsMatch = event;
  }
  getPassValid(event) {
    this.isPasswordValid = event;
  }
  isEmailValid() {
    if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(this.email)) {
      this.isEmailControlValid = true;
    } else this.isEmailControlValid = false;
    this.onSignUpEnabled();
  }
  onSelectFile(fileType: string) {
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
          switch (fileType) {
            case "workPermitFile":
              this.workPermitFile = selected;
              break;
            case "proofOfIdFile":
              this.proofOfIdFile = selected;
              break;
            case "photoFile":
              this.photoFile = selected;
              break;
          }
        });
      })
      .catch(function (e) {
        console.log(e);
      });
  }
}
