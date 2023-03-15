import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "@nativescript/angular";
import { Page } from "@nativescript/core";
import { openUrl } from "@nativescript/core/utils";
// import { firebase } from "@nativescript/firebase";

@Component({
  selector: "auth",
  templateUrl: "auth.component.html",
  styleUrls: ["auth.component.css"],
  moduleId: module.id,
})
export class AuthComponent implements OnInit {
  email: string;
  password: string;
  constructor(private router: RouterExtensions, private page: Page) {
    page.backgroundImage = "~/Images/broom.jpg";
  }

  ngOnInit() {}
  onSignIn() {
    this.router.navigate(["/calendars/calendar/calendar-tabs"], { clearHistory: true });
  }
  onSignUp() {
    this.router.navigate(["/new-user"], { clearHistory: true });
  }
  onForgotPassword() {}

  loginWithGoogle() {
  //   firebase
  //     .login({
  //       type: firebase.LoginType.GOOGLE,
  //     })
  //     .then((user) => {
  //       console.log("Logged in with Google:", JSON.stringify(user));
  //       // Handle successful sign-in here
  //     })
  //     .catch((error) => {
  //       console.log("Error signing in with Google:", error);
  //       // Handle sign-in error here
  //     });
  }
}
