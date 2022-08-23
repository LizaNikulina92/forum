import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './auth/admin.guard';
import { AuthGuard } from './auth/auth.guard';
import { LoginPage } from './auth/login/login.page';
import { RegisterPage } from './auth/register/register.page';
import { ForumPage } from './pages/forum/forum.page';
import { JcsPage } from './pages/jcs/jcs.page';
import { NdpPage } from './pages/ndp/ndp.page';
import { PostPage } from './pages/post/post.page';
import { SettingsPage } from './pages/settings/settings.page';

const routes: Routes = [
  { path: 'login', component: LoginPage },
  { path: 'register', component: RegisterPage },
  { path: 'ndp', component: NdpPage },
  { path: 'jcs', component: JcsPage },
  { path: '', pathMatch: 'full', redirectTo: 'forum'},
  { path: 'forum', canActivate: [AuthGuard], component: ForumPage },
  { path: 'forum/:id', canActivate: [AuthGuard], component: PostPage },
  { path: 'settings', canActivate: [AuthGuard, AdminGuard], component: SettingsPage}
  /* { path: 'forum', component: ForumPage } */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
