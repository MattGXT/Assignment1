import { Component, OnInit } from '@angular/core';
import { UseraddService } from '../useradd.service';
import { GroupService } from '../group.service';
import { LoginService } from '../login.service';
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
  password: string;
  issuper = false;
  isadmin = false;
  isassis = false;
  grouplist = [];
  admingrouplist = [];
  groups: any;
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
  aname = "";
  dname = "";




  constructor(private addservice: UseraddService, private groupservice: GroupService, private loginservice: LoginService) { }

  ngOnInit() {
    let username = sessionStorage.getItem('username');
    this.username = username;
    this.loginservice.initSocket();
    this.addservice.initSocket();
    this.groupservice.initSocket();
    this.loginservice.login();
    this.loginservice.logined((res) => {
      this.userlist = JSON.parse(res)
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
    this.groupservice.getgroup(username).subscribe((data) => {
      this.groups = data
    });
    //this.groupservice.getgrouped((res)=>{this.groups = JSON.parse(res)}); 
    this.groupservice.getchannel().subscribe((res) => { this.channels = res });
    //this.groupservice.getchanneled((res)=>{this.channels = JSON.parse(res)});
  }

  //add user to userlist
  add() {
    if(this.name == ""||this.email == ""||this.password == ""){
      alert('please input whole detail')
    }else{
      if (this.admin == "admin") {
        var newuser = {
          name: this.name,
          super: false,
          admin: true,
          email: this.email,
          grouplist: [],
          admingrouplist: [],
          password: this.password
        }
      } else if (this.admin == "super") {
        var newuser = {
          name: this.name,
          super: true,
          admin: true,
          email: this.email,
          grouplist: [],
          admingrouplist: [],
          password: this.password
        }
      } else {
        var newuser = {
          name: this.name,
          super: false,
          admin: false,
          email: this.email,
          grouplist: [],
          admingrouplist: [],
          password: this.password
        }
      }
      this.userlist.push(newuser);
      this.addservice.add(JSON.stringify(newuser));
      location.reload();
    }
  }

  //create group
  creategroup() {
    if (this.groupname == "") {
      alert("please input group name")
    } else {
      var username = sessionStorage.getItem('username');
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
  }

  //remove group
  remove(groupname) {
    var username = sessionStorage.getItem('username');
    for (let i = 0; i < this.groups.length; i++) {
      if (groupname == this.groups[i].name) {
        this.groups.splice(i, 1);
      }
    }
    console.log(this.groups);
    this.groupservice.removegroup(groupname, username);
    location.reload();
  }

  //add channel to group
  addchannel(groupname) {
    if (this.channelname == "") {
      alert('please input the name of channel')
    } else {
      var username = sessionStorage.getItem('username');
      var empty = [];
      empty.push(username);
      var channel = {
        name: this.channelname,
        group: groupname,
        members: empty,
        history: []
      }
      this.groupservice.addchannel(channel);
      location.reload();
    }
  }

  //remove channel with groupname and channel name
  removechannel(channelname, groupname) {
    this.groupservice.removechannel(channelname, groupname);
    location.reload();
  }

  //delete user from User
  deleteuser() {
    this.addservice.delete(this.deleteusername);
    location.reload();
  }

  //set channelname which user selected
  go(channelname) {
    sessionStorage.setItem("channelname", JSON.stringify(channelname));
  }

  //add assis to group
  addassis(groupname) {
    this.groupservice.addassistogroup(groupname, this.assisname);
    alert("add successful");
    location.reload();
  }

  //add user to group
  adduser(groupname) {
    this.groupservice.addusertogroup(groupname, this.aname);
    alert("successful");
    location.reload();
  }

  //delete user from group
  deluser(groupname) {
    this.groupservice.deluserofgroup(groupname, this.dname);
    alert("successful");
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
    if (this.isadmin == true || this.issuper == true) {
      return true;
    }
  }

  //update the select tag for add user to group
  getaddgroupuser(groupmember) {
    var userlist = this.userlist;
    var addgroupuser = [];
    for (let i = 0; i < userlist.length; i++) {
      addgroupuser.push(userlist[i].name);
    }
    for (let i = 0; i < addgroupuser.length; i++) {
      for (let j = 0; j < groupmember.length; j++) {
        if (groupmember[j] == addgroupuser[i]) {
          addgroupuser.splice(i, 1);
        }
      }
    }
    return addgroupuser;
  }
}
