import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {
    path: 'signIn',
    component: SigninComponent,
  },
  {
    path: 'signUp',
    component: SignupComponent,
  },
  {
    path: '',
    redirectTo: 'signIn',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'signIn',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
