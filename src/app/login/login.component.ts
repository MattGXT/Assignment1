import { Component, OnInit } from '@angular/core';
import {LoginService} from '../login.service';
import { NgModule } from '@angular/core';
import { Router } from '@angular/router'; 
import { delay } from 'q';
import {GroupService} from '../group.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username:string = "";
  password:string;
  user = [];
  groups = [];
  channels = [];

  constructor(private loginservice:LoginService, private router: Router, private groupservice:GroupService) { }

  ngOnInit() {
    this.loginservice.initSocket();
    this.loginservice.login();
    this.loginservice.logined((res)=>{this.user = JSON.parse(res)}); 
  }

  //login with name and password
  login(){
    var a = 0;
      for(let i = 0;i< this.user.length;i++){
        if(this.username == this.user[i].name&&this.password ==this.user[i].password){
          alert("successful");
          sessionStorage.setItem("username", this.username);
          this.router.navigate(['/group']);
          a = 1;
          break;
        }
      }
      if(a == 0){
        alert("Try again");
      }
  }

  

}
