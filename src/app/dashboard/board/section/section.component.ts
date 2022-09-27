import { Component, Input, OnInit } from '@angular/core';
import { Section } from 'src/app/shared/types';

@Component({
  selector: 'board-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
})
export class SectionComponent implements OnInit {
  @Input()
  section: Section = {};
  constructor() {}

  ngOnInit(): void {}
}
