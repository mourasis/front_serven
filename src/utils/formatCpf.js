export function formatCPF(cpf) {
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
  