// src/stores/statusModalStore.js
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useStatusModalStore = defineStore('statusModal', () => {
  const isVisible = ref(false);
  const message = ref('');

  const showModal = (statusMessage) => {
    message.value = statusMessage;
    isVisible.value = true;
  };

  const closeModal = () => {
    isVisible.value = false;
  };

  return {
    isVisible,
    message,
    showModal,
    closeModal,
  };
});
