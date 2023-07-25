import { Component } from "@angular/core";
import { DatePicker } from "@nativescript/core";


@Component({
  selector: "date-picker",
  templateUrl: "date-picker.component.html",
  styleUrls: ["date-picker.component.scss"],
  moduleId: module.id,
})
export class DatePickerComponent {
  currentDate = new Date(no);

  // Calculate the date 99 years ago from the current date
  minDateYear = this.currentDate.getFullYear() - 99;
  minDate = new Date(
    this.minDateYear,
    this.currentDate.getMonth(),
    this.currentDate.getDate()
  );

  // Calculate the date 18 years ago from the current date
  maxDateYear = this.currentDate.getFullYear() - 18;
  maxDate = new Date(
    this.maxDateYear,
    this.currentDate.getMonth(),
    this.currentDate.getDate()
  );


    onDatePickerLoaded(args) {
        const datePicker = args.object as DatePicker;
    }

    onDateChanged(args) {
        console.log("Date New value: " + args.value);
        console.log("Date value: " + args.oldValue);
    }

    onDayChanged(args) {
        console.log("Day New value: " + args.value);
        console.log("Day Old value: " + args.oldValue);
    }

    onMonthChanged(args) {
        console.log("Month New value: " + args.value);
        console.log("Month Old value: " + args.oldValue);
    }

    onYearChanged(args) {
        console.log("Year New value: " + args.value);
        console.log("Year Old value: " + args.oldValue);
    }
}
