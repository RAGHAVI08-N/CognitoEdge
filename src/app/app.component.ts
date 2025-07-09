import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { SharedModule } from './Modules/shared/shared.module';
import { UserStorageService } from './Modules/auth/services/user-storage.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'quizweb';

  isUserLoggedIn: boolean = false;
  isAdminLoggedIn: boolean = false;
  showHeader: boolean = true;

  constructor(private router: Router) {}

  ngOnInit() {
    this.checkUserStatus();

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const url = event.url;
        this.showHeader = !url.includes('/login') && !url.includes('/register');
        this.checkUserStatus();
      }
    });
  }

  checkUserStatus() {
    this.isUserLoggedIn = UserStorageService.isUserLoggedIn();
    this.isAdminLoggedIn = UserStorageService.isAdminLoggedIn();
  }

  logout() {
    UserStorageService.signOut();
    this.router.navigateByUrl('/login');
  }
}
