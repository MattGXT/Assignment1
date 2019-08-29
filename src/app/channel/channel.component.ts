import { Component, OnInit, ɵConsole } from '@angular/core';
import { GroupService } from '../group.service';

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




  constructor(private groupservice: GroupService) { }

  ngOnInit() {
    this.groupservice.initSocket();
    this.channelname = JSON.parse(localStorage.getItem("channelname"));
    var channel = JSON.parse(localStorage.getItem("channel"));

    for (let i = 0; i < channel.length; i++) {
      if (this.channelname == channel[i].name) {
        this.history = channel[i].history;
        this.members = channel[i].members;
        this.group = channel[i].group;
      }
    }
    var userlist = JSON.parse(localStorage.getItem('user'));
    var username = localStorage.getItem('username');
    for (let i = 0; i < userlist.length; i++) {
      if (username == userlist[i].name) {
        this.isadmin = userlist[i].admin;
        this.issuper = userlist[i].super;
      }
    }


    this.temp = userlist;
    for (let i = 0; i < this.members.length; i++) {
      for (let j = 0; j < userlist.length; j++) {
        if (this.members[i] == userlist[j].name) {
          this.temp.splice(j, 1);
        }
      }
    }
    this.deletetmp = this.members;
    for (let i = 0; i < this.deletetmp.length; i++) {
      if (username == this.deletetmp[i]) {
        this.deletetmp.splice(i, 1);
      }
    }
    this.username = username;
    console.log(this.username);
    console.log(this.members);
    console.log(this.deletetmp);
  }


  adduser() {
    // add username to channel
    this.groupservice.addusertochannel(this.addusername, this.channelname,this.group);
    var channellist = JSON.parse(localStorage.getItem("channel"));
    for (let i = 0; i < channellist.length; i++) {
      if (this.channelname == channellist[i].name) {
        channellist[i].members.push(this.addusername);
      }
    }
    //add username to group property
    var grouplist = JSON.parse(localStorage.getItem("group"));
    for(let i = 0;i<grouplist.length;i++){
      if(this.group == grouplist[i].name){
        grouplist[i].members.push(this.addusername);
      }
    }
    // add groupname to user property
    var userlist = JSON.parse(localStorage.getItem('user'));
    for(let i = 0;i<userlist.length;i++){
      if(this.addusername == userlist[i].name){
        userlist[i].grouplist.push(this.group);
      }
    }
    localStorage.setItem("channel", JSON.stringify(channellist));
    alert("add successful");
    location.reload();
  }

  deleteuser() {
    this.groupservice.deleteusertochannel(this.deleteusername, this.channelname);
    var channellist = JSON.parse(localStorage.getItem("channel"));
    for (let i = 0; i < channellist.length; i++) {
      if (this.channelname == channellist[i].name) {
        for (let j = 0; j < channellist[i].members.length; j++) {
          if (this.deleteusername == channellist[i].members[j]) {
            channellist[i].members.splice(j, 1);
          }
        }
      }
    }
    localStorage.setItem("channel", JSON.stringify(channellist));
    alert("delete successful");
    location.reload();
  }

  checkauth(groupname) {
    var grouplist = JSON.parse(localStorage.getItem("group"));
    for (let i = 0; i < grouplist.length; i++) {
      if (groupname == grouplist[i].name) {
        for (let j = 0; j < grouplist[i].assis.length; j++) {
          if (this.username == grouplist[i].assis[j]) {
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
