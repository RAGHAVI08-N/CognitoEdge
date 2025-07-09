import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { TakeTestComponent } from '../components/take-test/take-test.component';

@Injectable({
  providedIn: 'root'
})
export class TakeTestGuard implements CanDeactivate<TakeTestComponent> {
  canDeactivate(
    component: TakeTestComponent
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (component.isSubmitted) {
      return true; // Allow navigation if submitted
    }
    return confirm("You haven't submitted your test. Are you sure you want to leave?");
  }
}
