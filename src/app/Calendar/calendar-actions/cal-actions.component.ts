import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ModalDialogParams } from "@nativescript/angular";

@Component({
  selector: "cal-actions",
  templateUrl: "cal-actions.component.html",
  styleUrls: ["cal-actions.component.scss"],
  moduleId: module.id,
})
export class CalActionsComponent implements OnInit {
  @Output() actionSelect = new EventEmitter<'complete' | 'failed' | 'cancel'>();
  @Input() cancelText = 'Cancel Session';
  @Input() issueText = 'Report Issue';
  // loadedDate: Date;
  constructor() {}

  ngOnInit() {
    // this.loadedDate = (this.modalParams.context as { date: Date }).date;
  }
  onAction(action: 'complete' | 'failed' | 'cancel') {
    this.actionSelect.emit(action);
  }
}
