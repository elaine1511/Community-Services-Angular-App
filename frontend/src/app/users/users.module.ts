import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailComponent } from './detail/detail.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { EditComponent } from './edit/edit.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from '../auth.guard';



@NgModule({
  declarations: [
    DetailComponent,
    LoginComponent,
    RegisterComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', component: DetailComponent, canActivate: [AuthGuard] },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'edit', component: EditComponent, canActivate: [AuthGuard] },
    ])
  ],
  exports: [
    DetailComponent,
    LoginComponent,
    RegisterComponent,
    EditComponent
  ]
})
export class UsersModule { }
