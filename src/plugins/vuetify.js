/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify , } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  components: {
  },
  theme: {
    themes: {
      light: {
        colors: {
          primary: '#1867C0',
          secondary: '#5CBBF6',
          background: '#F5F5F5',
          cinza_claro: '#808080',
          cinza_escuro: '#606060',     
          azul_marinho: '#003366',
          laranja: '#FFA500',
          my_green_1: '#0097b2',
          my_green_2: '#319177',
          my_green_3: '#6EAEA1',
        },
      },
    },
  },
})
