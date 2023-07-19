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
  @Input() password;
  @Input() confirmedPassword;
  @Output() onPasswordValid = new EventEmitter;
  passwordFieldDirty: boolean = false;
  isPassReqirementsVisible: boolean = false;
  passwordsMatch: boolean = false;
  isConfirmPasswordDirty: boolean = false;
  constructor(
    private page: Page,
    private router: RouterExtensions,
    private uiService: UIService
  ) {}

  ngOnInit() {}
  isPasswordValid() {
    this.passwordFieldDirty = this.password.length > 0;
    console.log(this.password);
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,10}$/;

    if (this.passwordFieldDirty && passwordRegex.test(this.password)) {
      console.log("entered")
      return true;
    }
    return false;
  }

  onConfirmPasswordInput(event) {
    event.length === 0
      ? (this.isConfirmPasswordDirty = false)
      : (this.isConfirmPasswordDirty = true);
  }
  onToggleMenu() {
    this.uiService.toggleDrawer();
  }
}
