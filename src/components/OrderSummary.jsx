import { CreditCard } from 'lucide-react'
import { formatCurrency } from '@/lib/formatters'

export default function OrderSummary({
  ticketTypes,
  selectedTickets,
  onCheckout,
  onPay,
  step,
  loading,
  fullHeight = false,
}) {
  const SERVICE_FEE = 0

  const items = ticketTypes
    .map(t => ({ ...t, qty: selectedTickets[t.id] || 0 }))
    .filter(t => t.qty > 0)

  const subtotal = items.reduce((sum, t) => sum + t.price * t.qty, 0)
  const total = subtotal + SERVICE_FEE

  const isTicketStep = step === 'tickets'
  const hasItems = items.length > 0

  return (
    <aside
      className={[
        // aparência do card
        'bg-white rounded-2xl shadow-card p-6',
        // sticky SOMENTE no desktop (no mobile não fica na frente)
        'lg:sticky lg:top-8',
        // quando quiser preencher a coluna no desktop
        fullHeight ? 'lg:h-full lg:flex lg:flex-col' : '',
      ].join(' ')}
    >
      <h3 className="text-xl font-bold mb-4 text-text-primary">
        {isTicketStep ? 'Resumo do Pedido' : 'Confirmação de Pagamento'}
      </h3>

      <div className="space-y-3 mb-4 pb-4 border-b">
        {items.map(t => (
          <div key={t.id} className="flex justify-between text-sm">
            <span>
              {t.qty}× {t.name}
            </span>
            <span className="font-semibold">{formatCurrency(t.price * t.qty)}</span>
          </div>
        ))}

        {!hasItems && (
          <p className="text-sm text-gray-500">Nenhum ingresso selecionado.</p>
        )}
      </div>

      {/* bloco de totais pode crescer para empurrar o botão para a base no desktop */}
      <div className={`space-y-2 mb-6 ${fullHeight ? 'lg:flex-grow' : ''}`}>
        <div className="flex justify-between text-sm">
          <span>Subtotal</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span>Taxa de serviço</span>
          <span>{formatCurrency(SERVICE_FEE)}</span>
        </div>

        <div className="flex justify-between text-lg font-bold pt-2 border-t">
          <span>Total</span>
          <span className="text-brand-600">{formatCurrency(total)}</span>
        </div>
      </div>

      <button
        onClick={isTicketStep ? onCheckout : onPay}
        disabled={isTicketStep ? !hasItems : loading}
        className={[
          'w-full py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2',
          // no layout fullHeight em desktop, encosta o botão na base do card
          fullHeight ? 'lg:mt-auto' : '',
          isTicketStep
            ? hasItems
              ? 'bg-brand-600 hover:bg-brand-700 text-white'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            : loading
            ? 'bg-brand-400 cursor-wait text-white'
            : 'bg-green-600 hover:bg-green-700 text-white',
        ].join(' ')}
      >
        {isTicketStep && !loading && 'Continuar para Pagamento'}

        {!isTicketStep &&
          (loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Processando...
            </>
          ) : (
            <>
              <CreditCard className="w-5 h-5" />
              Finalizar Compra
            </>
          ))}
      </button>

      <p className="text-xs text-gray-500 text-center mt-4">
        Pagamento seguro via <span className="font-semibold text-brand-600">Asaas</span>
      </p>
    </aside>
  )
}
