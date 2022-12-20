<template id="batonnets">

  <v-container class="fill-height">
    <v-responsive class="d-flex align-center text-center fill-height">

        <div v-if="top==true" id="top">
          <PresGame :title="title" :rules="rules" />
          <h4>Entrez un pseudo</h4>
          <input id="input" v-model="player.username" placeholder="Pseudo" />
         <div id="middle">
          <div>
            <ListRoom :socket="socket" :player="player"/>
          </div>

          <v-btn id="creerroom" rounded="pill" color="primary" @click="creerroom">Créer une room</v-btn>


         </div>


        </div>
        <div v-if="(top==false && inGame == false)">
          <h4>En attente d'un autre joueur</h4>
          <v-btn color="primary" @click="leaveRoom">Quitter</v-btn>
        </div>
        <GameBatonnets v-if="inGame==true" :player="player" :socket="socket" />

    </v-responsive>
  </v-container>

</template>

<script>
import {ref} from 'vue'
import io from 'socket.io-client';
import PresGame from '@/components/PresGame.vue';
import ListRoom from '@/components/ListRoom.vue';
import GameBatonnets from '@/components/batonnets/GameBatonnet.vue';


export default {
  name: 'Batonnets',
  components: {
    PresGame,
    ListRoom,
    GameBatonnets
  },
  data(){
    return{
      title: "Jeu des batonnets",
      rules: "Le jeu se passe en 1v1. Votre adversaire et vous possédé communément 21 batonnets. Vous allez chacun votre tour retirer 1, 2 ou 3 batonnets. Le joueur qui retire le dernier batonnet perd la partie.",


      top: true,
      inGame: false,
      socket : io('http://localhost:4000', { transports: ['websocket'] }),
      player: {
            host: false,
            roomId : null,
            username : "",
            socketId : null,
            nbBatonJoue: null,
            turn : false,
            win : false,
            nomEnnemie: ""
      },
    }
  },
  created(){
    this.socket.on('connect', function(){
        console.log('connecté au serveur');
      });
    this.socket.emit('getRooms')
    this.socket.on('joinRoom', (roomId) => {
            this.player.roomId = roomId;

        });
    this.socket.on('startGame', players => {
          this.inGame = true;
          this.top = false;
          const joueurEnnemie = players.find(p => p.socketId !== this.player.socketId);
          this.player.nomEnnemie = joueurEnnemie.username;
        });

  },


  methods: {
    creerroom() {
      if(this.player.username != ""){
        this.player.host = true;
        this.player.turn = true;
        this.player.socketId = this.socket.id;
        console.log(this.player);
        this.socket.emit("playerData", this.player);
        this.top = false;
      }
    },
    leaveRoom(){
      this.socket.emit('disconnectBtn', this.player.roomId);
      this.top = true;
      this.inGame = false;
      this.player.roomId = null;
      this.player.host = false;
      this.player.turn = false;
      this.player.nomEnnemie = "";
      this.socket.emit('getRooms')
    }


  }
}



</script>



<style>
  #middle {
    display: flex;
    justify-content: space-around;
  }

  #input {
    width: 200px;
    height: 30px;
    border-radius: 5px;
    border: 1px solid rgb(0, 0, 0);
    padding: 5px;
    margin: 10px;
    color: rgb(0, 0, 0);
    font-size: 16px;

  }




</style>
