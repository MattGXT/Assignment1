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

  addgroup(group){
    this.socket.emit("addgroup",group);
  }
}
