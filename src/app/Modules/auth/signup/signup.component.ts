import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  validateForm!: FormGroup;
  departmentOptions: { label: string, value: string }[] = [];

  constructor(
    private fb: FormBuilder,
    private message: NzMessageService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      departmentName: [null, [Validators.required]]
    });

    this.fetchDepartments();
  }

  fetchDepartments() {
    this.authService.getDepartments().subscribe((departments: any[]) => {
      this.departmentOptions = departments.map(dep => ({
        label: dep.name,
        value: dep.name
      }));
    });
  }

  submitForm() {
    if (this.validateForm.valid) {
      this.authService.register(this.validateForm.value).subscribe(
        (res: any) => {
          alert('User registered successfully');
          this.validateForm.reset();
          this.router.navigateByUrl('/admin/dashboard');
        },
        (error: any) => {
          if (error.status === 406) {
            alert('User already exists');
          } else {
            alert('Signup failed. Please try again later.');
          }
        }
      );
    } else {
      this.message.error('Please fill in all fields correctly.');
    }
  }
}
