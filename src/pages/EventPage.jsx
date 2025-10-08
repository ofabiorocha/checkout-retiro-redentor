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
      <div className="max-w-6xl mx-auto flex flex-col gap-6 lg:grid lg:grid-cols-3 lg:gap-8 lg:items-start">

        {/* HERO (vídeo / banner) */}
        <section className="w-full order-1 lg:col-span-3">
          <div className="rounded-2xl overflow-hidden shadow-card">
            <div className="aspect-[16/9] w-full">
              <EventHeader event={EVENT} />
            </div>
          </div>
        </section>

        {/* SELEÇÃO DE INGRESSOS */}
        <section className="order-2 lg:order-2 lg:col-span-2">
          <TicketSelector
            ticketTypes={TICKET_TYPES}
            selectedTickets={selectedTickets}
            onChange={setSelectedTickets}
            error={error}
          />
        </section>

        {/* RESUMO */}
        <aside className="order-3 lg:order-3 lg:col-span-1 lg:self-start">
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
