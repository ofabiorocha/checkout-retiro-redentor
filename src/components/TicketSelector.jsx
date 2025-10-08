import { Users } from 'lucide-react'
import { formatCurrency } from '@/lib/formatters'

export default function TicketSelector({ ticketTypes, selectedTickets, onChange, error }) {
  const MAX_TICKETS = 5
  const MIN_TICKETS = 0

  const handleTicketChange = (ticketId, newQty) => {
    const safeQty = Math.max(MIN_TICKETS, Math.min(MAX_TICKETS, newQty))
    onChange({ ...selectedTickets, [ticketId]: safeQty })
  }

  return (
    <section className="bg-white rounded-2xl shadow-card p-6">
      <h2 className="text-2xl font-bold mb-6 text-text-primary">
        Selecione seus ingressos
      </h2>

      <div className="space-y-5">
        {ticketTypes.map(ticket => {
          const quantity = selectedTickets[ticket.id] || 0
          const isMinusDisabled = quantity <= MIN_TICKETS
          const isPlusDisabled = quantity >= MAX_TICKETS

          return (
            <div
              key={ticket.id}
              className="border border-gray-200 rounded-xl p-4 hover:border-brand-300 focus-within:border-brand-400 transition-colors"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">{ticket.name}</h3>
                  <p className="text-sm text-gray-600">{ticket.description}</p>
                  <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                    <Users className="w-3 h-3 text-brand-500" /> {ticket.available} disponíveis
                  </p>
                </div>

                <p className="text-2xl font-bold text-brand-600">
                  {formatCurrency(ticket.price)}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600">Quantidade:</span>
                <div className="flex items-center gap-2">
                  <button
                    aria-label={`Diminuir ${ticket.name}`}
                    disabled={isMinusDisabled}
                    onClick={() => handleTicketChange(ticket.id, quantity - 1)}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold transition
                      ${isMinusDisabled
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-800'}`}
                  >
                    −
                  </button>

                  <span className="w-12 text-center font-semibold">{quantity}</span>

                  <button
                    aria-label={`Aumentar ${ticket.name}`}
                    disabled={isPlusDisabled}
                    onClick={() => handleTicketChange(ticket.id, quantity + 1)}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold transition
                      ${isPlusDisabled
                        ? 'bg-brand-200 text-white/80 cursor-not-allowed'
                        : 'bg-brand-600 hover:bg-brand-700 text-white'}`}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {error && (
        <div className="mt-5 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      <p className="text-xs text-gray-500 text-center mt-6">
        Máximo de <span className="font-semibold">{MAX_TICKETS}</span> inscrições por compra
      </p>
    </section>
  )
}
