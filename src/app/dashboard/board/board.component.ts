import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { first, Observable, tap } from 'rxjs';
import { BoardsService } from 'src/app/services/board.service';
import { SectionsService } from 'src/app/services/section.service';
import { Board, Section } from 'src/app/shared/types';
import { EditSectionComponent } from './section/edit-section/edit-section.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  private board: Board;
  board$: Observable<Board | undefined>;
  sections$: Observable<Section[]>;

  constructor(
    private boardsService: BoardsService,
    private sectionsService: SectionsService,
    private route: ActivatedRoute,
    private dialogService: NbDialogService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.board$ = this.boardsService.selectBoard(params['id']).pipe(
        tap((board) => {
          if (!board) return;
          this.board = board;
          this.sections$ = this.sectionsService.getSectionsByBoard(board.id);
        })
      );
    });
  }

  newSection() {
    const dialog = this.dialogService.open(EditSectionComponent, {
      context: { section: { boardId: this.board.id } as Section },
    });
    dialog.componentRef.instance.onSave.pipe(first()).subscribe((value) => {
      this.sectionsService.addSection(value);
    });
  }
}
