



<template>

  <v-container class="fill-height">
    <v-responsive class="d-flex align-center text-center fill-height">

        <div v-if="top==true" id="top">
          <PresGame />
          <h4>Entrez un pseudo</h4>
          <input v-model="player.username" placeholder="Pseudo" />
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


  }
}



</script>



<style>
  #middle {
    display: flex;
    justify-content: space-around;
  }

</style>
