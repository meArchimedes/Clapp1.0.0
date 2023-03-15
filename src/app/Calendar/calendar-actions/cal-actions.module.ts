import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule, NativeScriptRouterModule } from "@nativescript/angular";
import { CalActionsComponent } from "./cal-actions.component";


@NgModule({
  imports: [NativeScriptCommonModule, NativeScriptRouterModule],
  declarations: [CalActionsComponent],
  exports: [CalActionsComponent],
  schemas: [NO_ERRORS_SCHEMA],

})
export class CalActionsModule {}
