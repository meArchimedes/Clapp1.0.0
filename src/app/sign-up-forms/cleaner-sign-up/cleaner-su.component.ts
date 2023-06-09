import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "@nativescript/angular";
import { File, knownFolders, path } from "@nativescript/core/file-system";
import { NativeScriptFormsModule } from "@nativescript/angular";
import { registerElement } from "@nativescript/angular";
import { ListPicker } from "@nativescript/core";
import { Http } from "@nativescript/core";
import { openFile } from "@nativescript/core/utils";
import { HandleFile } from "nativescript-handle-file";
import * as FilePicker from "@prabudevarrajan/filepicker";
// import * as FilePicker  from 'nativescript-plugin-filepicker';

// registerElement("ListPicker", () => ListPicker);
@Component({
  selector: "cleaner-su",
  templateUrl: "cleaner-su.component.html",
  styleUrls: ["cleaner-su.component.scss"],
  moduleId: module.id,
})
export class CleanerSignUpComponent implements OnInit {
  name: string;
  id: string;
  workPermitFile: any;
  proofOfIdFile: any;
  address: string;
  gender: string;
  email: string;
  password: string;

  dropdownOptions: Array<string> = ["Female", "Male", "Rather not say"];
  selectedOption: string;
  selectedFile: File | null;

  // onFileSelected(files: FileList): void {
  //   this.selectedFile = files.item(0);
  // }

  constructor(private router: RouterExtensions) {}
  ngOnInit() {}
  signUp() {
    // Handle the sign-up logic here
    // You can access the form values stored in the component properties (e.g., this.name, this.email)

    // Upload work permit file and proof of ID file
    // You can use the workPermitFile and proofOfIdFile properties to upload the corresponding files
    //
    // Redirect to the desired page after successful sign-up
    this.router.navigate(["/calendars/calendar/calendar-tabs"]);
  }
  uploadFile(): void {
    // Perform the file upload logic here using this.selectedFile
    if (this.selectedFile) {
      console.log("Uploading file:", this.selectedFile.name);
      // Additional logic...
    }
  }
  onSignUpEnabled() {}

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
          // process the selected file
        });
      })
      .catch(function (e) {
        // process error
      });
  }
}
