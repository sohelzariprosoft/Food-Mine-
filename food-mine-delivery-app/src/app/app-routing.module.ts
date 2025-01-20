import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { RegisterPageComponent } from './components/pages/register-page/register-page.component';
import { authGuard } from './Shared/Guards/auth.guard';
import { OfflinePageComponent } from './components/pages/offline-page/offline-page.component';
import { offlineGuard } from './Shared/Guards/offline.guard';
import { onlineGuardGuard } from './Shared/Guards/online-guard.guard';
import { isLoggedInGuard } from './Shared/Guards/is-logged-in.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./components/partials/tabs/tabs.module').then(
        (m) => m.TabsPageModule
      ),
  },
  {
    path: 'offline',
    component: OfflinePageComponent,
    canActivate: [offlineGuard],
    canDeactivate: [onlineGuardGuard],
  },
  {
    path: 'login',
    component: LoginPageComponent,
    canActivate: [isLoggedInGuard],
  },
  {
    path: 'register',
    component: RegisterPageComponent,
    canActivate: [isLoggedInGuard],
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
