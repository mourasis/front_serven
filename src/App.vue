<template>
  <router-view />
</template>

<script setup>


</script>
<style escope>
/* No seu arquivo main.css ou arquivo de estilos global */
body {
  font-family: 'Jost', sans-serif;
  /* Defina a fonte Jost como a fonte padrão para o corpo do documento */
}

/* Ou, se você desejar definir a fonte Jost apenas para os estilos globais do Vuetify */
.v-application {
  font-family: 'Jost', sans-serif;
  /* Defina a fonte Jost para os estilos globais do Vuetify */
}

.linkGrey {
  color: rgb(90, 90, 90);
}

.bounce-effect {
  animation: bounce 1s;
}

.myS-3 { font-size: 10%;}

.mycursiva {
  font-family: 'Dancing Script', sans-serif;
}

@keyframes bounce {

  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0);
  }

  40% {
    transform: translateY(-30px);
  }

  60% {
    transform: translateY(-15px);
  }
}</style>
