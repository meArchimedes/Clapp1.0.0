import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { RouterExtensions } from "@nativescript/angular";
import { isAndroid } from "@nativescript/core";
import { Page } from "@nativescript/core";
import { UIService } from "../../services/ui.service";
declare var android: any;

@Component({
  selector: "create-password",
  templateUrl: "create-password.component.html",
  styleUrls: ["create-password.component.scss"],
  moduleId: module.id,
})
export class CreatePasswordComponent implements OnInit {
  password: string;
  confirmedPassword: string;
  @Output() onPasswordValid = new EventEmitter<string>();
  @Output() onConfirmedPasswordValid = new EventEmitter<string>();

  passwordFieldDirty: boolean = false;
  isPassReqirementsVisible: boolean = false;
  isPassValid: boolean;
  passwordsMatch: boolean = true;
  isConfirmPasswordDirty: boolean = false;

  constructor(
    private page: Page,
    private router: RouterExtensions,
    private uiService: UIService
  ) {}

  ngOnInit() {}

  isPasswordValid() {
    if (this.password != null && this.password !== "")
      this.passwordFieldDirty = true;
    else this.passwordFieldDirty = false;

    // Check if the password meets the requirements
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{7,15}$/;
    if (this.passwordFieldDirty && passwordRegex.test(this.password))
      this.isPassValid = true;
    else this.isPassValid = false;

    // Emit the valid password
    // if (this.isPassValid) {
    this.onPasswordValid.emit(this.password);
    // }

    this.isPassReqirementsVisible =
      this.passwordFieldDirty && !this.isPassValid;
  }

  onConfirmPasswordInput() {
    if (
      this.password === this.confirmedPassword &&
      this.passwordFieldDirty &&
      this.confirmedPassword !== "" &&
      this.confirmedPassword != null
    ) {
      this.passwordsMatch = true;
    } else {
      this.passwordsMatch = false;
    }

    this.confirmedPassword != null && this.confirmedPassword != ""
      ? (this.isConfirmPasswordDirty = false)
      : (this.isConfirmPasswordDirty = true);

    this.onConfirmedPasswordValid.emit(this.confirmedPassword);
  }

  onToggleMenu() {
    this.uiService.toggleDrawer();
  }
}
