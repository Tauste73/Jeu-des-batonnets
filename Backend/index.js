const {Socket} = require('socket.io');
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const port = 4000;
const cors=require("cors");
app.use(cors());


const io = require('socket.io')(server, {
    
	cors: { 
		origin: ["http://localhost:3000"], 
		methods: ["GET", "POST"],
        	transports: ['websocket', 'polling'],
        	autoConnect: true,
        	pingInterval: 25000, 
        	pingTimeout: 180000, 
	},
	allowEIO3: true,
	
    
  });

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

app.use(function(req, res, next) {
    req.io = io;
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
    });







server.listen(port, () => {
    console.log(`Listening on port ${port}`);
    });


let rooms = [];


io.on('connection', (socket) => {
    console.log('Connexion ' + socket.id);

    socket.on('playerData', (player) => {
        console.log('playerData ' + player.username);

        let room = [];
        if(!player.roomId){
            room = createRoom(player);
            io.emit('listRooms', rooms);
            console.log('room created ' + room.id + ' by ' + player.username);
        }
        else{
            room = rooms.find(room => room.id === player.roomId);
            if(room !== undefined){
                room.players.push(player);
                console.log('player ' + player.username + ' joined room ' + room.id);
            }
        }
        socket.join(room.id);
        io.to(socket.id).emit('joinRoom', room.id);

        if(room.players.length === 2){
            io.to(room.id).emit('startGame', room.players);
        }

    });


    socket.on('getRooms', () => {
        console.log('getRooms');
        io.to(socket.id).emit('listRooms', rooms);
    });

    socket.on('play', (player) => {
        console.log('play ' + player.username);
        io.to(player.roomId).emit('play', player);

    });

    socket.on('disconnectBtn', () => {
        console.log('Déconnexion ' + socket.id);
        let r = null;
        rooms.forEach(room => {
            room.players.forEach((player) => {
                if(player.socketId === socket.id && player.host){
                   r = room;
                   rooms = rooms.filter(room => room !== r);
                }
            });
        });
        io.emit('listRooms', rooms);
    });

    socket.on('disconnect', () => {
        console.log('Déconnexion ' + socket.id);
        let r = null;
        rooms.forEach(room => {
            room.players.forEach((player) => {
                if(player.socketId === socket.id && player.host){
                   r = room;
                   rooms = rooms.filter(room => room !== r);
                }
            });
        });
        io.emit('listRooms', rooms);
    });

});




function createRoom(player){
    const room = {id: roomId(), players: []};
    player.roomId = room.id;
    room.players.push(player);
    rooms.push(room);

    return room;
    
}

function roomId(){
    return Math.random().toString(36).substr(2, 9);
}