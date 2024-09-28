// store.js
import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counter', {
  state: () => ({ contador: 0 }),
  actions: {
    incrementar() {
      this.contador++;
    }
  }
});