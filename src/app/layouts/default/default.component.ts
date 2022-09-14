import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbMenuItem, NbSidebarService } from '@nebular/theme';

@Component({
  selector: 'layout-default',
  templateUrl: 'default.component.html',
})
export class LayoutDefaultComponent implements OnInit {

   menuItems: NbMenuItem[] = [
    {
      title: 'Profile',
      icon: 'person-outline',
    },
    {
      title: 'Change Password',
      icon: 'lock-outline',
    },
    {
      title: 'Privacy Policy',
      icon: { icon: 'checkmark-outline', pack: 'eva' },
    },
    {
      title: 'Logout',
      icon: 'unlock-outline',
    },
  ];

  constructor(private sideBarService: NbSidebarService, private router: Router){}
  ngOnInit() {
    console.log("TODO")
  }

  toggle() {
    this.sideBarService.toggle(true)
  }
  
expand() {
   this.sideBarService.expand()
  }
}

