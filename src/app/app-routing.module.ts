import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { LoginComponent } from './login/login.component';
import { GroupComponent } from './group/group.component';
import { ChannelComponent } from './channel/channel.component';



const routes: Routes = [
  {path: 'chat', component: ChatComponent},
  {path: 'login', component: LoginComponent},
  {path: 'group', component: GroupComponent},
  {path: 'channel', component: ChannelComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
