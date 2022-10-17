import { Component, Input, OnInit } from '@angular/core';
import { Task } from 'src/app/shared/types';

@Component({
  selector: 'board-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
})
export class TaskItemComponent implements OnInit {
  @Input()
  task: Task = { config: {}, content: {} };
  constructor() {}

  ngOnInit(): void {}
}
