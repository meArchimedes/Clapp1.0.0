import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptRouterModule } from "@nativescript/angular";
import { TodayComponent } from "../today/today.component";
import { CalendarTabsComponent } from "../Calendar-tabs/calendar-tabs.component";
import { Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    component: CalendarTabsComponent,
    children: [
      { path: "today", component: TodayComponent, outlet: "today" },
      {
        path: "this-week",
        loadChildren: () =>
          import("../this-week/this-week.module").then((m) => m.ThisWeekModule),
        outlet: "thisWeek",
      },
    ],
  },
  {
    path: ":mode",
    loadChildren: () =>
      import("../this-week/this-week.module").then((m) => m.ThisWeekModule),
  },
  { path: "", redirectTo: "/calendars/tabs", pathMatch: "full" },
];
@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule],
  schemas: [NO_ERRORS_SCHEMA],
})
export class CalendarRoutingModule {}
