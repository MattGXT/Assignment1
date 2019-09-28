var fs = require('fs');

module.exports = {

    connect: function (app, io, db) {
        var socketRoom = [];
        var socketRoomnum = [];

        //Get user from database
        const login = io.of('/login');
        login.on('connection', (socket) => {
            socket.on('login', () => {
                const collection = db.collection('User');
                collection.find({}).toArray((err, data) => {
                    login.emit('login', JSON.stringify(data));
                })
            })
        })


        const useradd = io.of('/useradd');
        useradd.on('connection', (socket) => {
            // Add user to database
            socket.on('add', (user) => {
                const collection = db.collection('User');
                thisuser = JSON.parse(user);
                collection.find({ 'name': thisuser.name }).count((err, count) => {
                    if (count == 0) {
                        //if no duplicate
                        collection.insertOne(thisuser, (err, dbres) => {
                            if (err) throw err;
                        })
                    } else {
                        //On Error send back error message
                        console.log("DUPLICATE")
                    }
                });
            })

            //add group to database
            socket.on('addgroup', (username, groupname) => {
                const collection = db.collection('User');
                collection.updateOne({ name: username }, { $push: { grouplist: groupname, admingrouplist: groupname } }, () => {
                    console.log("add groupname to userlist successful")
                })
            })

            //Delete user from User,Group and Collections
            socket.on('deleteuser', (username) => {
                const collection = db.collection('User');
                collection.deleteOne({ name: username }, (err, docs) => {
                    if (err) throw err;
                    console.log("delete from userlist successful")
                })

                const collection2 = db.collection('Group');
                collection2.update({}, { $pull: { members: username } }, () => {
                    console.log("remove username from Group successful")
                })

                const collection3 = db.collection('Channel');
                collection3.update({}, { $pull: { members: username } }, () => {
                    console.log("remove username from Channel successful")
                })
            })
        })



        const groups = io.of('/group');
        groups.on('connection', (socket) => {
            //get group from grouplist
            socket.on('getgroup', (username) => {
                const collection = db.collection('User');
                collection.find({ name: username }).toArray((err, data) => {
                    if (data.super == true) {
                        const collection2 = db.collection('Group');
                        collection2.find({}).toArray((err, data) => {
                            groups.emit('getgroup', JSON.stringify(data));
                        })
                    } else {
                        const collection2 = db.collection('Group');
                        collection2.find({members:username}).toArray((err, data) => {
                            groups.emit('getgroup', JSON.stringify(data));
                        })
                    }
                })
            })

            // add group to grouplist
            socket.on('addgroup', (group) => {
                const collection = db.collection('Group');
                thisgroup = JSON.parse(group);
                collection.insertOne(thisgroup, (err, dbres) => {
                    if (err) throw err;
                    console.log("add group successful")
                })
            })

            socket.on('removegroup', (groupname, username) => {
                //Remove group from Group
                const collection = db.collection('Group');
                collection.deleteOne({ name: groupname }, (err, docs) => {
                    if (err) throw err;
                    console.log("remove group successful")
                })

                //remove group from User
                const collection2 = db.collection('User');
                collection2.update({}, { $pull: { groulist: groupname, admingrouplist: groupname } }, () => {
                    console.log("remove group from User successful")
                })
            })

            //add username to Group members
            socket.on('adduser', (groupname, username) => {
                const collection = db.collection('Group');
                collection.update({ name: groupname }, { $push: { members: username } }, () => {
                    console.log("add member to Group successful")
                })
            })

            socket.on('deluser', (groupname, username) => {
                //delete user from members of Group
                const collection = db.collection('Group');
                collection.update({ name: groupname }, { $pull: { members: username } }, () => {
                    console.log("delete user from members successful")
                })

                //remove groupname of grouplist from User
                const collection2 = db.collection('User');
                collection2.update({ name: username }, { $pull: { grouplist: groupname } }, () => {
                    console.log("remove groupname of grouplist from User successful")
                })
            })

            //Set user to be group assis
            socket.on('addassistogroup', (groupname, assisname) => {
                const collection = db.collection('Group');
                collection.update({ name: groupname }, { $pull: { assis: assisname } }, () => {
                    console.log("add user to assis successful")
                })
            })


            //Return the channel list
            socket.on('getchannel', () => {
                const collection = db.collection('Channel');
                collection.find({}).toArray((err, data) => {
                    groups.emit('getchannel', JSON.stringify(data));
                })
            })

            socket.on('addchannel', (channel) => {
                const collection = db.collection('Channel');
                thischannel = channel;
                collection.insertOne(thischannel, (err, dbres) => {
                    if (err) throw err;
                    console.log("add channel successful")
                })

                const collection2 = db.collection('Group');
                collection2.update({ name: thischannel.group }, { $push: { channels: thischannel.name } }, () => {
                    console.log("add channel to Group successful")
                })
            })

            socket.on('removechannel', (channelname, groupname) => {
                //Remove channel from Channel
                const collection = db.collection('Channel');
                collection.deleteOne({ name: channelname }, (err, docs) => {
                    if (err) throw err;
                    console.log("remove channel successful")
                })

                //Remove channel from Group
                const collection2 = db.collection('Group');
                collection2.update({ name: groupname }, { $pull: { channels: channelname } }, () => {
                    console.log("remove channel from Group successful")
                })
            })

            socket.on('addusertochannel', (username, channelname, groupname) => {
                //Add username to channel
                const collection = db.collection('Channel');
                collection.update({ name: channelname }, { $push: { members: username } }, () => {
                    console.log("add user to Channel successful")
                })
                //Add username to group property
                const collection2 = db.collection('Group');
                collection2.find({ name: groupname, members: username }).count((err, count) => {
                    if (count == 0) {
                        //if no duplicate
                        collection2.update({ name: groupname }, { $push: { members: username } }, () => {
                            console.log("add user to Group successful")
                        })

                        // add groupname to user property
                        const collection3 = db.collection('User');
                        collection3.update({ name: username }, { $push: { grouplist: groupname } }, () => {
                            console.log("add group to user successful")
                        })
                    }
                });
            })

            socket.on('deleteusertochannel', (username, channelname) => {
                const collection = db.collection('Channel');
                collection.update({ name: channelname }, { $pull: { members: username } }, () => {
                    console.log("remove user successful")
                })

            })
        })


        //Chat functions.
        const chat = io.of('/chat');
        chat.on('connection', (socket) => {
            socket.on('message', (message,channelname) => {
                const collection = db.collection('Channel');
                collection.update({ name: channelname }, { $push: { history: message } }, () => {
                    console.log("update history successful")
                })
                for (i = 0; i < socketRoom.length; i++) {
                    if (socketRoom[i][0] == socket.id) {
                        chat.to(socketRoom[i][1]).emit('message', message);
                    }
                }
            });


            socket.on('joinRoom', (room) => {

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
                
            });

            socket.on("leaveroom", (room) => {
                for (let i = 0; i < socketRoom.length; i++) {
                    if (socketRoom[i][0] == socket.id) {
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
