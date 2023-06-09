import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import {
  ModalDialogService,
  PageRoute,
  RouterExtensions,
} from "@nativescript/angular";
import { action } from "@nativescript/core";
import { UIService } from "~/app/services/ui.service";
import { SessionModalComponent } from "../session-modal/session-modal.component";

@Component({
  selector: "this-week",
  templateUrl: "this-week.component.html",
  styleUrls: ["_this-week.common.scss"],
  moduleId: module.id,
})
export class ThisWeekComponent implements OnInit {
  isCreating = true;
  weekDays = ["S", "M", "T", "W", "T", "F", "S"];
  days: { dayInMonth: number; dayInWeek: number }[] = [];
  private currentMonth: number;
  private currentYear: number;
  constructor(
    private modalDialog: ModalDialogService,
    private vcRef: ViewContainerRef,
    private activatedRoute: ActivatedRoute,
    private pageRoute: PageRoute,
    private router: RouterExtensions,
    private uiService: UIService
  ) {}

  getRow(index: number, day: { dayInMonth: number; dayInWeek: number }) {
    const startRow = 1;
    const weekRow = Math.floor(index / 7);
    const firstWeekDayOfMonth = new Date(
      this.currentYear,
      this.currentMonth,
      1
    ).getDay();
    const irregularRow = day.dayInWeek < firstWeekDayOfMonth ? 1 : 0;
    return startRow + weekRow + irregularRow;
  }

  onChangeStatus() {
    this.modalDialog.showModal(SessionModalComponent, {
      fullscreen: true,
      viewContainerRef: this.uiService.getRootVCRef()
        ? this.uiService.getRootVCRef()
        : this.vcRef,
        context: {date:new Date()}
    });
  }
  ngOnInit() {
    this.pageRoute.activatedRoute.subscribe((activatedRoute) => {
      activatedRoute.paramMap.subscribe((paramMap) => {
        if (!paramMap.has("mode")) {
          this.isCreating = true;
        } else {
          this.isCreating = paramMap.get("mode") !== "edit";
        }
      });
    });
    this.currentYear = new Date().getFullYear();
    this.currentMonth = new Date().getMonth();
    const daysInMonth = new Date(
      this.currentYear,
      this.currentMonth + 1,
      0
    ).getDate();
    for (let i = 1; i < daysInMonth + 1; i++) {
      const date = new Date(this.currentYear, this.currentMonth, i);
      const dayInWeek = date.getDay();
      this.days.push({ dayInMonth: i, dayInWeek: dayInWeek });
    }
  }
  onEdit() {
    this.modalDialog
      .showModal(SessionModalComponent, {
        fullscreen: true,
        viewContainerRef: this.uiService.getRootVCRef()
          ? this.uiService.getRootVCRef()
          : this.vcRef,
        context: { date: new Date() },
      })
      .then((action: string) => {
        console.log(action);
      });
    // this.router.navigate(["/calendars/edit"], {
    //   transition: { name: "slideLeft" },
    // });
  }
}
