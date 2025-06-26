import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SharedModule } from './Modules/shared/shared.module';
import { UserStorageService } from './Modules/auth/services/user-storage.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SharedModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'quizweb';

  isUserLoggedIn: boolean = UserStorageService.isUserLoggedIn();
  isAdminLoggedIn: boolean = UserStorageService.isAdminLoggedIn();

  constructor(private router: Router){}

  ngOnInit(){
    this.router.events.subscribe(event=>{
      this.isUserLoggedIn = UserStorageService.isUserLoggedIn();
      this.isAdminLoggedIn=UserStorageService.isAdminLoggedIn();
    })
  }

  logout(){
    UserStorageService.signOut();
    this.router.navigateByUrl('login');

  }
}
