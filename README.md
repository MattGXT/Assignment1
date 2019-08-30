# Chat

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.2.0.

## Git

 I divide this assignment into a few parts. I pushed the changes to GitHub after I finished some part of functions. This will help me to check for changes and find bugs. I added the correct comment for each push to ensure that I can find a solution to the problem.

## Data structures

 Here are three classes to save data.

Users {
Name: string
Admin: bool
Super: bool
Email: string
Grouplist: array
Admingrouplist: array
}

Group {
Name: string
Members: array
Channels: array
Assis: array
}

Channel {
Name: string
Group: string
Members: array
History: string
}

## Angular architecture

1. Components:
    - Login
    -  Group
    - Channel
    - Chat (haven’t done)

2. Services:
    - Login (get the current userlists)
    - Group (get or modify groups and channels)
    - Useradd (add or delete new user and add new group)
    - Socket (for chat part)

3. Models:

    Models are same as data structures

4. Routes:

    const routes: Routes = [
        {path: 'chat', component: ChatComponent},
        {path: 'login', component: LoginComponent},
        {path: 'group', component: GroupComponent},
        {path: 'channel', component: ChannelComponent},
    ];

## Node server architecture

1. Modules:
    - Fs
    - Express
    - Socket.io
    - Cors
    - http

2. functions:
    - socket.connect()
    - server.listen()

3. files:
    - main: server.js
    - socket: socket.js
    - socket-listen: listen.js
    here are three files to save data:
    - users.json
    - group.json
    - channel.json

4. global variables:
    - PORT(int)

## Responsibilities
- client:
    - The client is responsible for handling the display of the user interface and determining the permissions of the current user to display different forms. And provide a variety of buttons to allow users to intuitively modify the data.
- Server
    - he server is responsible for processing the data. Its main function is to send the data extracted from the file to the client and store the data sent from the client into the file.

## Server list
- Route:
    - /login
    - /useradd
    - /group
    - /chat

- Socket:
1. socket.on(‘login”)
    - no parameters
    - return array of userlist
    - Get the current userlist from file

2. socket.on(‘add”,(user))
    - parameter: object of user, return console.log(“updated”)
    - return err or console.log('updated');
    - add new user to userlist

3. socket.on(‘addgroup”,(username, groupname))
    - parameter: username(string), groupname(string)
    - return err or console.log('updated');
    - add group to group of userlist

4. socket.on(‘deleteuser”, (username))
    - parameter: username(string)
    - return err or console.log('updated');
    - delet user from userlist

5. socket.on(‘getgroup”)
    - no parameters
    - return array of grouplist
    - get the grouplist form file

6. socket.on(‘addgroup”, (group))
    - parameter: object of group
    - return err or console.log('updated');
    - add group to grouplist

7. socket.on(‘removegroup”, (groupname, username))
    - parameter: groupname(string), username(string)
    - return err or console.log('updated');
    - remove the group form grouplist

8. socket.on(‘addassistogroup”, (groupname,assisname))
    - parameter: groupname(string), assisname(string)
    - return err or console.log('updated');
    - add assis to the group

9. socket.on(‘getchannel”)
    - no parameters
    - return array of channellist
    - get the channel list from file

10. socket.on(‘addchannel”,(channel))
    - parameter: object of channel
    - return err or console.log('updated');
    - add new channel

11. socket.on(‘removechannel”, (channelname, groupname))
    - parameter: groupname(string), channelname(string)
    - return err or console.log('updated');
    - remove channel from channel list

12. socket.on(‘addusertochannel”, (username, channelname, groupname))
    - parameter: username(string), groupname(string), channelname(string)
    - return err or console.log('updated');
    - add new user to channel

13. socket.on(‘deleteusertochannel”, (username, channelname))
    - parameter: username(string), channelname(string)
    - return err or console.log('updated');
    - delete user form channel

## Interaction

angular component page will be updated because of initsocket and get data of different sockets from the server in ngoninit. Data saved in server side, once the angular need data, it will send request through emit to server socket. Server socket receive this request and tread the file in server, get data from it then send it back to the angular. Angular receive data and update it on the page. The functions like add user or modify the group just send the request to server side with parameters and the server side write the data to the file. Then the angular page will update once the file content changed.











