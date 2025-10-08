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
