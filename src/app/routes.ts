import { Routes } from '@angular/router';

// import { AuthGuardService } from './auth/services/auth-guard.service';

export const routes: Routes = [
  { path: '', redirectTo: '/users', pathMatch: 'full' },
  {
    path: 'users',
    loadChildren: './users/users.module#UsersModule'
  },
  {
    path: 'activities',
    loadChildren: './activities/activities.module#ActivitiesModule'
  }
];
