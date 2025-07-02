import { Component } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { SharedModule } from 'src/app/Modules/shared/shared.module';
import { TestService } from '../../services/test.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  tests = [];
  constructor(private notification: NzNotificationService,
    private testService: TestService
  ){}

   ngOnInit(){
    this.getAllTests();
  }

  getAllTests(){
    this.testService.getAllTest().subscribe(res=>{
      this.tests = res;
    }, error=>{
      this.notification
      .error(
        'ERROR',
        `Something Went Wrong. Try Again`,
        { nzDuration: 5000 }
      )
    })
  }

  getFormattedTime(time): string{
    const minutes = Math.floor(time/60);
    const seconds = time % 60;
    return `${minutes} minutes ${seconds} seconds`;
  }
 
}
