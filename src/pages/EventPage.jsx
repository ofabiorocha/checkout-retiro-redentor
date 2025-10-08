import { useState } from 'react'
import { Check, Ticket } from 'lucide-react'
import EventHeader from '@/components/EventHeader'
import TicketSelector from '@/components/TicketSelector'
import OrderSummary from '@/components/OrderSummary'
import { EVENT, TICKET_TYPES } from '@/lib/constants'

export default function EventPage() {
  const [selectedTickets, setSelectedTickets] = useState({})
  const [error, setError] = useState('')

  const getTotalTickets = () =>
    Object.values(selectedTickets).reduce((sum, qty) => sum + (qty || 0), 0)

  const resetAll = () => {
    setSelectedTickets({})
    setError('')
  }

  return (
    <main className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

        {/* HERO (vídeo) */}
        <section className="lg:col-span-2 order-1">
          <EventHeader event={EVENT} />
        </section>

        {/* SELEÇÃO DE INGRESSOS */}
        <section className="lg:col-span-2 order-2 lg:order-2 lg:col-start-1">
          <TicketSelector
            ticketTypes={TICKET_TYPES}
            selectedTickets={selectedTickets}
            onChange={setSelectedTickets}
            error={error}
          />
        </section>

        {/* RESUMO */}
        <aside className="lg:col-span-1 order-3 lg:order-3 lg:self-start">
          <OrderSummary
            ticketTypes={TICKET_TYPES}
            selectedTickets={selectedTickets}
            step="tickets"
            loading={false}
          />
        </aside>
      </div>
    </main>
  )
}
