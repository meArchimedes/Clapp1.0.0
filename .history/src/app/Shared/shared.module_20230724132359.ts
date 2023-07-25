import { NgModule } from "@angular/core";
import { ActionBarComponent } from "./action-bar/action-bar.component";
import { NativeScriptCommonModule, NativeScriptRouterModule } from "@nativescript/angular";

@NgModule({
  imports: [NativeScriptCommonModule, NativeScriptRouterModule],
  declarations: [ActionBarComponent],
  exports: [ActionBarComponent],
  schemas: [NO_ERRORS_SCHEMA]

})
export class SharedModule {}
