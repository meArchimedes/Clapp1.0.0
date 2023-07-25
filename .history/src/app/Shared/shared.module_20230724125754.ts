import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { ActionBarComponent } from "./action-bar/action-bar.component";
import { NativeScriptCommonModule, NativeScriptRouterModule } from "@nativescript/angular";
import { OptionSelectionModalComponent } from "./dropdown/option-selection-modal.component";

@NgModule({
  imports: [NativeScriptCommonModule, NativeScriptRouterModule],
  declarations: [ActionBarComponent, OptionSelectionModalComponent],
  exports: [ActionBarComponent],
  schemas: [NO_ERRORS_SCHEMA]

})
export class SharedModule {}
