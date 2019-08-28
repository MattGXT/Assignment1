import { Component, OnInit } from '@angular/core';
import {UseraddService} from '../useradd.service';
import {GroupService} from '../group.service';
import { ChangeDetectorRef } from '@angular/core';
import { of } from 'rxjs';
import { nextTick } from 'q';


@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {
  email = "";
  name = "";
  admin = "";
  issuper = false;
  isadmin = false;
  grouplist = [];
  admingrouplist = [];
  groups = [];


  constructor(private addservice:UseraddService, private groupservice:GroupService) { }

  ngOnInit() {
    this.addservice.initSocket();
    this.groupservice.initSocket();
    var userlist = JSON.parse(localStorage.getItem('user'));
    var username = localStorage.getItem('username');
    console.log(userlist);
    console.log(username);
    for(let i = 0; i< userlist.length;i++){
      if(username == userlist[i].name){
        this.isadmin = userlist[i].admin;
        this.issuper = userlist[i].super;
        this.grouplist = userlist[i].grouplist;
        this.admingrouplist = userlist[i].admingrouplist;
      }
    }
    this.groupservice.getgroup();
    this.groupservice.getgrouped((res)=>{this.groups = JSON.parse(res)}); 

  }

  add(){
    var userlist = JSON.parse(localStorage.getItem('user'));
    if(this.admin == "admin"){
      var newuser = {
        name: this.name,
        super: false,
        admin: true,
        email: this.email,
        grouplist: [],
        admingrouplist: []
      }
    }else if(this.admin == "super"){
      var newuser = {
        name: this.name,
        super: true,
        admin: true,
        email: this.email,
        grouplist: [],
        admingrouplist: []
      }
    }else{
      var newuser = {
        name: this.name,
        super: false,
        admin: false,
        email: this.email,
        grouplist: [],
        admingrouplist: []
      }
    }
    userlist.push(newuser);
    console.log(userlist);
    let newupload = JSON.stringify(userlist);
    localStorage.setItem("user",newupload);
    this.addservice.add(newupload);
  }

}
