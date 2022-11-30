<template>
  <div>
    <h1>{{title}}</h1>
          <p><strong>Règle : </strong>{{rules}}</p>

  </div>


</template>

<script>
export default {
  data(){
    return {
      title: "Jeu des batonnets",
      rules: "Le jeu se passe en 1v1. Votre adversaire et vous possédé communément 21 batonnets. Vous allez chacun votre tour retirer 1, 2 ou 3 batonnets. Le joueur qui retire le dernier batonnet perd la partie."
    }
  }
}


</script>
