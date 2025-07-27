import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MainViewComponent } from './components/main-view/main-view.component';
import { BudgetInputComponent } from './components/budget-input/budget-input.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { BudgetOverviewComponent } from './components/budget-overview/budget-overview.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'main', component: MainViewComponent, children: [
        { path: '', redirectTo: 'input', pathMatch: 'full' },
        { path: 'input', component: BudgetInputComponent },
        { path: 'overview', component: BudgetOverviewComponent },
        { path: 'user-profile', component: UserProfileComponent },
    ] }
];
