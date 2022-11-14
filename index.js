const {Socket} = require('socket.io');
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const port = 3000;

const io = require('socket.io')(server);



app.use('/jquery', express.static(__dirname + '/node_modules/jquery'));

app.use(express.static('templates'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/templates/batonnets.html');
    });


app.get('/batonnets', (req, res) => {
    console.log('batonnets');
    res.sendFile(__dirname + '/templates/batonnets.html');
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