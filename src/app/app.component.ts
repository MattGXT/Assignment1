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

  hidelogin(){
    this.username = sessionStorage.getItem('username');
    if(this.username){
      this.login = false;
    }
  }

  

  logout(){
    sessionStorage.clear();
  }
}


