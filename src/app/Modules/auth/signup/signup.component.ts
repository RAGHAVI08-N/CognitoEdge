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
      password: [null, [Validators.required]]
    });
  }

  submitForm() {
  this.authService.register(this.validateForm.value).subscribe(
    (res: any) => {
      alert('User registered successfully');
      this.validateForm.reset(); // 🔁 Reset the form
      this.router.navigateByUrl('/login'); // Or comment if you don’t want auto navigate
    },
    (error: any) => {
      if (error.status === 406) {
        alert('User already exists'); //  Email already used
      } else {
        alert('Signup failed. Please try again later.');
      }
    }
  );
}

}
