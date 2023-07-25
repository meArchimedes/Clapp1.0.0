import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular";
import { AuthComponent } from "./Authentication/sign-in/auth.component";
import { ActionBarComponent } from "./Shared/action-bar/action-bar.component";
import { NewUserComponent } from "./Authentication/sign-up/new-user.component";
import { CleanerSignUpComponent } from "./sign-up-forms/cleaner-sign-up/cleaner-su.component";
import { clientSignUpComponent } from "./sign-up-forms/client-sign-up/client-su.component";
import { QuoteComponent } from "./Shared/quote/quote.component";
import { ListViewComponent } from "./Shared/list-view/list-view.component";
import { CreatePasswordComponent } from "./Shared/create-password/create-password.component";
import { OptionSelectionModalComponent } from "./Shared/dropdown/option-selection-modal.component";
const routes: Routes = [
  { path: "", component: AuthComponent },
  { path: "action-bar", component: ActionBarComponent },
  { path: "new-user", component: NewUserComponent },
  {
    path: "forgot-password",
    loadChildren: () =>
      import("./Authentication/forgot-pass/forgot-password.module").then(
        (m) => m.ForgotPasswordModule
      ),
  },
  { path: "cleaner-su", component: CleanerSignUpComponent },
  { path: "client-su", component: clientSignUpComponent },
  { path: "quote", component: QuoteComponent },
  {
    path: "calendars",
    loadChildren: () =>
      import("./Calendar/calendar-modules/calendars.module").then(
        (m) => m.CalendarsModule
      ),
  },
  { path: "list-view", component: ListViewComponent },
  { path: "create-password", component: CreatePasswordComponent}
];

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule],
})
export class AppRoutingModule {}
