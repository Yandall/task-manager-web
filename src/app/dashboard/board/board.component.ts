import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BoardsService } from 'src/app/services/board.service';
import { Board } from 'src/app/shared/types';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  board: Board = {};
  constructor(
    private boardsService: BoardsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.boardsService.getOne(params['id']).subscribe((value) => {
        this.board = value;
      });
    });
  }
}
