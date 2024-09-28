<template>
  <div class="ma-0 pa-0">
    <v-container fluid class="py-6">
      <!-- Component -->
      <menu-horizontal />
      <!--  -->
    <router-view />
    </v-container>
    <v-container fluid class="">
      <v-row class="ma-4">
        <v-col>
          <v-card  height="210">
            <v-card-title>Pintura em Tela ART BR</v-card-title>
            <v-card-text>
             Av do Fio, 3, qudra C, Cohabiano 2, São José de Ribamar - MA, 65110-000
              <br>
              Telefone: +55 98 98482-4763
              <p><v-icon icon="mdi-whatsapp"></v-icon> +55 98 98482-4763</p>
              <p><v-icon icon="mdi-email-outline"></v-icon> sac@pinturaemtela.art.br</p>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col>
          <v-card height="210">
            <v-card-title>Horários</v-card-title>
            <v-card-text>
              segunda-feira	08:00–12:00, 14:00–18:00 <br>   
              terça-feira	08:00–12:00, 14:00–18:00<br>
              quarta-feira	08:00–12:00, 14:00–18:00<br>
              sexta-feira	08:00–12:00, 14:00–18:00<br>
              quinta-feira	08:00–12:00, 14:00–18:00<br>
              sábado	08:00–18:00<br>
              domingo	Encerrado
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
  import MenuHorizontal from './MenuHorizontal.vue'
  import { ref } from 'vue'

  const mis_vis_val = ref([
    {icon:'mdi-post',titulo:'Anúncios',mensagem:'Texto de mensagem padrão.',
    links:['link 1', 'link 2', 'link 3']},
    {icon:'mdi-paw',titulo:'Serviços',mensagem:'Texto de mensagem padrão.',
    links:['link 1', 'link 2', 'link 3']},
    {icon:'mdi-share-variant',titulo:'Anúncios',mensagem:'Texto de mensagem padrão.',
    links:['link 1', 'link 2', 'link 3']},
  ])

 
</script>
<style scoped>
.mygrey {
  /* Estilos personalizados */
  background-color: rgb(231, 230, 230);
}

.mygreen {
  /* Estilos personalizados */
  background-color: rgb(16, 75, 38);
}

.mygrey-2 {
  /* Estilos personalizados */
  background-color: rgba(188, 185, 185, 0.8);
  padding: 20px;
  margin-bottom: 10px;
}

.mywhite {
  height: 150px;
  margin-left: 20px;
  padding: 20px;
  color: rgb(255, 255, 255);
  font-size: 3em;
  font-weight: bolder;
}

.mywhite2 {
  height: 150px;
  color: rgb(255, 255, 255);
  font-size: 3.5em;
  font-weight: bolder;
}

.linkWhite {
  color: rgb(255, 255, 255);
}
</style>