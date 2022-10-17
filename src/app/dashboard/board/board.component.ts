import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { first } from 'rxjs';
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
  board: Partial<Board> = {};
  newSection: Partial<Section> = {};

  constructor(
    private boardsService: BoardsService,
    private sectionsService: SectionsService,
    private route: ActivatedRoute,
    private dialogService: NbDialogService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.boardsService
        .getOne(params['id'])
        .pipe(first())
        .subscribe((value) => {
          this.board = value;
        });
    });
  }

  newBoard() {
    const dialog = this.dialogService.open(EditSectionComponent, {
      context: { section: this.newSection as Section },
      closeOnBackdropClick: true,
    });
    dialog.componentRef.instance.onSave.pipe(first()).subscribe((value) => {
      value.boardId = this.board.id!;
      this.sectionsService
        .createSection(value)
        .pipe(first())
        .subscribe((updated) => {
          this.board.sections?.push(updated);
        });
    });
  }

  removeSection(sectionId: string) {
    this.board.sections = this.board.sections?.filter(
      (section) => section.id !== sectionId
    );
  }
}
