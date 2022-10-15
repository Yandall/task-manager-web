import { Component, HostListener, OnInit } from '@angular/core';
import { NbMenuItem, NbSidebarService } from '@nebular/theme';
import { first } from 'rxjs';
import { FoldersService } from 'src/app/services/folder.service';
import { Folder } from 'src/app/shared/types';

@Component({
  selector: 'layout-default',
  templateUrl: 'default.component.html',
  styleUrls: ['default.component.scss'],
})
export class LayoutDefaultComponent implements OnInit {
  sidebarOpen = false;
  resizing = false;
  foldersMenuItem: NbMenuItem = {
    title: 'Folders',
    icon: 'folder',
    children: [],
  };

  menuItems: NbMenuItem[] = [this.foldersMenuItem];

  constructor(
    private foldersService: FoldersService,
    private sidebarService: NbSidebarService
  ) {}
  ngOnInit() {
    this.foldersService
      .getAll()
      .pipe(first())
      .subscribe((folders) => {
        this.formatFoldersStructure(folders);
      });
  }

  toggle() {
    this.sidebarService.toggle(true);
    this.sidebarOpen = !this.sidebarOpen;
  }

  expand() {
    this.sidebarService.expand();
    this.sidebarOpen = true;
  }

  formatFoldersStructure(folders: Folder[]) {
    folders.forEach((folder) => {
      const folderItem: NbMenuItem = {
        title: folder.name!,
        icon: folder.config!['icon'] || 'arrowhead-right',
        children: [],
      };
      const boardsItems = folder.boards!.filter(
        (board) => board.folderId === folder.id
      );
      boardsItems.forEach((board) => {
        folderItem.children?.push({
          title: board.name!,
          icon: board.config!['icon'] || 'layout',
          link: board.id,
          badge: { text: '🙃', status: 'primary' },
        });
      });
      this.foldersMenuItem.children?.push(folderItem);
    });
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
