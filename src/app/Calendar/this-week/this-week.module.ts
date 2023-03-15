import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { ThisWeekComponent } from "./this-week.component";
import {
  NativeScriptCommonModule,
  NativeScriptRouterModule,
} from "@nativescript/angular";
import { SharedModule } from "../../Shared/shared.module";

@NgModule({
  declarations: [ThisWeekComponent],
  imports: [
    NativeScriptCommonModule,
    NativeScriptRouterModule,
    NativeScriptRouterModule.forChild([
      {
        path: "",
        component: ThisWeekComponent,
      },
    ]),
    SharedModule,
  ],
  schemas: [NO_ERRORS_SCHEMA],

})
export class ThisWeekModule {}
