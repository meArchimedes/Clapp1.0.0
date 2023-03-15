import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "@nativescript/angular";
import { CalendarRoutingModule } from "./calendar-routing.module";
import { CalendarTabsComponent } from "../Calendar-tabs/calendar-tabs.component";
import { TodayComponent } from "../today/today.component";
import { SharedModule } from "~/app/Shared/shared.module";
import {CalActionsModule } from "../calendar-actions/cal-actions.module"

@NgModule({
  declarations: [
    CalendarTabsComponent,
    TodayComponent

  ],
  imports: [NativeScriptCommonModule, CalendarRoutingModule, SharedModule, CalActionsModule],
  schemas: [NO_ERRORS_SCHEMA],

})


export class CalendarsModule{}

