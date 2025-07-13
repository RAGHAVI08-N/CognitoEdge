import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedModule } from 'src/app/Modules/shared/shared.module';
import { AdminService } from '../../services/admin.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-test',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './create-test.component.html',
  styleUrls: ['./create-test.component.scss']
})
export class CreateTestComponent {
  testForm!: FormGroup;
  departmentOptions: { label: string; value: number }[] = [];
  

  constructor(
    private fb: FormBuilder,
    private devicesService: AdminService,
    private notification: NzNotificationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.testForm = this.fb.group({
      title: [null, Validators.required],
      description: [null, Validators.required],
      time: [null, Validators.required],
      departmentId: [null, Validators.required]
    });

    this.fetchDepartments();
  }

  fetchDepartments() {
  this.devicesService.getDepartments().subscribe((res: any[]) => {
    this.departmentOptions = res.map(dep => ({
      label: dep.name,
      value: dep.id
    }));

    // Trigger re-evaluation (if form was pre-filled)
    const deptId = this.testForm.get('departmentId')?.value;
    if (deptId) {
      this.testForm.patchValue({ departmentId: deptId });
    }
  });
}


  submitForm() {
    console.log("Form Value Before Submit:", this.testForm.value);
    if (this.testForm.valid) {
      this.devicesService.createTest(this.testForm.value).subscribe(
        res => {
          this.notification.success(
            'SUCCESS',
            `Test Created Successfully.`,
            { nzDuration: 5000 }
          );
          this.router.navigateByUrl('/admin/dashboard');
        },
        error => {
          this.notification.error(
            'ERROR',
            `${error.error}`,
            { nzDuration: 5000 }
          );
        }
      );
    }
  }
}
