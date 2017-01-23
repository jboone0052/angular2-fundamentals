import { ProfileComponent } from './profile.component';
import { LoginComponent } from './login.component';

import { Routes } from '@angular/router';

export const userRoutes: Routes = [
    { path: 'profile', component: ProfileComponent },
    { path: 'login', component: LoginComponent }
    
]