import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as io from 'socket.io-client';
import {nextTick} from 'q';

const SERVER_URL = 'http://localhost:3000/group';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  private socket;

  constructor(private http:HttpClient) { }

  initSocket(): void{
    this.socket = io(SERVER_URL);
  }

  getgroup(username){
    console.log(username);
    return this.http.post<any>('http://localhost:3000/api/getgroup', {'username':username});
    //this.socket.emit('getgroup',username);
  }

  getgrouped(next){
    this.socket.on("getgroup",res =>next(res));
  }

  getchannel(){
    return this.http.get<any>('http://localhost:3000/api/getchannel');
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

  addusertogroup(groupname,username){
    this.socket.emit("adduser",groupname,username);
  }

  deluserofgroup(groupname,username){
    this.socket.emit("deluser",groupname,username);
  }

  imgupload(fd){
    return this.http.post<any>('http://localhost:3000/api/upload',fd);
  }
}
