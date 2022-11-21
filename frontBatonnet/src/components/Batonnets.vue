<template>

  <v-container class="fill-height">
    <v-responsive class="d-flex align-center text-center fill-height">

        <div id="top">
          <h1>Jeu des batonnets</h1>
          <p><strong>Règle : </strong>Le jeu se passe en 1v1. Votre adversaire et vous possédé communément 21 batonnets. Vous allez chacun votre tour retirer 1, 2 ou 3 batonnets. Le joueur qui retire le dernier batonnet perd la partie.</p>
          <h4>Entrez un pseudo</h4>
          <v-text-field
            id="pseudo"
            v-model="pseudo"
            label="Pseudo"
            required


              ></v-text-field>
         <div id="middle">
          <div>
            <h3>Liste des rooms disponibles</h3>
            <v-list lines="one">
                <v-list-item
                  v-for="item in items"
                  :key="item.title"
                  :title="item.title"
                  subtitle="..."
                ></v-list-item>
              </v-list>
          </div>

          <v-btn id="creerroom" rounded="pill" color="primary" v-on:click.stop="creerroom()">Créer une room</v-btn>


         </div>

        </div>

    </v-responsive>
  </v-container>

</template>

<script>

const player = {
            host: false,
            roomId : null,
            username : "",
            socketId : "",
            nbBatonJoue: null,
            turn : false,
            win : false,
        }
//socket
import io from 'socket.io-client';
const socket = io('http://localhost:4000', { transports: ['websocket'] });


var top = document.getElementById("top");

var username = document.getElementById("pseudo");


socket.on('connect', function(){
  console.log('connecté au serveur');
});

socket.emit('getRooms')
socket.on('listRooms',(rooms)=>{

  if(rooms.length > 0){

    rooms.forEach(room => {
      if(room.players.length < 2){
        this.items.push(room)
      }


    });

  }

})


  function creerroom() {
            player.username = username
            player.host = true;
            player.turn = true;
            player.socketId = socket.id;
            console.log(player);
            top.style.display = "none";
            socket.emit("playerData", player);
        }








</script>

<style>
  #middle {
    display: flex;
    justify-content: space-around;
  }

</style>
