import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthService } from '../services/auth.service';
import { UserStorageService } from '../services/user-storage.service';
import { SharedModule } from '../../shared/shared.module';

// ✅ New imports
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SharedModule, CommonModule], // ✅ Fixed here
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  validateForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private message: NzMessageService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.validateForm = this.fb.group({
      email: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  submitForm() {
    console.log('Login button clicked');

    if (this.validateForm.invalid) {
      this.message.warning('Please fill in all required fields');
      return;
    }

    console.log('Sending data:', this.validateForm.value);

    this.authService.login(this.validateForm.value).subscribe(
      res => {
        console.log('Success response:', res);
        this.message.success('Login Success.', { nzDuration: 5000 });

        const user = {
          id: res.id,
          role: res.role
        };
        UserStorageService.saveUser(user);
      },
      error => {
        console.log('Error response:', error);
        this.message.error('Bad credentials', { nzDuration: 5000 });
      }
    );
  }
}
