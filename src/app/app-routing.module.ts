import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { BookmarksComponent } from './bookmarks/bookmarks.component';
import { AddNotesComponent } from './add-notes/add-notes.component';

const routes: Routes = [
  {
    path:'',component:HomeComponent
  },
  {
    path:'user/login',component:LoginComponent
  },
  {
    path:'user/register',component:RegisterComponent
  },
  {
    path:'user/bookmarks',component:BookmarksComponent
  },
  {
    path:'user/addnote',component:AddNotesComponent
  },
  {
    path:'**',redirectTo:''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
