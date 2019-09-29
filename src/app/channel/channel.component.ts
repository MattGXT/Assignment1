import { Component, OnInit, ɵConsole } from '@angular/core';
import { GroupService } from '../group.service';
import { LoginService } from '../login.service';
import { UseraddService } from '../useradd.service';
import { SocketService } from '../socket.service';


@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css']
})
export class ChannelComponent implements OnInit {
  channelname = "";
  history = [];
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
  messages = [];
  isinRoom = false;
  roomnotice: string = "";
  messagecontent = '';
  selectedfile = null;
  imagepath = '';




  constructor(private addservice: UseraddService, private groupservice: GroupService, private loginservice: LoginService, private socketservice: SocketService) { }

  ngOnInit() {
    this.socketservice.initSocket();
    this.socketservice.getMessage((m) => { this.messages.push(m) });
    this.groupservice.initSocket();
    this.loginservice.initSocket();
    this.addservice.initSocket();
    var username = sessionStorage.getItem('username');
    this.groupservice.getgroup(username);
    this.groupservice.getgrouped((res) => { this.groups = JSON.parse(res) });
    this.channelname = JSON.parse(sessionStorage.getItem("channelname"));
    this.groupservice.getchannel().subscribe((res)=>{
      this.channels = res;
      for (let i = 0; i < this.channels.length; i++) {
        if (this.channelname == this.channels[i].name) {
          this.history = this.channels[i].history;
          this.members = this.channels[i].members;
          this.group = this.channels[i].group;
        }
      }
      console.log(this.history);
      for (let i = 0; i < this.members.length; i++) {
        this.deletetmp.push(this.members[i]);
      }
      for (let i = 0; i < this.deletetmp.length; i++) {
        if (username == this.deletetmp[i]) {
          this.deletetmp.splice(i, 1);
        }
      }
      console.log(this.deletetmp);
    });
    //this.groupservice.getchanneled((res) => {
      
    //});


    this.loginservice.login();
    this.loginservice.logined((res) => {
      this.userlist = JSON.parse(res)
      for (let i = 0; i < this.userlist.length; i++) {
        if (username == this.userlist[i].name) {
          this.isadmin = this.userlist[i].admin;
          this.issuper = this.userlist[i].super;
        }
      }
      console.log(this.members)
      this.temp = this.userlist;
      for (let i = 0; i < this.members.length; i++) {
        for (let j = 0; j < this.userlist.length; j++) {
          if (this.members[i] == this.userlist[j].name) {
            this.temp.splice(j, 1);
          }
        }
      }
      console.log(this.temp);
    });
    this.username = username;
    this.socketservice.joined((msg) => {
    this.channelname = msg
      if (this.channelname != "") {
        this.isinRoom = true;
      } else {
        this.isinRoom = false;
      }
    });
    this.socketservice.notice((msg) => { this.roomnotice = msg });
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

  join() {
    this.socketservice.joinroom(this.channelname);
  }

  leave() {
    this.socketservice.leaveroom(this.channelname);
    this.roomnotice = "";
    this.messages = [];
    this.isinRoom = false;
  }

  chat(message) {
    if (this.selectedfile) {
      const fd = new FormData();
      fd.append('image', this.selectedfile, this.selectedfile.name);
      this.groupservice.imgupload(fd).subscribe(res => {
        this.imagepath = res.data.filename;
        var a = [this.username, message,this.imagepath];
        this.socketservice.sendMessage(a, this.channelname);
        this.messagecontent = null;
      })
    } else{
      var x = [this.username, message]
      this.socketservice.sendMessage(x, this.channelname);
      this.messagecontent = null;
    }
  }

  onfileselected(event) {
    console.log(event);
    this.selectedfile = event.target.files[0];
  }
}
