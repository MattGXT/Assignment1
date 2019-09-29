import { Injectable } from '@angular/core';

import * as io from 'socket.io-client';
import {nextTick} from 'q';

const SERVER_URL = 'http://localhost:3000/chat';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket;

  constructor() { }

  initSocket(): void{
    this.socket = io(SERVER_URL);
  }

  joinroom(selroom): void{
    this.socket.emit("joinRoom",selroom);
  }

  leaveroom(selroom):void{
    this.socket.emit("leaveroom",selroom);
  }

  joined(next){
    this.socket.on('joined',res =>next(res));
  }

  notice(next){
    this.socket.on('notice',res => next(res));
  }

  sendMessage(message,channelname): void{
    this.socket.emit('message',message,channelname);
  }

  getMessage(next){
    this.socket.on('message',(message)=>next(message));
  }
}
