// ==============================
// Informações do evento
// ==============================
export const EVENT = {
  name: 'Retiro REDENTOR 2026',
  date: '03 a 05 de Abril de 2026',
  location: 'Hotel Fazenda Vintém - Santa Rita do Sapucaí, MG',
  image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=400&fit=crop',
  description: 'Um tempo inesquecível de comunhão com os irmãos e intimidade com Deus.'
}

// ==============================
// Catálogo de ingressos
// ==============================
export const TICKET_TYPES = [
  {
    id: 1,
    name: 'INSCRIÇÃO INDIVIDUAL - RETIRO REDENTOR 2026',
    price: 350.00,
    available: 110,
    description: 'Vaga para adultos e crianças a partir de 5 anos',
    productId: 'EVENTO_2026_INDIVIDUAL'
  },
  // Exemplo de expansão futura:
  // {
  //   id: 2,
  //   name: 'CASAL',
  //   price: 650.00,
  //   available: 30,
  //   description: 'Pacote promocional para casais.',
  //   productId: 'EVENTO_2026_CASAL'
  // },
]

// ==============================
// Utilitário genérico
// ==============================
export function getProductIdByTicketName(ticketName) {
  const ticket = TICKET_TYPES.find(t => t.name === ticketName)
  return ticket ? ticket.productId : null
}
