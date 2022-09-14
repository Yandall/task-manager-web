import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'personal-manager-web';

  constructor(private router: Router) {}

  ngOnInit(): void {
    let logged = false
    if (!logged) {
      this.router.navigate(['/login'])
      return 
    }
    this.router.navigate(['/dashboard'])
    return
  }
}
