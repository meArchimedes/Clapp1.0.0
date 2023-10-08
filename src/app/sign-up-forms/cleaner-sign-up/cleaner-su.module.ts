import { Component, OnInit, NO_ERRORS_SCHEMA, NgModule } from "@angular/core";
import { NativeScriptCommonModule } from "@nativescript/angular/lib/nativescript-common.module";
import { NativeScriptFormsModule } from "@nativescript/angular/lib/forms";
import { NativeScriptRouterModule } from "@nativescript/angular";
import { CleanerSignUpComponent } from "./cleaner-su.component";
import { FormsModule } from "@angular/forms";
//import {HandleFile} from 'nativescript-handle-file';
// import { SharedModule} from '~/app/shared/shared.module'

@NgModule({
  declarations: [CleanerSignUpComponent],
  imports: [
    NativeScriptCommonModule,
    NativeScriptFormsModule,
    NativeScriptRouterModule.forChild([
      { path: "", component: CleanerSignUpComponent },
    ]),
    FormsModule,
    // SharedModule
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class CleanerSignUpModule {}
