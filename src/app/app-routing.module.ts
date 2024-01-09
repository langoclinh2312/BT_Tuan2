import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: '/', canActivate: [AuthGuard],
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
];

export const appRoutingModule = RouterModule.forChild(routes);
