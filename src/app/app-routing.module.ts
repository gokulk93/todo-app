import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { TodoComponent } from './todo/todo.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/home', pathMatch: 'full' 
  },
  {
    path: 'home',
    component: TodoComponent
  },
  {
    path: 'about',
    component: AboutUsComponent
  },
  {
    path: 'contact',
    component: ContactUsComponent
  },
  // { path: '**', component: NoPageFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
