import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "@nativescript/angular";
import { Page  } from "@nativescript/core";
// import { SelectedIndexChangedEventData } from "@nativescript/core/ui/tab-view";

@Component({
  selector: "calendar-tabs",
  templateUrl: "calendar-tabs.component.html",
  styleUrls: ["_calendar-tabs.component.common.scss"],
  moduleId: module.id,
})
export class CalendarTabsComponent implements OnInit {
  constructor(
    private router: RouterExtensions,
    private active: ActivatedRoute,
    private page: Page
  ) {}

  ngOnInit() {
    this.router.navigate(
      [{ outlets: { today: ["today"], thisWeek: ["this-week"] } }],
      {
        relativeTo: this.active,
      }
    );
    this.page.actionBarHidden = true;
  }
  // onSelectedIndexChanged(args: SelectedIndexChangedEventData) {
  //   if (args.oldIndex !== -1) {
  //     const newIndex = args.newIndex;
  //     const vm = (args.object as TabView).bindingContext;
  //     if (newIndex === 0) {
  //       vm.set("tabSelectedIndexResult", "Profile Tab (tabSelectedIndex = 0 )");
  //     } else if (newIndex === 1) {
  //       vm.set("tabSelectedIndexResult", "Stats Tab (tabSelectedIndex = 1 )");
  //     } else if (newIndex === 2) {
  //       vm.set(
  //         "tabSelectedIndexResult",
  //         "Settings Tab (tabSelectedIndex = 2 )"
  //       );
  //     }
  //     Dialogs.alert(
  //       `Selected index has changed ( Old index: ${args.oldIndex} New index: ${args.newIndex} )`
  //     ).then(() => {
  //       console.log("Dialog closed!");
  //     });
  //   }
  // }
}
