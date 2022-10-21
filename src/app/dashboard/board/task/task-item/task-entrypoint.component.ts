import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { first } from 'rxjs';
import { TaskComponent } from '../task.component';

@Component({ template: '' })
export class TaskEntrypointComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dialogService: NbDialogService
  ) {}

  ngOnInit() {
    const { id } = this.route.snapshot.params as { id: string };
    const dialog = this.dialogService.open(TaskComponent, {
      context: { id },
      closeOnBackdropClick: true,
    });

    dialog.onClose.pipe(first()).subscribe(() => {
      this.router.navigate(['../'], { relativeTo: this.route });
    });
  }
}
