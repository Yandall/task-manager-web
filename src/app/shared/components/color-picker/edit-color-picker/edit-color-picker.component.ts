import { Component, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'edit-dialog',
  templateUrl: './edit-color-picker.component.html',
  styleUrls: ['./edit-color-picker.component.scss'],
})
export class EditDialogComponent implements OnInit {
  colorsList = [
    '#3e2494',
    '#7b51db',
    '#b18aff',
    '#007d6c',
    '#00b887',
    '#2ce69b',
    '#0041a8',
    '#006fd6',
    '#42aaff',
    '#945400',
    '#db8b00',
    '#ffc94d',
    '#94124e',
    '#db2c66',
    '#ff708d',
    '#323259',
    '#b4b4db',
    '#e1e1f2',
    '',
  ];
  pickerColor: string = '';
  colorSelected = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  select(color: string) {
    this.pickerColor = color;
    this.colorSelected.emit(color);
  }
}
