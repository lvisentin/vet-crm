import { Routes } from '@angular/router';
import { loggedInGuard } from './shared/guards/logged-in/logged-in.guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'internal',
    canActivateChild: [loggedInGuard],
    loadChildren: () =>
      import('./internal/internal.module').then((m) => m.InternalModule),
  },
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
];
