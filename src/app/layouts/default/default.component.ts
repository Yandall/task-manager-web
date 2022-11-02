import { Component, HostListener, OnInit } from '@angular/core';
import { NbMenuItem, NbSidebarService } from '@nebular/theme';
import { first, map, Observable } from 'rxjs';
import { BoardsService } from 'src/app/services/board.service';
import { FoldersService } from 'src/app/services/folder.service';
import { SectionsService } from 'src/app/services/section.service';
import { TagsService } from 'src/app/services/tag.service';
import { TasksService } from 'src/app/services/task.service';

@Component({
  selector: 'layout-default',
  templateUrl: 'default.component.html',
  styleUrls: ['default.component.scss'],
})
export class LayoutDefaultComponent implements OnInit {
  menuItems$: Observable<NbMenuItem[]>;
  sidebarOpen = false;
  resizing = false;

  constructor(
    private foldersService: FoldersService,
    private boardsService: BoardsService,
    private sectionsService: SectionsService,
    private tasksService: TasksService,
    private tagsService: TagsService,
    private sidebarService: NbSidebarService
  ) {}
  ngOnInit() {
    this.boardsService.fetchBoards();
    this.foldersService.fetchFolders();
    this.sectionsService.fetchSections();
    this.tagsService.fetchTags();
    this.tasksService.fetchTasks();
    this.menuItems$ = this.formatFoldersStructure();
  }

  toggle() {
    this.sidebarService.toggle(true);
    this.sidebarOpen = !this.sidebarOpen;
  }

  expand() {
    this.sidebarService.expand();
    this.sidebarOpen = true;
  }

  formatFoldersStructure() {
    return this.foldersService.getAllFolders().pipe(
      first((folders) => folders.length > 0),
      map((folders) => {
        const folderMenuItem: NbMenuItem = {
          title: 'Folders',
          icon: 'folder',
          children: [],
        };
        folders.forEach((folder) => {
          const folderItem: NbMenuItem = {
            title: folder.name,
            icon: folder.config['icon'] || 'arrowhead-right',
            children: [],
          };
          folder.boards.forEach((board) => {
            folderItem.children?.push({
              title: board.name,
              icon: board.config['icon'] || 'layout',
              link: board.id,
              badge: { text: '🙃', status: 'primary' },
            });
          });
          folderMenuItem.children!.push(folderItem);
        });
        return [folderMenuItem] as NbMenuItem[];
      })
    );
  }

  @HostListener('window:mousemove', ['$event'])
  onResize(event: MouseEvent) {
    if (this.resizing && this.sidebarOpen) this.resizeSideBar(event.clientX);
  }

  resizeSideBar(width: number) {
    const newWidth = Math.max(Math.min(width, 400), 150);
    document.body.style.setProperty('--sidebar-width', newWidth + 'px');
  }
}
