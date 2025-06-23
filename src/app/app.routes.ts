import { Routes } from '@angular/router';
import { SignupComponent } from './Modules/auth/signup/signup.component';
import { LoginComponent } from './Modules/auth/login/login.component';

export const routes: Routes = [
{ path: 'register', component: SignupComponent },
{ path: 'login', component: LoginComponent },

];