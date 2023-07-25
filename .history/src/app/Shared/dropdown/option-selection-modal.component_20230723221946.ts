// option-selection-modal.component.ts
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-option-selection-modal',
  templateUrl: './option-selection-modal.component.html',
  styleUrls: ['./option-selection-modal.component.scss'],
})
export class OptionSelectionModalComponent implements OnInit {
  @Output() optionSelected = new EventEmitter<string>();
  options: string[];

  constructor() {
    // Initialize options with sample data. You can pass the options from the parent component as well.
    this.options = [];
  }

  ngOnInit() {}

  selectOption(option: string) {
    this.optionSelected.emit(option);
  }
}
