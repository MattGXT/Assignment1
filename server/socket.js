var fs = require('fs');

module.exports = {

    connect: function (io, PORT) {
        var rooms = ["room1", "room2", "room3", "room4"];
        var socketRoom = [];
        var socketRoomnum = [];

        const login = io.of('/login');

        login.on('connection',(socket)=>{
            socket.on('login',()=>{               
                userlist = JSON.parse(fs.readFileSync('./users.json','utf8'));
                login.emit('login',JSON.stringify(userlist));
            })
        })

        const useradd = io.of('/useradd');

        useradd.on('connection',(socket)=>{
            socket.on('add',(user)=>{
                fs.writeFileSync('./users.json',user,function(err){
                    if(err) throw err;
                    console.log('updated');
                })
            })

            socket.on('addgroup',(username,groupname)=>{
                var list = fs.readFileSync('./users.json','utf8');
                let userlist = JSON.parse(list);
                for(let i = 0;i<userlist.length;i++){
                    if(username == userlist[i].name){
                        userlist[i].grouplist.push(groupname);
                        userlist[i].admingrouplist.push(groupname);
                    }
                }
                fs.writeFileSync('./users.json',JSON.stringify(userlist),function(err){
                    if(err) throw err;
                    console.log('updated');
                })
            })

            socket.on('deleteuser',(username)=>{
                var list = fs.readFileSync('./users.json','utf8');
                let userlist = JSON.parse(list);
                for(let i = 0;i<userlist.length;i++){
                    if(username == userlist[i].name){
                        userlist.splice(i,1);
                    }
                }
                fs.writeFileSync('./users.json',JSON.stringify(userlist),function(err){
                    if(err) throw err;
                    console.log('updated');
                })

                grouplist = JSON.parse(fs.readFileSync('./group.json','utf8'));
                for(let i = 0;i<grouplist.length;i++){
                    for(let j = 0;j<grouplist[i].members.length;j++){
                        if(username == grouplist[i].members[j]){
                            grouplist[i].members.splice(j,1);
                        }
                    }
                }
                fs.writeFileSync('./group.json',JSON.stringify(grouplist),function(err){
                    if(err) throw err;
                    console.log('updated');
                })

                channellist = JSON.parse(fs.readFileSync('./channel.json','utf8'));
                for(let i = 0;i<channellist.length;i++){
                    for(let j = 0;j<channellist[i].members.length;j++){
                        if(username == channellist[i].members[j]){
                            channellist[i].members.splice(j,1);
                        }
                    }
                }
                fs.writeFileSync('./channel.json',JSON.stringify(channellist),function(err){
                    if(err) throw err;
                    console.log('updated');
                })
            })
        })

        const groups = io.of('/group');

        groups.on('connection',(socket)=>{
            socket.on('getgroup',()=>{
                grouplist = JSON.parse(fs.readFileSync('./group.json','utf8'));
                groups.emit('getgroup',JSON.stringify(grouplist));
                console.log(JSON.stringify(grouplist));
            })

            socket.on('addgroup',(group)=>{
                grouplist = JSON.parse(fs.readFileSync('./group.json','utf8'));
                grouplist.push(JSON.parse(group));
                fs.writeFileSync('./group.json',JSON.stringify(grouplist),function(err){
                    if(err) throw err;
                    console.log('updated');
                })
            })

            socket.on('removegroup',(groupname,username)=>{
                grouplist = JSON.parse(fs.readFileSync('./group.json','utf8'));
                for(let i = 0;i<grouplist.length;i++){
                    if(groupname == grouplist[i].name){
                        grouplist.splice(i,1);
                    }
                }
                fs.writeFileSync('./group.json',JSON.stringify(grouplist),function(err){
                    if(err) throw err;
                    console.log('updated');
                })

                //remove the group from group property of user
                var list = fs.readFileSync('./users.json','utf8');
                let userlist = JSON.parse(list);
                for(let i = 0; i< userlist.length;i++){
                    if(username == userlist[i].name){
                        for(let j = 0; j< userlist[i].grouplist.length;j++){
                            if(groupname == userlist[i].grouplist[j]){
                                userlist[i].grouplist.splice(j,1);
                            }
                        }
                    }
                }
                fs.writeFileSync('./users.json',JSON.stringify(userlist),function(err){
                    if(err) throw err;
                    console.log('updated');
                })
            })

            
            socket.on('getchannel',()=>{
                channellist = JSON.parse(fs.readFileSync('./channel.json','utf8'));
                groups.emit('getchannel',JSON.stringify(channellist));
            })

            socket.on('addchannel',(channel)=>{
                channellist = JSON.parse(fs.readFileSync('./channel.json','utf8'));
                channellist.push(channel);
                fs.writeFileSync('./channel.json',JSON.stringify(channellist),function(err){
                    if(err) throw err;
                    console.log('updated');
                })
                grouplist = JSON.parse(fs.readFileSync('./group.json','utf8'));
                for(let i = 0;i<grouplist.length;i++){
                    if(channel.group == grouplist[i].name){
                       grouplist[i].channels.push(channel.name);
                    }
                }
                fs.writeFileSync('./group.json',JSON.stringify(grouplist),function(err){
                    if(err) throw err;
                    console.log('updated');
                })
            })

            socket.on('removechannel',(channelname,groupname)=>{
                channellist = JSON.parse(fs.readFileSync('./channel.json','utf8'));
                for(let i = 0; i< channellist.length;i++){
                    if(channelname == channellist[i].name){
                        channellist.splice(i,1);
                    }
                }
                fs.writeFileSync('./channel.json',JSON.stringify(channellist),function(err){
                    if(err) throw err;
                    console.log('updated');
                })

                grouplist = JSON.parse(fs.readFileSync('./group.json','utf8'));
                for(let i = 0;i<grouplist.length;i++){
                    if(groupname == grouplist[i].name){
                        for(let j =0;j<grouplist[i].channels.length;j++){
                          if(channelname == grouplist[i].channels[j]){
                            grouplist[i].channels.splice(j,1);
                          }
                        }
                    }
                }

                fs.writeFileSync('./group.json',JSON.stringify(grouplist),function(err){
                    if(err) throw err;
                    console.log('updated');
                })
            })

            socket.on('addusertochannel',(username,channelname)=>{
                channellist = JSON.parse(fs.readFileSync('./channel.json','utf8'));
                for(let i = 0; i< channellist.length;i++){
                    if(channelname == channellist[i].name){
                        channellist[i].members.push(username);
                    }
                }
                fs.writeFileSync('./channel.json',JSON.stringify(channellist),function(err){
                    if(err) throw err;
                    console.log('updated');
                })
            })

            socket.on('deleteusertochannel',(username,channelname)=>{
                channellist = JSON.parse(fs.readFileSync('./channel.json','utf8'));
                for(let i = 0; i< channellist.length;i++){
                    if(channelname == channellist[i].name){
                        for(let j = 0;j < channellist[i].members.length;j++){
                            if(username == channellist[i].members[j]){
                                channellist[i].members.splice(j,1);
                            }
                        }
                    }
                }
                fs.writeFileSync('./channel.json',JSON.stringify(channellist),function(err){
                    if(err) throw err;
                    console.log('updated');
                })
            })
        })
    









        // Here are unfinished chat functions.
        const chat = io.of('/chat');

        chat.on('connection', (socket) => {
            socket.on('message', (message) => {
                for (i = 0; i < socketRoom.length; i++) {
                    if (socketRoom[i][0] == socket.id) {
                        chat.to(socketRoom[i][1]).emit('message', message);
                    }
                }
            });


            socket.on('newroom', (newroom) => {

                if (rooms.indexOf(newroom) == -1) {
                    rooms.push(newroom);
                    chat.emit('roomlist', JSON.stringify(rooms));
                }

            });

            socket.on('roomlist', (m) => {
                chat.emit('roomlist', JSON.stringify(rooms));

            });


            socket.on('numusers', (room) => {
                var usercount = 0;

                for (i = 0; i < socketRoomnum.length; i++) {
                    if(socketRoomnum[i][0] == room){
                        usercount = socketRoomnum[i][1];
                    }
                    
                }

                chat.in(room).emit('numusers', usercount);

            });

            socket.on('joinRoom', (room) => {

                if (rooms.includes(room)) {
                    socket.join(room, () => {
                        var inroomSocketarray = false;

                        for (i = 0; i < socketRoom.length; i++) {
                            if (socketRoom[i][0] == socket.id) {
                                socketRoom[i][1] = room;
                                inroom = true;
                            }
                        }
                        if (inroomSocketarray == false) {
                            socketRoom.push([socket.id, room]);
                            var hasroomum = false;
                            for (let j = 0; j < socketRoomnum.length; j++) {
                                if (socketRoomnum[j][0] == room) {
                                    socketRoomnum[j][1] = socketRoomnum[j][1] + 1;
                                    hasroomum = true;
                                }
                            }
                            if (hasroomum == false) {
                                socketRoomnum.push([room, 1]);
                            }
                        }
                        chat.in(room).emit("notice", "A new user has joined");


                    });
                    return chat.in(room).emit("joined", room);
                }
            });

            socket.on("leaveroom", (room) => {
                for (let i = 0; i < socketRoom.length; i++) {
                    if(socketRoom[i][0] == socket.id){
                        socketRoom.splice(i, 1);
                        socket.leave(room);
                        chat.to(room).emit("notice", "A user has left");
                    }
                }

                for (let j = 0; j < socketRoomnum.length; j++) {
                    if (socketRoomnum[j][0] == room) {
                        socketRoomnum[j][1] = socketRoomnum[j][1] - 1;
                        if (socketRoomnum[j][1] == 0) {
                            socketRoomnum.splice(j, 1);
                        }
                    }
                }
            });

            socket.on('disconnect', () => {
                chat.emit("disconnect");
                for (let i = 0; i < socketRoom.length; i++) {
                    if (socketRoom[i][0] == socket.id) {
                        socketRoom.splice(i, 1);
                    }
                }
                for (let j = 0; j < socketRoomnum.length; j++) {
                    if (socketRoomnum[j][0] == socket.room) {
                        socketRoomnum[j][1] = socketRoomnum[j][1] - 1;
                    }
                }
                console.log("client disconnected");

            });
        });
    }
}
