import { Component, OnInit } from '@angular/core';
import {LoginService} from '../login.service';
import { NgModule } from '@angular/core';
import { Router } from '@angular/router'; 
import { delay } from 'q';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username:string = "";
  user = [];

  constructor(private socketservice:LoginService, private router: Router) { }

  ngOnInit() {
    this.socketservice.initSocket();
  }

  login(){
    this.socketservice.login(this.username);
    this.socketservice.logined((res)=>{this.user = JSON.parse(res)}); 
    console.log(this.user);
    if(this.user.length == 0){
      alert("please try again");
    }
    if(this.user.length != 0){
      alert("successful");
      localStorage.setItem("user", JSON.stringify(this.user));
      localStorage.setItem("username", this.username);
      this.router.navigate(['/group']);
    }
  }

}
