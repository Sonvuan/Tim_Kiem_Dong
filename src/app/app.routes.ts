import { Routes } from '@angular/router';
import { ParaCurrencyRateListComponent } from './component/para-currency-rate/para-currency-rate-list/para-currency-rate-list.component';
import { ParaCurrencyRateCreateComponent } from './component/para-currency-rate/para-currency-rate-create/para-currency-rate-create.component';
import { ParaCurrencyRateEditComponent } from './component/para-currency-rate/para-currency-rate-edit/para-currency-rate-edit.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
    {
        path:'login',
        component:AppComponent
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
