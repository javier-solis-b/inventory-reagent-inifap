
<template>
  <div class="home">
    <div class="row">
      <div class="col-lg-6">
        <div class="img-cont text-center text-lg-start">
          <br />
          <img alt="Vue logo" src="../assets/img/Inifap_logos.png" />
          <br />
          <h2 class="bienvenida text-center text-lg-start">
            Bienvenido al Sistema de Gestión de Inventario de Reactivos y
            Soluciones (SIGIRES)
          </h2>
        </div>
      </div>
      <div class="col-lg-6">
       <CardComp class="mx-auto  card-comp"/>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import CardComp from "../components/CardComp.vue";

export default {
  name: "HomeView",
  components: {
    HelloWorld,
    CardComp,
  },
};
</script>

<style scoped>
.home {
  max-width: 895px;
  margin: auto;
}

.card-comp{
  max-width: 398px;
  margin-top: 2.6em;
}

 .img-cont{
  display: flex;
  flex-direction: column;
 }

 img{
  max-width: 315px;
  margin:1em auto 0 auto;
 }

 .bienvenida{
  max-width: 315px;
  margin:1em auto 0 auto;
 }
</style>
