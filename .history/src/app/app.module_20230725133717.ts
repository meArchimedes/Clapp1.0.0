import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from '@nativescript/angular';
import { NativeScriptFormsModule } from '@nativescript/angular';
import { NativeScriptCommonModule } from '@nativescript/angular';
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { NewUserComponent } from "./Authentication/sign-up/new-user.component";
import { CleanerSignUpComponent } from "./sign-up-forms/cleaner-sign-up/cleaner-su.component";
import { clientSignUpComponent } from "./sign-up-forms/client-sign-up/client-su.component";
import { AuthComponent } from "./Authentication/sign-in/auth.component";
import { ForgotPasswordModule } from "./Authentication/forgot-pass/forgot-password.module";
import { QuoteComponent } from "./Shared/quote/quote.component";
import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular";
import { SessionModalComponent } from "./Calendar/session-modal/session-modal.component";
import { SharedModule } from "./Shared/shared.module"
import { CalendarRoutingModule } from "./Calendar/calendar-modules/calendar-routing.module";
import { CalActionsModule } from "./Calendar/calendar-actions/cal-actions.module";
import { HttpClientModule } from "@angular/common/http";
import { CreatePasswordComponent } from "./Shared/create-password/create-password.component"
import { ListViewComponent } from "./Shared/list-view/list-view.component"
import { NativeScriptHttpClientModule } from "@nativescript/angular";
import { DatePickerComponent } from "./Shared/date-picker/date-picker.component"
// import { firebase } from "@nativescript/firebase";

// firebase.init({
//   // Add your Firebase configuration object here

// }).then(() => {
//   console.log("Firebase initialized");
// });

@NgModule({
  bootstrap: [AppComponent],
  imports: [
    NativeScriptModule,
    NativeScriptFormsModule,
    AppRoutingModule,
    NativeScriptUISideDrawerModule,
    HttpClientModule,
    SharedModule,
    CalendarRoutingModule,
    ForgotPasswordModule,
    CalActionsModule,
    NativeScriptCommonModule,
    NativeScriptHttpClientModule,
  ],
  declarations: [
    AppComponent,
    AuthComponent,
    SessionModalComponent,
    NewUserComponent,
    CleanerSignUpComponent,
    clientSignUpComponent,
    QuoteComponent,
    CreatePasswordComponent,
    ListViewComponent,
    DatePickerComponent,
  ],
  providers: [],
  schemas: [NO_ERRORS_SCHEMA],
  entryComponents: [SessionModalComponent]
})
export class AppModule {}
