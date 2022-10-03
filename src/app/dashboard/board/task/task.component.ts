import { Component, Input, OnInit } from '@angular/core';
import { Task } from 'src/app/shared/types';

@Component({
  selector: 'board-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
  @Input()
  task: Task = { config: {}, content: {} };
  constructor() {}

  ngOnInit(): void {}

  edit() {
    console.log('editando');
  }
}
