import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { TakeTestComponent } from './components/take-test/take-test.component';
import { ViewMyTestResultsComponent } from './components/view-my-test-results/view-my-test-results.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
