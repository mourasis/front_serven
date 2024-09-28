<!-- DynamicCard.vue -->
<template>
    <v-row dense>
      <v-col dense cols="2">
        <v-card class="ma-2" variant="flat" :to="destinationUrl">
          <v-icon color="my_green_3" class="ma-2">mdi-arrow-left</v-icon>
          {{ label }}
        </v-card>
      </v-col>
    </v-row>
  </template>
  
  <script>
  export default {
    name: "BtnVoltar",
    props: {
      destinationUrl: {
        type: String,
        required: true,
      },
      label: {
        type: String,
        required: true,
      },
    },
  };
  </script>
  