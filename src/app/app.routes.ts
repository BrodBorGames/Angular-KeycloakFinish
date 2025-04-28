import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UsersComponent } from './components/users/users.component';
import { canActivateAuthRole } from './guards/auth-role.guard';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { ChangeUserComponent } from './components/change-user/change-user.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [canActivateAuthRole],
    data: {role: 'view-users'}
  },
  {
    path: 'create-user',
    component: CreateUserComponent,
    canActivate: [canActivateAuthRole],
    data: {role: 'view-users'}
  },
  {
    path: 'change-user',
    component: ChangeUserComponent,
    canActivate: [canActivateAuthRole],
    data: {role: 'view-users'}
  },
  {
    path: 'profile',
    component: UserProfileComponent,
    canActivate: [canActivateAuthRole],
    data: { role: 'view-profile' }
  },
  { path: 'forbidden', component: ForbiddenComponent },
  { path: '**', component: NotFoundComponent }
];
