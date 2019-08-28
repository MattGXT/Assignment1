import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'chat';
  login = true;

  constructor() { 
    this.hidelogin();

  }

  ngOnInit(){
    
  }

  hidelogin(){
    let username = localStorage.getItem('username');
    if(username){
      this.login = false;
    }
  }

  

  logout(){
    localStorage.clear();
  }
}


