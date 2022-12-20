<template>
<div class="fill-height">
  <h1 id="titre">MiniJeux</h1>
  <div id="menu">
    <ul>
      <li><router-link to="/batonnets">Batonnets</router-link></li>
      <li><router-link to="/morpion">Morpion</router-link></li>


    </ul>

  </div>
</div>





</template>


<style>
.fill-height {

min-height: 100%;
min-width: 100%;
background-image: url('../assets/fond_batonnets.jpg');
}
#titre {
  color: rgb(255, 255, 255);
  font-size: 50px;
  text-align: center;
  margin-left: 10px;
  margin-right: 10px;
  background-color: rgba(63, 33, 33, 0.5);
  border-radius: 10px;
}

#menu {

  justify-content: left;
  align-items: left;

  background-color: rgba(63, 33, 33, 0.5);
  border-radius: 10px;
  padding: 10px;
  margin: 10px;
  color: rgb(255, 255, 255);
  font-size: 16px;
  width: 200px;
  height: 200px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  position: absolute;


}

</style>
