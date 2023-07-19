import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { RouterExtensions } from "@nativescript/angular";
import { isAndroid } from "@nativescript/core";
import { Page } from "@nativescript/core";
import { UIService } from "../../services/ui.service";
declare var android: any;
// ... import statements ...

@Component({
  selector: "create-password",
  templateUrl: "create-password.component.html",
  styleUrls: ["create-password.component.scss"],
  moduleId: module.id,
})
export class CreatePasswordComponent implements OnInit {
  // ... other properties ...

  ngOnInit() {
    this.isConfirmPasswordDirty = false;
  }

  isPasswordValid() {
    this.passwordFieldDirty = this.password != null && this.password !== "";

    // Check if the password meets the requirements
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,15}$/;
    this.isPassValid = this.passwordFieldDirty && passwordRegex.test(this.password);

    // Emit the valid password
    if (this.isPassValid) {
      this.onPasswordValid.emit(this.password);
    }

    // Show the password requirements message only if the password field is dirty and the input doesn't qualify
    this.isPassReqirementsVisible = this.passwordFieldDirty && !this.isPassValid;
  }

  onConfirmPasswordInput() {
    // ... other code ...

    // Check if the passwords match
    this.passwordsMatch = this.password === this.confirmedPassword && this.passwordFieldDirty && this.confirmedPassword !== "";

    // Emit the valid confirmed password
    if (this.passwordsMatch) {
      this.onConfirmedPasswordValid.emit(this.confirmedPassword);
    }
  }

  // ... other methods ...
}
