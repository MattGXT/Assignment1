import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { LoginComponent } from './login/login.component';
import { GroupComponent } from './group/group.component';



const routes: Routes = [
  {path: 'chat', component: ChatComponent},
  {path: 'login', component: LoginComponent},
  {path: 'group', component: GroupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
