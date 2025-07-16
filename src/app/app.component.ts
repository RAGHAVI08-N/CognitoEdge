import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { SharedModule } from './Modules/shared/shared.module';
import { UserStorageService } from './Modules/auth/services/user-storage.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'quizweb';
  isUserLoggedIn = false;
  isAdminLoggedIn = false;
  showHeader = true;

  showDeptInput = false;
  departmentForm: FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private http: HttpClient) {
    this.departmentForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

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

  toggleDepartmentInput() {
    this.showDeptInput = !this.showDeptInput;
    this.departmentForm.reset();
  }

  createDepartment() {
    if (this.departmentForm.valid) {
      this.http.post('http://localhost:8080/api/departments', this.departmentForm.value).subscribe({
        next: () => {
          alert('✅ Department created!');
          this.showDeptInput = false;
          this.departmentForm.reset();
        },
        error: () => {
          alert('❌ Failed to create department');
        }
      });
    }
  }
}
