import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { ForgotPasswordComponent } from "./forgot-password.component";
import { SharedModule } from "../../Shared/shared.module";
import { NativeScriptCommonModule, NativeScriptRouterModule } from "@nativescript/angular";

@NgModule({
  declarations: [ForgotPasswordComponent],
  imports: [
    NativeScriptCommonModule,
    NativeScriptRouterModule.forChild([{ path: "", component: ForgotPasswordComponent }]), // Add this line
    SharedModule,
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class ForgotPasswordModule {}
