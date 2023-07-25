import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import {
  ModalDialogOptions,
  ModalDialogService,
  RouterExtensions,
} from "@nativescript/angular";
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
  ItemEventData,
  ListView,
} from "@nativescript/core";
// import { HttpClient } from "@angular/common/http";
import { openFile } from "@nativescript/core/utils";
import * as FilePicker from "@prabudevarrajan/filepicker";
import { GooglePlacesAutocomplete } from "n7-google-places-autocomplete";
import { ObservableArray } from "@nativescript/core/data/observable-array";
import { NgModule, ViewContainerRef } from "@angular/core";
import { HttpHeaders } from "@angular/common/http";
import { Cleaner } from "../../services/cleaner.model";
import { User } from "../../services/user.model";
import { UserService } from "../../services/user.service";
import { Address } from "~/app/services/address.model";
import { DatePickerComponent } from "~/app/Shared/date-picker/date-picker.component";
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
  age: any;
  isAgeValid: boolean = true;
  id: string = "";
  workPermitFile: any;
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
  @ViewChild("nameField", { static: false }) nameField: ElementRef<TextField>;

  constructor(
    private router: RouterExtensions,
    private modalService: ModalDialogService,
    private vcRef: ViewContainerRef,
    private userService: UserService
  ) {}
  ngOnInit() {
    this.placesAutocomplete = new GooglePlacesAutocomplete(
      "AIzaSyArDTr6RHhG1z3AZxR8uQCKem7eXbXn-ow"
    );
  }

  signUp() {
    // const formData = new FormData();
    // formData.append("workPermitFile", this.workPermitFile);
    // formData.append("proofOfIdFile", this.proofOfIdFile);
    // formData.append("photoFile", this.photoFile);

    const newCleaner: Cleaner = {
      hourlyRate: 50,
      perfectionism: 0,
      efficiency: 0,
      age: this.age,
      gender: this.gender,
      proofOfIdFile: this.proofOfIdFile,
      workPermitFile: this.workPermitFile,
      photoImg: this.photoFile,
      email: this.email,
      password: this.password,
      address: this.address,
    };
    this.userService.createNewUser(newCleaner);
    this.router.navigate(["/calendars/calendar/calendar-tabs"]);
  }

  confirmSelection(selectedOption?: string) {
    if (selectedOption) {
      this.age = selectedOption;
    }
  }

  onTextFieldBlur() {
    const textField = this.nameField.nativeElement as TextField;
    textField.dismissSoftInput();
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
  validateAgeInput() {
    if (this.age < 18 || this.age > 99) this.isAgeValid = false;
    else this.isAgeValid = true;
  }
  onSignUpEnabled() {
    // Check if all required fields are filled
    const isNameValid = this.name !== null && this.name.trim() !== "";
    const isAddressValid = this.address !== null && this.address.trim() !== "";
    if (
      isNameValid &&
      isAddressValid &&
      this.isAgeValid &&
      this.password !== null &&
      this.confirmedPassword !== null &&
      this.isEmailControlValid &&
      this.isPasswordValid &&
      this.passwordsMatch &&
      this.workPermitFile != null &&
      this.proofOfIdFile != null &&
      this.photoFile != null
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
      extensions: ["pdf", "jpg", "png", "doc", "docx"],
    });
    context
      .authorize()
      .then(() => {
        return context.present();
      })
      .then((selection) => {
        selection.forEach((selected) => {
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
      .catch((e) => {
        console.log(e);
      });
  }
}
