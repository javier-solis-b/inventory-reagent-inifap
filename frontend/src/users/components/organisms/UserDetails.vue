<template>
  <v-card class="elevation-0 pt-4">
    <div class="d-flex" style="justify-content: center">
      <div
        style="
          width: 150px;
          height: 150px;
          background: gray;
          border-radius: 50%;
          background-image: url('./user.png');
          background-size: contain;
        "
      ></div>
    </div>
    <v-card-title class="text-center" style="padding: 0">
      {{ user.name ?? ''}}
    </v-card-title>
    <v-card-actions>
      <v-row>
        <v-col cols="6">
          <v-btn style="width: 100%"> Eliminar </v-btn>
        </v-col>
        <v-col cols="6">
          <v-btn style="width: 100%"> Editar </v-btn>
        </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script>

export default {
  props: {
    user: Object
  }
};

</script>