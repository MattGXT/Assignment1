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
  showngroups = [];
  groupname = "";
  username = "";


  constructor(private addservice:UseraddService, private groupservice:GroupService) { }

  ngOnInit() {
    this.addservice.initSocket();
    this.groupservice.initSocket();
    let userlist = JSON.parse(localStorage.getItem('user'));
    let username = localStorage.getItem('username');
    let groups = JSON.parse(localStorage.getItem("group"));
    console.log(userlist);
    console.log(username);
    console.log(groups);
    for(let i = 0; i< userlist.length;i++){
      if(username == userlist[i].name){
        this.isadmin = userlist[i].admin;
        this.issuper = userlist[i].super;
        this.grouplist = userlist[i].grouplist;
        this.admingrouplist = userlist[i].admingrouplist;
      }
    }
    for(let i = 0; i<groups.length;i++){
      for(let j = 0;j < groups[i].members.length;j++){
        if(username == groups[i].members[j]){
          this.showngroups.push(groups[i]);
        }
      }
    }
    this.groups = groups;
    this.username = username;
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

  creategroup(){
    var username = localStorage.getItem('username');
    var group = JSON.parse(localStorage.getItem("group"));
    var empty = [];
    empty.push(username);
    var grouplist = {
      name: this.groupname,
      members: empty,
      channels: []
    }
    group.push(grouplist);
    var userlist = JSON.parse(localStorage.getItem('user'));
    for(let i = 0; i< userlist.length;i++){
      if(username == userlist[i].name){
        userlist[i].grouplist.push(this.groupname);
        userlist[i].admingrouplist.push(this.groupname);
      }
    }
    localStorage.setItem("user",JSON.stringify(userlist));
    localStorage.setItem("group",JSON.stringify(group));
    console.log(group);
    this.addservice.addgroup(username,this.groupname);
    this.groupservice.addgroup(JSON.stringify(grouplist));
    alert("create successful");
  }

}
