<template>
    <v-container>
        <v-card 
            color="background"
            class="text-white pa-1"
            >
            <v-card-title>ADMIN</v-card-title>
            <v-row dense>
                <!-- <pre>{{ lista }}</pre> --> 
                <v-col 
                    :md="3" :lg="3" :cols="12"
                    v-for="(i, k) in lista" :key="`k${k}`"
                >
                    <v-card
                        color="cinza_claro"
                        class="ma-2 text-white" 
                    >
                        <v-card-title>
                            <v-row dense>
                                <v-col cols="12" class="ml-0">
                                    APP: {{ i.app }}
                                </v-col>
                            </v-row>
                        </v-card-title>
                        <v-card-text 
                            class="bordered-card-text ma-3"
                            dense 
                            v-for="(l,j) in i.modulos" 
                            :key="`j${j}`"
                            >
                            <v-row dense class="my-1">
                                <v-col class="text-h6">
                                    {{ l.verbose_name_plural }}
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col class="text-end">
                                    <Form 
                                        v-for="(v, c) in l.actions" 
                                        :key="`c${c}`" 
                                        :item="l" 
                                        :action="v"
                                        :app="i.app"
                                        ></Form>
                                </v-col>
                            </v-row>
                            <v-row>
                                <Teste></Teste>
                            </v-row>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
            <router-view />
        </v-card>
    </v-container>
</template>
<script setup>
    import api from '@/http';
    import { ref, onMounted, onErrorCaptured } from 'vue'
    import Form from '../../../components/Form.vue';
    
    const lista = ref([])
    
    onMounted(async () => {
        try {
            const response = await api.get('contas/list_apps/')
            lista.value = response.data
        } catch (error) {
            console.error('Error fetching data:', error)
        }
    })
    
    onErrorCaptured(error => {
        console.error('Error in component:', error)
    })
</script>
<style>
.my_grey{
    background-color: black;
}
.bordered-card-text {
  border: 1px solid #ccc;
  padding: 10px; /* Opcional, para espaçamento interno */
}
</style>
