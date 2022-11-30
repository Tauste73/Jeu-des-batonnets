<template>
  <div>
    <h3>Liste des rooms disponibles</h3>
    <ul>
              <li v-for="item in items">
                <p>Room de {{item.players[0].username}}</p>
                <v-btn color="primary" @click="joinRoom(item.id)">Rejoindre</v-btn>
              </li>
    </ul>

  </div>


</template>

<script>
export default {
  props: ['socket', 'player'],
  data(){
    return{
      items : []
    }
  },
  created(){
    this.socket.on('listRooms',(rooms)=>{
    this.items = []

    if(rooms.length > 0){

      rooms.forEach(room => {
        if(room.players.length < 2){
          this.items.push(room)

          console.log(this.items)
        }


      });

  }

  })

  },
  methods: {
    joinRoom(roomId){
      if(this.player.username != ""){
        this.player.socketId = this.socket.id;
        this.player.roomId = roomId;
        this.socket.emit('playerData', this.player);
      }
}

  }
}

</script>
