import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import {nextTick} from 'q';

const SERVER_URL = 'http://localhost:3000/group';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  private socket;

  constructor() { }

  initSocket(): void{
    this.socket = io(SERVER_URL);
  }

  getgroup():void{
    this.socket.emit('getgroup');
  }

  getgrouped(next){
    this.socket.on("getgroup",res =>next(res));
  }

  getchannel(){
    this.socket.emit('getchannel');
  }

  getchanneled(next){
    this.socket.on("getchannel",res =>next(res));
  }

  addgroup(group){
    this.socket.emit("addgroup",group);
  }

  removegroup(groupname,username){
    this.socket.emit("removegroup",groupname,username);
  }

  addchannel(channel){
    this.socket.emit("addchannel",channel);
  }
  
  removechannel(channelname,groupname){
    this.socket.emit("removechannel",channelname,groupname);
  }

  addusertochannel(username,channelname,groupname){
    this.socket.emit("addusertochannel",username,channelname,groupname);
  }

  deleteusertochannel(username,channelname){
    this.socket.emit("deleteusertochannel",username,channelname);
  }

  addassistogroup(groupname,assisname){
    this.socket.emit("addassistogroup",groupname,assisname);
  }
}
