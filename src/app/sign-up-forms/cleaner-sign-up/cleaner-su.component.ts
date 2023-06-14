import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { RouterExtensions } from "@nativescript/angular";
import { File, knownFolders, path } from "@nativescript/core/file-system";
import { NativeScriptFormsModule } from "@nativescript/angular";
import { registerElement } from "@nativescript/angular";
import { ScrollView } from "tns-core-modules";
import { TextField } from "@nativescript/core";
import { GooglePlacesAutocomplete } from "nativescript-google-places-autocomplete";
import * as FilePicker from "@prabudevarrajan/filepicker";
import { HttpClient } from "@angular/common/http";



@Component({
  selector: "cleaner-su",
  templateUrl: "cleaner-su.component.html",
  styleUrls: ["cleaner-su.component.scss"],
  moduleId: module.id
})
export class CleanerSignUpComponent implements OnInit {
  placesAutocomplete: any;
  autocompleteResults: any[] = [];
  isSignUpEnabled: boolean = false;
  name: string = "";
  id: string = "";
  workPermitFile: any = null;
  proofOfIdFile: any;
  address: string = "";
  gender: string = "";
  email: string = "";
  password: string = "";
  confirmedPassword: string = "";

  dropdownOptions: Array<string> = ["Female", "Male", "Rather not say"];
  selectedOption: string;
  selectedFile: File | null;

  // onFileSelected(files: FileList): void {
  //   this.selectedFile = files.item(0);
  // }

  constructor(private router: RouterExtensions, private http: HttpClient) {}
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
    console.log(textField.text);

    this.placesAutocomplete.search(textField.text).then(
      (places: any) => {
        console.log(places);
        // place predictions list
      },
      error => {
        throw error;
      }
    );
  }

  uploadFile(): void {
    // Perform the file upload logic here using this.selectedFile
    if (this.selectedFile) {
      console.log("Uploading file:", this.selectedFile.name);
      // Additional logic...
    }
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
  onPredictionSelected(selectedIndex: number) {
    const selectedPrediction = this.autocompleteResults[selectedIndex];
    console.log("Selected Prediction:", selectedPrediction);
    this.address = selectedPrediction.description;
  }

  onSelectFile() {
    let context = FilePicker.create({
      mode: "single",
      extensions: ["pdf", "jpg", "doc", "docx"]
    });
    context
      .authorize()
      .then(function() {
        return context.present();
      })
      .then(function(selection) {
        selection.forEach(function(selected) {
          // process the selected file
        });
      })
      .catch(function(e) {
        // process error
      });
  }
}
