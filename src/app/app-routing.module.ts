import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular";
import { AuthComponent } from "./Authentication/sign-in/auth.component";
import { ActionBarComponent } from "./Shared/action-bar/action-bar.component";
import { NewUserComponent } from "./Authentication/sign-up/new-user.component";
import { CleanerSignUpComponent } from "./sign-up-forms/cleaner-sign-up/cleaner-su.component";
import { HousekeeperSignUpComponent } from "./sign-up-forms/housekeeper-sign-up/hk-su.component";
import { QuoteComponent } from "./Shared/quote/quote.component";

const routes: Routes = [
  { path: "", component: AuthComponent },
  { path: "action-bar", component: ActionBarComponent },
  { path: "new-user", component: NewUserComponent },
  { path: "forgot-password", loadChildren: ()=>import('./Authentication/forgot-pass/forgot-password.module').then(m=>m.ForgotPasswordModule) },
  { path: "cleaner-su", component: CleanerSignUpComponent },
  { path: "hk-su", component: HousekeeperSignUpComponent },
  { path: "quote", component: QuoteComponent },
  {
    path: "calendars",
    loadChildren: ()=>import('./Calendar/calendar-modules/calendars.module').then(m=>m.CalendarsModule),
  },
];

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule],
})
export class AppRoutingModule {}
