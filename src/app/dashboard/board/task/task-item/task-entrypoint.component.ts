import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { first } from 'rxjs';
import { TaskComponent } from '../task.component';

@Component({ template: '' })
export class TaskEntrypointComponent implements OnInit, OnDestroy {
  private dialog: NbDialogRef<TaskComponent>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dialogService: NbDialogService
  ) {}

  ngOnInit() {
    const { id } = this.route.snapshot.params as { id: string };
    this.dialog = this.dialogService.open(TaskComponent, {
      context: { id },
    });

    this.dialog.onClose.pipe(first()).subscribe(() => {
      this.router.navigate(['../'], { relativeTo: this.route });
    });
  }

  ngOnDestroy(): void {
    this.dialog.close();
  }
}
