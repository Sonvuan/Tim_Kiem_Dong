import { Routes } from '@angular/router';

import { LoginComponent } from './component/auth/login/login.component';
import { AuthComponent } from './component/auth/auth.component';
import { RegisterComponent } from './component/auth/register/register.component';
import { ParaCurrencyRateListComponent } from './component/admin/para-currency-rate/para-currency-rate-list/para-currency-rate-list.component';
import { ParaCurrencyRateCreateComponent } from './component/admin/para-currency-rate/para-currency-rate-create/para-currency-rate-create.component';
import { ParaCurrencyRateEditComponent } from './component/admin/para-currency-rate/para-currency-rate-edit/para-currency-rate-edit.component';
import { AdminComponent } from './component/admin/admin.component';
import { HomeComponent } from './component/home/home.component';
import { ErrorComponent } from './component/error/error.component';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { AcountComponent } from './component/admin/acount/acount.component';
import { RoleComponent } from './component/admin/role/role.component';


export const routes: Routes = [
    {
    path: 'auth',
    component: AuthComponent,  
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
    ]
  },
 {
  path: 'admin',
  component: AdminComponent,
  canActivate: [NgxPermissionsGuard],
  data: {
    permissions: {
      only: ['ROLE_ADMIN', 'ROLE_STAFF'],  
      redirectTo: '/403'                   
    }
  },
  children: [
    {
      path: 'acount',
      component:AcountComponent
    },
    {
      path:'role',
      component:RoleComponent
    },
    { path: 'list', component: ParaCurrencyRateListComponent,
      canActivate: [NgxPermissionsGuard],
      data: {
        permissions: {
          only: ['ADMIN', 'WRITE'],  
          redirectTo: '/403'                   
        }
      }
     },
    { path: 'create', component: ParaCurrencyRateCreateComponent, 
      canActivate:[NgxPermissionsGuard],
      data:{
        permissions:{
          only:['ADMIN','WRITE'],
          redirectTo: '/403'  
        }
      }
    },
    { path: 'edit', component: ParaCurrencyRateEditComponent,
      canActivate:[NgxPermissionsGuard],
      data:{
        permissions:{
          only:['ADMIN','WRITE'],
          redirectTo: '/403'  
        }
      }
     },
  ]
},


   {path:'home',component:HomeComponent},

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' },

 


];
