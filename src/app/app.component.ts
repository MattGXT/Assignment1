import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'chat';
  login = true;
  username = ""

  constructor() { 
    this.hidelogin();
  }

  ngOnInit(){
    
  }

  //hide login button after login
  hidelogin(){
    this.username = sessionStorage.getItem('username');
    if(this.username){
      this.login = false;
    }
  }

  
  //logout to clear the sessionstorage
  logout(){
    sessionStorage.clear();
  }
}


