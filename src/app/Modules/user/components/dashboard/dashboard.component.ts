import { Component } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { SharedModule } from 'src/app/Modules/shared/shared.module';
import { TestService } from '../../services/test.service';
import { UserStorageService } from 'src/app/Modules/auth/services/user-storage.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  tests = [];
  attemptedTestIds: number[] = [];

  constructor(
    private notification: NzNotificationService,
    private testService: TestService
  ) {}

  ngOnInit() {
    this.getAllTests();
    this.fetchAttemptedTests();
  }

  getAllTests() {
    this.testService.getAllTest().subscribe(res => {
      this.tests = res;
    }, error => {
      this.notification.error('ERROR', `Something Went Wrong. Try Again`, { nzDuration: 5000 });
    });
  }

  fetchAttemptedTests() {
    const userId = Number(UserStorageService.getUserId());
    this.testService.getAttemptedTestIds(userId).subscribe(
      (attemptedIds: number[]) => {
        this.attemptedTestIds = attemptedIds;
      },
      error => {
        console.error('Failed to fetch attempted test IDs', error);
      }
    );
  }

  getFormattedTime(time: number): string {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes} minutes ${seconds} seconds`;
  }

  hasAttempted(testId: number): boolean {
    return this.attemptedTestIds.includes(testId);
  }
}
