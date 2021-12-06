import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { EditNewsComponent } from './edit-news/edit-news.component';
import { UpdateNewsComponent } from './edit-news/update-news/update-news.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NavigationComponent } from './navigation/navigation.component';
import { NewsComponent } from './news/news.component';
import { RoomsComponent } from './rooms/rooms.component';
import { SignupComponent } from './signup/signup.component';

/**
 * array of routing objects
 */
const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'home', component: HomeComponent},
  { path: 'ditNews', component: NewsComponent},
  { path: 'rooms', component: RoomsComponent},
  { path: 'navigation', component: NavigationComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'login', component: LoginComponent},
  { path: 'updateNews/:newsId', component: UpdateNewsComponent, canActivate: [AuthGuard] },
  { path: 'news', component: EditNewsComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    RouterModule.forRoot(routes, {             
      scrollPositionRestoration: 'enabled',  //allows the application to scroll up when the user navigate between different pages
    })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

