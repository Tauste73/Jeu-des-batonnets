<template>
  <v-container class="fill-height">
    <v-responsive class="d-flex align-center text-center fill-height">

      <div v-if="top==true" id="top">
          <PresGame :title="title" :rules="rules" />
          <h4>Entrez un pseudo</h4>
          <input id="input"  placeholder="Pseudo" />
         <div id="middle">
          <div>

          </div>

          <v-btn id="creerroom" rounded="pill" color="primary" @click="creerroom">Créer une room</v-btn>


         </div>


        </div>



    </v-responsive>
  </v-container>
</template>


<script>
import PresGame from '@/components/PresGame.vue';

export default {
  name: "Morpion",

  components: {
    PresGame,
  },
  data(){
    return{
      title: "Morpion",
      rules: "Le but est d'aligné 3 pions de la même couleur",
      top: true,

    }
  },
  methods: {
  }
}


</script>
