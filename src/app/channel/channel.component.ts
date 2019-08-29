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



  constructor(private groupservice: GroupService) { }

  ngOnInit() {
    this.groupservice.initSocket();
    this.channelname = JSON.parse(localStorage.getItem("channelname"));
    var channel = JSON.parse(localStorage.getItem("channel"));

    for (let i = 0; i < channel.length; i++) {
      if (this.channelname == channel[i].name) {
        this.history = channel[i].history;
        this.members = channel[i].members;
      }
    }
    var userlist = JSON.parse(localStorage.getItem('user'));
    console.log(userlist);
    var username = localStorage.getItem('username');
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
    console.log(this.members);
    console.log(this.deletetmp);
  }


  adduser() {
    this.groupservice.addusertochannel(this.addusername, this.channelname);
    var channellist = JSON.parse(localStorage.getItem("channel"));
    for (let i = 0; i < channellist.length; i++) {
      if (this.channelname == channellist[i].name) {
        channellist[i].members.push(this.addusername);
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
}
