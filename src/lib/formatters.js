// ==========================
// Formata valores monetários
// ==========================
export const formatCurrency = (value) => {
  const num = Number(value)
  if (isNaN(num)) return 'R$ 0,00'
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2
  }).format(num)
}

// ==========================
// Formata CPF: 000.000.000-00
// ==========================
export const formatCPF = (value = '') =>
  value
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1')
    .trim()

// ==========================
// Formata telefone: (99) 99999-9999 ou (99) 9999-9999
// ==========================
export const formatPhone = (value = '') => {
  const digits = value.replace(/\D/g, '')
  if (digits.length <= 10) {
    return digits
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{4})(\d)/, '$1-$2')
      .replace(/(-\d{4})\d+?$/, '$1')
      .trim()
  }
  return digits
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .replace(/(-\d{4})\d+?$/, '$1')
    .trim()
}

// ==========================
// Formata número do cartão: 0000 0000 0000 0000
// ==========================
export const formatCardNumber = (value = '') =>
  value.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 ').trim()
