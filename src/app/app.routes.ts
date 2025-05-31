import { Routes } from '@angular/router';

import { LoginComponent } from './component/auth/login/login.component';
import { AuthComponent } from './component/auth/auth.component';
import { RegisterComponent } from './component/auth/register/register.component';
import { ParaCurrencyRateListComponent } from './component/admin/para-currency-rate/para-currency-rate-list/para-currency-rate-list.component';
import { ParaCurrencyRateCreateComponent } from './component/admin/para-currency-rate/para-currency-rate-create/para-currency-rate-create.component';
import { ParaCurrencyRateEditComponent } from './component/admin/para-currency-rate/para-currency-rate-edit/para-currency-rate-edit.component';
import { AdminComponent } from './component/admin/admin.component';

export const routes: Routes = [
    {
    path: 'auth',
    component: AuthComponent,   // đây sẽ chứa child outlet
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
    //   { path: '', redirectTo: 'login', pathMatch: 'full' }
    ]
  },
  {
    path: 'admin',
    component:AdminComponent,
    children: [
      {path:'list', component: ParaCurrencyRateListComponent},
      {path: 'create', component: ParaCurrencyRateCreateComponent},
      {path: 'edit', component: ParaCurrencyRateEditComponent},
    ]
  },

  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },

 
  { path: '**', redirectTo: 'auth/login' }
  

    // {
    //     path: 'a',
    //     component: ParaCurrencyRateListComponent
    // },
    // {
    //     path: 'add',
    //     component: ParaCurrencyRateCreateComponent
    // },
    // {
    //     path: 'edit',
    //     component: ParaCurrencyRateEditComponent
    // }


];
