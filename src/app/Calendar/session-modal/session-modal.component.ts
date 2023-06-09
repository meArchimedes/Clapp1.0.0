import { Component, OnInit } from "@angular/core";
import { ModalDialogParams } from "@nativescript/angular";

@Component({
  selector: "session-modal",
  templateUrl: "session-modal.component.html",
  styleUrls: ["session-modal.component.scss"],
  moduleId: module.id,
})
export class SessionModalComponent implements OnInit {
  loadedDate: Date;
  constructor(private modalParams: ModalDialogParams) {}

  ngOnInit() {
  }
  onHandleInput(action: 'complete' | 'fail' | 'cancel') {
    this.modalParams.closeCallback(action);
  }
}
