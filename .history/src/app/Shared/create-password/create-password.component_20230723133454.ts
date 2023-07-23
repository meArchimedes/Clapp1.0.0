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
  @Output() onPassMatch = new EventEmitter<boolean>();
  @Output() onPassValid = new EventEmitter<boolean>();

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
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,15}$/;
    if (this.passwordFieldDirty && passwordRegex.test(this.password))
      this.isPassValid = true;
    else this.isPassValid = false;

    // Emit the valid password
    // if (this.isPassValid) {
    this.onPasswordValid.emit(this.password);
    this.onPassValid.emit(this.isPassValid);
    // }

    this.isPassReqirementsVisible =
      this.passwordFieldDirty && !this.isPassValid;
  }

  onConfirmPasswordInput() {
    if(this.confirmedPassword.length>0 && this.confirmedPassword!=null)
    <ActionBar title="Cleaner Sign Up"></ActionBar>
<quote></quote>
<ScrollView class="scroll-view">
  <StackLayout>
    <Label class="form-label" text="Name" [ngClass]=""></Label>
    <TextField
      class="form-input"
      returnKeyType="next"
      [(ngModel)]="name"
      autocapitalizationType="words"
      (textChange)="onSignUpEnabled()"
      required
      (blur)="onTextFieldBlur()"
      #nameField
    ></TextField>
    <create-password
      (onPasswordValid)="getPassword($event)"
      (onConfirmedPasswordValid)="getConfirmedPassword($event)"
      (onPassMatch)="getPassMatch($event)"
      (onPassValid)="getPassValid($event)"
    ></create-password>
    <Label class="form-label" text="Address"></Label>
    <TextField
      hint="1234 Ave. A, 1234, NY"
      id="address"
      returnKeyType="done"
      (textChange)="onAddressInputChange($event)"
      class="address-input"
      [(ngModel)]="address"
      required
    ></TextField>
    <ListView
      *ngIf="isListViewVisible"
      height="150"
      [items]="placesArray"
      (itemTap)="onItemTap($event)"
      separatorColor="orangered"
      rowHeight="50"
      class="list-group"
      id="listView"
    >
      <ng-template let-item="item">
        <StackLayout class="list-group-item">
          <Label [text]="item" textWrap="true" class="title"></Label>
        </StackLayout>
      </ng-template>
    </ListView>
    <Label class="form-label" text="Email Address"></Label>
    <TextField
      class="form-input"
      [(ngModel)]="email"
      type="email"
      required
      hint="Email Address"
      autocapitalizationType="none"
      required
      [autocorrect]="false"
      (textChange)="isEmailValid()"
    >
    </TextField>
    <Label
      *ngIf="!isEmailControlValid"
      class="warnLabel"
      text="Please enter a valid E-Mail"
    ></Label>
    <ListPicker [items]="genderOptions" [(ngModel)]="gender"></ListPicker>
    <Label class="form-label" text="Work Permit"></Label>
    <Button
      class="form-button"
      text="Select File"
      type="file"
      name="workPermitFile"
      (tap)="onSelectFile('workPermitFile')"
    ></Button>
    <Label
      *ngIf="selectedFile"
      class="form-file-name"
      [text]="selectedFile.name"
    ></Label>
    <Label class="form-label" text="Proof of ID"></Label>
    <Button
      class="form-button"
      text="Upload Proof of ID"
      (tap)="onSelectFile('proofOfIdFile')"
    ></Button>
    <Label
      *ngIf="proofOfIdFile"
      class="form-file-name"
      text="{{ proofOfIdFile.name }}"
    ></Label>

    <Label class="form-label" text="Photo"></Label>
    <Button
      class="form-button"
      text="Upload A Photo of Yourself"
      (tap)="onSelectFile('photoFile')"
    ></Button>

    <Button
      class="signup-button"
      text="Sign Up"
      type="submit"
      (tap)="signUp()"
      [isEnabled]="isSignUpEnabled"
      [ngStyle]="{ 'background-color': isSignUpEnabled ? 'blue' : 'gray' }"
    ></Button>
  </StackLayout>
</ScrollView>

    if (
      this.password === this.confirmedPassword &&
      this.passwordFieldDirty &&
      this.confirmedPassword !== "" &&
      this.confirmedPassword != null
    ) {
      this.isConfirmPasswordDirty = true;
      this.passwordsMatch = true;
    } else {
      this.passwordsMatch = false;
    }

    // this.confirmedPassword != null && this.confirmedPassword != ""
    //   ? (this.isConfirmPasswordDirty = false)
    //   : (this.isConfirmPasswordDirty = true);

    this.onConfirmedPasswordValid.emit(this.confirmedPassword);
    this.onPassMatch.emit(this.passwordsMatch);

  }

  onToggleMenu() {
    this.uiService.toggleDrawer();
  }
}
