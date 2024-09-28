<template>
    <div class="not-found">
      <h1>404 - Página não encontrada</h1>
      <p>Desculpe, a página que você está tentando acessar não existe.</p>
      <router-link to="/">Voltar para a página inicial</router-link>
    </div>
  </template>
  
  <script>
  export default {
    name: 'NotFoundView',
  };
  </script>
  
  <style scoped>
  .not-found {
    text-align: center;
    margin-top: 50px;
  }
  </style>