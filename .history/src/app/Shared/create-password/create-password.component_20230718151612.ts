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
  isPassValid: boolean
  passwordsMatch: boolean = true;
  isConfirmPasswordDirty: boolean = false;
  constructor(
    private page: Page,
    private router: RouterExtensions,
    private uiService: UIService
  ) {}

  ngOnInit() {}
  isPasswordValid() {
    this.passwordFieldDirty = this.password.length > 0;
    if (
      this.password == this.confirmedPassword &&
      this.passwordFieldDirty &&
      this.confirmedPassword.length > 0
    )
      this.passwordsMatch = true;
    else this.passwordsMatch = false;
    console.log("in pass validation");
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,15}$/;

    if (this.passwordFieldDirty && passwordRegex.test(this.password)) {
      console.log("entered");
      this.onPasswordValid.emit(this.password);
      this.isPassValid true;
    }
    return false;
  }

  onConfirmPasswordInput() {
    if (
      this.password == this.confirmedPassword &&
      this.passwordFieldDirty &&
      this.confirmedPassword.length > 0
    )
      this.passwordsMatch = true;
    else this.passwordsMatch = false;
    this.confirmedPassword.length === 0
      ? (this.isConfirmPasswordDirty = false)
      : (this.isConfirmPasswordDirty = true);
    this.onConfirmedPasswordValid.emit(this.confirmedPassword);
  }
  onToggleMenu() {
    this.uiService.toggleDrawer();
  }
}
