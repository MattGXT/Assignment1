import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import {nextTick} from 'q';

const SERVER_URL = 'http://localhost:3000/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private socket;

  constructor() { }

  initSocket(): void{
    this.socket = io(SERVER_URL);
  }

  login():void{
    this.socket.emit("login");
  }

  logined(next){
    this.socket.on("login",res =>next(res));
  }
}
