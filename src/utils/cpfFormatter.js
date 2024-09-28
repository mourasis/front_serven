// src/composables/useCPF.js
import { ref, computed } from 'vue';

export function useCPF() {
  const cpf = ref('');

  const formattedCPF = computed({
    get() {
      return formatCPF(cpf.value);
    },
    set(value) {
      cpf.value = value.replace(/\D/g, ''); // Remove a máscara ao definir
    }
  });

  function formatCPF(cpf) {
    // Remove qualquer caractere não numérico
    cpf = cpf.replace(/\D/g, '');

    // Aplica a máscara
    if (cpf.length <= 3) {
      return cpf;
    }
    if (cpf.length <= 6) {
      return cpf.replace(/(\d{3})(\d)/, '$1.$2');
    }
    if (cpf.length <= 9) {
      return cpf.replace(/(\d{3})(\d{3})(\d)/, '$1.$2.$3');
    }
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
  }

  function updateCPF(event) {
    formattedCPF.value = event.target.value;
  }

  return {
    cpf,
    formattedCPF,
    updateCPF
  };
}
