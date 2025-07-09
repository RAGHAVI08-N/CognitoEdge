import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TakeTestComponent } from './components/take-test/take-test.component';
import { ViewMyTestResultsComponent } from './components/view-my-test-results/view-my-test-results.component';
import { TakeTestGuard } from './guards/take-test.guard';

const routes: Routes = [
  {path:'dashboard', component:DashboardComponent},
  {path:'take-test/:id', component:TakeTestComponent, canDeactivate: [TakeTestGuard]},
  {path:'view-test-results', component:ViewMyTestResultsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
