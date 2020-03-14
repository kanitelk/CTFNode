import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './guards/auth.guard';


export const routes: Routes = [
  {path: '', loadChildren: () => import('./homepage/homepage.module').then(m => m.HomepageModule), pathMatch: 'full'},
  {path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule)},
  {path: 'user', canActivate: [AuthGuard], loadChildren: () => import('./user/user.module').then(m => m.UserModule)},
  {path: 'tasks', loadChildren: () => import('./tasks/tasks.module').then(m => m.TasksModule)}
  // {path: '**', loadChildren: () => import('./homepage/homepage.module').then(m => m.HomepageModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
