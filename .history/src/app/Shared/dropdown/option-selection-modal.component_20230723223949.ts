// option-selection-modal.component.ts
import { NO_ERRORS_SCHEMA } from '@angular/compiler';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-option-selection-modal',
  templateUrl: './option-selection-modal.component.html',
  styleUrls: ['./option-selection-modal.component.scss'],
  schemas: [NO_ERRORS_SCHEMA],
})
export class OptionSelectionModalComponent implements OnInit {
  @Input() options: string[] = [];
  @Output() optionSelected = new EventEmitter<string>();
  selectedOption: string;

  constructor() {}

  ngOnInit() {}

  selectOption(option: string) {
    this.selectedOption = option;
  }

  confirmSelection() {
    if (this.selectedOption) {
      this.optionSelected.emit(this.selectedOption);
    }
  }
}
