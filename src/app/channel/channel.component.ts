import { Component, OnInit, ɵConsole } from '@angular/core';
import { GroupService } from '../group.service';
import { LoginService } from '../login.service';
import { UseraddService } from '../useradd.service';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css']
})
export class ChannelComponent implements OnInit {
  channelname = "";
  history = "";
  members = [];
  temp = [];
  deletetmp = [];
  addusername = "";
  deleteusername = "";
  group = "";
  isadmin = false;
  issuper = false;
  username = "";
  channels = [];
  userlist = [];
  groups = [];




  constructor(private addservice: UseraddService, private groupservice: GroupService, private loginservice: LoginService) { }

  ngOnInit() {
    this.groupservice.initSocket();
    this.loginservice.initSocket();
    this.addservice.initSocket();
    var username = localStorage.getItem('username');
    this.groupservice.getgroup();
    this.groupservice.getgrouped((res)=>{this.groups = JSON.parse(res)}); 
    this.channelname = JSON.parse(localStorage.getItem("channelname"));
    this.groupservice.getchannel();
    this.groupservice.getchanneled((res) => {
    this.channels = JSON.parse(res)
      for (let i = 0; i < this.channels.length; i++) {
        if (this.channelname == this.channels[i].name) {
          this.history = this.channels[i].history;
          this.members = this.channels[i].members;
          this.group = this.channels[i].group;
        }
      }
      this.deletetmp = this.members;
    for (let i = 0; i < this.deletetmp.length; i++) {
      if (username == this.deletetmp[i]) {
        this.deletetmp.splice(i, 1);
      }
    }
    });


    this.loginservice.login();
    this.loginservice.logined((res) => {
    this.userlist = JSON.parse(res)
      for (let i = 0; i < this.userlist.length; i++) {
        if (username == this.userlist[i].name) {
          this.isadmin = this.userlist[i].admin;
          this.issuper = this.userlist[i].super;
        }
      }

      this.temp = this.userlist;
      for (let i = 0; i < this.members.length; i++) {
        for (let j = 0; j < this.userlist.length; j++) {
          if (this.members[i] == this.userlist[j].name) {
            this.temp.splice(j, 1);
          }
        }
      }
    });

    
    this.username = username;
    console.log(this.username);
    console.log(this.members);
    console.log(this.deletetmp);
  }


  adduser() {
    // add username to channel
    this.groupservice.addusertochannel(this.addusername, this.channelname, this.group);
    alert("add successful");
    location.reload();
  }

  deleteuser() {
    this.groupservice.deleteusertochannel(this.deleteusername, this.channelname);
    alert("delete successful");
    location.reload();
  }

  checkauth(groupname) {
    for (let i = 0; i < this.groups.length; i++) {
      if (groupname == this.groups[i].name) {
        for (let j = 0; j < this.groups[i].assis.length; j++) {
          if (this.username == this.groups[i].assis[j]) {
            return true;
          }
        }
      }
    }
    if (this.isadmin == true || this.issuper == true) {
      return true;
    }
  }
}
