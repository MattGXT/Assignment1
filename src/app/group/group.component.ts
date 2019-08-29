import { Component, OnInit } from '@angular/core';
import {UseraddService} from '../useradd.service';
import {GroupService} from '../group.service';
import { ChangeDetectorRef } from '@angular/core';
import { of, iif } from 'rxjs';
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
  usernamelist = [];
  channels = [];
  channelname = "";
  deleteusername = "";


  constructor(private addservice:UseraddService, private groupservice:GroupService) { }

  ngOnInit() {
    this.addservice.initSocket();
    this.groupservice.initSocket();
    let userlist = JSON.parse(localStorage.getItem('user'));
    let username = localStorage.getItem('username');
    let groups = JSON.parse(localStorage.getItem("group"));
    this.channels = JSON.parse(localStorage.getItem("channel"));
    console.log(this.channels);
    console.log(groups);
    for(let i = 0; i< userlist.length;i++){
      this.usernamelist.push(userlist[i].name);
      if(username == userlist[i].name){
        this.isadmin = userlist[i].admin;
        this.issuper = userlist[i].super;
        this.grouplist = userlist[i].grouplist;
        this.admingrouplist = userlist[i].admingrouplist;
      }
    }
    console.log(this.usernamelist);
    //Show the group current user has joined
    for(let i = 0; i<groups.length;i++){
      for(let j = 0;j < groups[i].members.length;j++){
        if(username == groups[i].members[j]){
          this.showngroups.push(groups[i]);
        }
      }
    }
    this.groups = groups;
    this.username = username;
    console.log(this.showngroups);
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
    location.reload();
  }

  remove(groupname){
    var grouplist = JSON.parse(localStorage.getItem("group"));
    var username = localStorage.getItem('username');
    console.log(grouplist);
    for(let i = 0;i<grouplist.length;i++){
      if(groupname == grouplist[i].name){
        grouplist.splice(i,1);
      }
    }
    console.log(grouplist);
    localStorage.setItem("group",JSON.stringify(grouplist));
    this.groupservice.removegroup(groupname,username);
    location.reload();
  }

  addchannel(groupname){
    var channellist = JSON.parse(localStorage.getItem("channel"));
    var grouplist = JSON.parse(localStorage.getItem("group"));
    var username = localStorage.getItem('username');
    var empty = [];
    empty.push(username);
    var channel = {
      name: this.channelname,
      group: groupname,
      members: empty,
      history: ""
    }
    for(let i = 0;i<grouplist.length;i++){
      if(groupname == grouplist[i].name){
        grouplist[i].channels.push(this.channelname);
      }
    }
    localStorage.setItem("group",JSON.stringify(grouplist));
    channellist.push(channel);
    localStorage.setItem("channel",JSON.stringify(channellist));
    this.groupservice.addchannel(channel);
    location.reload();
  }

  removechannel(channelname,groupname){
    var channellist = JSON.parse(localStorage.getItem("channel"));
    var grouplist = JSON.parse(localStorage.getItem("group"));
    for(let i = 0;i<channellist.length;i++){
      if(channelname == channellist[i].name){
        channellist.splice(i,1);
      }
    }

    for(let i = 0;i<grouplist.length;i++){
      if(groupname == grouplist[i].name){
        for(let j =0;j<grouplist[i].channels.length;j++){
          if(channelname == grouplist[i].channels[j]){
            grouplist[i].channels.splice(j,1);
          }
        }
      }
    }
    console.log(grouplist);
    localStorage.setItem("group",JSON.stringify(grouplist));
    localStorage.setItem("channel",JSON.stringify(channellist));
    this.groupservice.removechannel(channelname,groupname);
    location.reload();
  }

  deleteuser(){
    this.addservice.delete(this.deleteusername);
    var channellist = JSON.parse(localStorage.getItem("channel"));
    var grouplist = JSON.parse(localStorage.getItem("group"));
    var userlist = JSON.parse(localStorage.getItem('user'));
    for(let i = 0;i<userlist.length;i++){
      if(this.deleteusername == userlist[i].name){
          userlist.splice(i,1);
      }
    }
    for(let i = 0;i<grouplist.length;i++){
      for(let j = 0;j<grouplist[i].members.length;j++){
          if(this.deleteusername == grouplist[i].members[j]){
              grouplist[i].members.splice(j,1);
          }
      }
    }
    for(let i = 0;i<channellist.length;i++){
      for(let j = 0;j<channellist[i].members.length;j++){
          if(this.deleteusername == channellist[i].members[j]){
              channellist[i].members.splice(j,1);
          }
      }
    }
    localStorage.setItem("group",JSON.stringify(grouplist));
    localStorage.setItem("channel",JSON.stringify(channellist));
    localStorage.setItem("user",JSON.stringify(userlist));
  }

  go(channelname){
    localStorage.setItem("channelname",JSON.stringify(channelname));
  }
}
