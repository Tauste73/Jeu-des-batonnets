<template>
  <div v-if="gameEncours==true">
    <div>
      <h3>Au tour de : {{tourJoueur}}</h3>
      <h3>Nombre de batonnets restants : {{nbBatonnets}}</h3>
    </div>
    <div>
      <div class="baton" v-for="i in nbBatonnets"></div>
    </div>
    <div>
      <v-btn v-for="i in 3" outline color="primary" @click="jouer(i)" >{{i}}</v-btn>
    </div>
  </div>
  <div v-if="(aGagne==true && gameEncours == false)">
    <h3>Vous avez gagné !</h3>
  </div>
  <div v-if="(aGagne==false && gameEncours == false)">
    <h3>Vous avez perdu !</h3>
  </div>

</template>

<script>

export default {
  name: "GameBatonnet",
  props: ["player", "socket"],

  data() {
    return {
      nbBatonnets: 21,
      gameEncours: true,
      aGagne: false,
      tourJoueur: "",
    };
  },
  created(){
    if(this.player.host == true){
      this.tourJoueur = this.player.username;
    } else {
      this.tourJoueur = this.player.nomEnnemie;
    }
    this.socket.on('play', (joueurEnnemie)=>{

            if(joueurEnnemie.socketId !== this.player.socketId && !joueurEnnemie.turn){

                this.nbBatonnets -= joueurEnnemie.nbBatonJoue;


                if(joueurEnnemie.win){
                    this.gameEncours = false;
                    this.aGagne = false;
                }
                else{
                    this.tourJoueur = this.player.username;

                }
                this.player.turn = true;

            }
            else{
                if(this.player.win){
                    this.gameEncours = false;
                    this.aGagne = true;
                } else{
                    this.tourJoueur = this.player.nomEnnemie;
                }


            }
        })
  },
  methods: {
    jouer(nbButton){
      if(this.player.turn &&  this.nbBatonnets > nbButton){
                this.nbBatonnets -= nbButton;
                this.player.turn = false;
                if(this.nbBatonnets === 1){
                  this.player.win = true;
                }
                this.player.nbBatonJoue = nbButton;
                this.socket.emit('play', this.player);
            }
    }
  }
}

</script>

<style>

.baton {
  width: 50px;
  height: 250px;
  background-color: #8f5e04;
  border-radius: 5%;
  display: inline-block;
  margin: 10px;
}

</style>
