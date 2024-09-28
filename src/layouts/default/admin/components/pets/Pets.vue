<template>
    <v-container>
        <btn-voltar destinationUrl="/admin/apps" label="Voltar"/>
        <h1>Pets teste</h1>
        
        <!-- {{ lista }} -->
    </v-container>
</template>
<script setup>
import api from '@/http';
import BtnVoltar from '../btn_voltar.vue';
import { ref, onMounted, onErrorCaptured } from 'vue'

const lista = ref([])

onMounted(async () => {
    try {
        const response = await api.get('carteiras/pets/')
        lista.value = response.data
    } catch (error) {
        console.error('Error fetching data:', error)
    }
})

onErrorCaptured(error => {
    console.error('Error in component:', error)
})
</script>
