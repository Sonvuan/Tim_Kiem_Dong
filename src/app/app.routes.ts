import { Routes } from '@angular/router';
import { ParaCurrencyRateListComponent } from './component/para-currency-rate/para-currency-rate-list/para-currency-rate-list.component';
import { ParaCurrencyRateCreateComponent } from './component/para-currency-rate/para-currency-rate-create/para-currency-rate-create.component';
import { ParaCurrencyRateEditComponent } from './component/para-currency-rate/para-currency-rate-edit/para-currency-rate-edit.component';

import { LoginComponent } from './component/auth/login/login.component';
import { AuthComponent } from './component/auth/auth.component';
import { RegisterComponent } from './component/auth/register/register.component';

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
        path: '',
        component: ParaCurrencyRateListComponent
    },
    {
        path: 'add',
        component: ParaCurrencyRateCreateComponent
    },
    {
        path: 'edit',
        component: ParaCurrencyRateEditComponent
    }


];
