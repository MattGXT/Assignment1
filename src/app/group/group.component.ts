import { Component, OnInit } from '@angular/core';
import { UseraddService } from '../useradd.service';
import { GroupService } from '../group.service';
import {LoginService} from '../login.service';
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
  isassis = false;
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
  assislist = [];
  assisname = "";
  userlist = [];




  constructor(private addservice: UseraddService, private groupservice: GroupService, private loginservice:LoginService) { }

  ngOnInit() {
    let username = localStorage.getItem('username');
    this.loginservice.initSocket();
    this.addservice.initSocket();
    this.groupservice.initSocket();
    this.loginservice.login();
    this.loginservice.logined((res)=>{this.userlist = JSON.parse(res)
      for (let i = 0; i < this.userlist.length; i++) {
        this.usernamelist.push(this.userlist[i].name);
        if (username == this.userlist[i].name) {
          this.isadmin = this.userlist[i].admin;
          this.issuper = this.userlist[i].super;
          this.grouplist = this.userlist[i].grouplist;
          this.admingrouplist = this.userlist[i].admingrouplist;
          this.assislist.splice(i, 1);
        }
      }
      this.assislist = this.userlist;
    }); 
    this.groupservice.initSocket();
    this.groupservice.getgroup();
    this.groupservice.getgrouped((res)=>{this.groups = JSON.parse(res)
      for (let i = 0; i < this.groups.length; i++) {
        for (let j = 0; j < this.groups[i].members.length; j++) {
          if (username == this.groups[i].members[j]) {
            this.showngroups.push(this.groups[i]);
          }
        }
      }
    }); 
    this.groupservice.getchannel();
    this.groupservice.getchanneled((res)=>{this.channels = JSON.parse(res)});
    console.log(this.assislist);

    //Show the group current user has joined

    this.username = username;
    console.log(this.showngroups);
  }

  add() {
    if (this.admin == "admin") {
      var newuser = {
        name: this.name,
        super: false,
        admin: true,
        email: this.email,
        grouplist: [],
        admingrouplist: []
      }
    } else if (this.admin == "super") {
      var newuser = {
        name: this.name,
        super: true,
        admin: true,
        email: this.email,
        grouplist: [],
        admingrouplist: []
      }
    } else {
      var newuser = {
        name: this.name,
        super: false,
        admin: false,
        email: this.email,
        grouplist: [],
        admingrouplist: []
      }
    }
    this.userlist.push(newuser);
    let newupload = JSON.stringify(this.userlist);
    this.addservice.add(newupload);
    location.reload();
  }

  creategroup() {
    var username = localStorage.getItem('username');
    var empty = [];
    empty.push(username);
    var grouplist = {
      name: this.groupname,
      members: empty,
      channels: [],
      assis: []
    }
    this.groups.push(grouplist);
    console.log(this.groups);
    this.addservice.addgroup(username, this.groupname);
    this.groupservice.addgroup(JSON.stringify(grouplist));
    alert("create successful");
    location.reload();
  }

  remove(groupname) {
    var username = localStorage.getItem('username');
    for (let i = 0; i < this.groups.length; i++) {
      if (groupname == this.groups[i].name) {
        this.groups.splice(i, 1);
      }
    }
    console.log(this.groups);
    this.groupservice.removegroup(groupname, username);
    location.reload();
  }

  addchannel(groupname) {
    var username = localStorage.getItem('username');
    var empty = [];
    empty.push(username);
    var channel = {
      name: this.channelname,
      group: groupname,
      members: empty,
      history: ""
    }
    this.groupservice.addchannel(channel);
    location.reload();
  }

  removechannel(channelname, groupname) {
    this.groupservice.removechannel(channelname, groupname);
    location.reload();
  }

  deleteuser() {
    this.addservice.delete(this.deleteusername);
    location.reload();
  }

  go(channelname) {
    localStorage.setItem("channelname", JSON.stringify(channelname));
  }

  addassis(groupname) {
    this.groupservice.addassistogroup(groupname, this.assisname);
    alert("add successful");
    location.reload();
  }

  //check the current is assis,admin,super or not
  checkauth(groupname) {
    for (let i = 0; i < this.grouplist.length; i++) {
      if (groupname == this.grouplist[i].name) {
        for (let j = 0; j < this.grouplist[i].assis.length; j++) {
          if (this.username == this.grouplist[i].assis[j]) {
            return true;
          }
        }
      }
    }
    if(this.isadmin == true|| this.issuper == true){
      return true;
    }
  }
}
