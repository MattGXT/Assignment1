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
  user = [];
  groups = [];
  channels = [];

  constructor(private loginservice:LoginService, private router: Router, private groupservice:GroupService) { }

  ngOnInit() {
    this.loginservice.initSocket();
    this.loginservice.login();
    this.loginservice.logined((res)=>{this.user = JSON.parse(res)}); 
    this.groupservice.initSocket();
    this.groupservice.getgroup();
    this.groupservice.getgrouped((res)=>{this.groups = JSON.parse(res)}); 
    this.groupservice.getchannel();
    this.groupservice.getchanneled((res)=>{this.channels = JSON.parse(res)});
  }

  login(){
    var a = 0;
      for(let i = 0;i< this.user.length;i++){
        if(this.username == this.user[i].name){
          alert("successful");
          localStorage.setItem("username", this.username);
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
