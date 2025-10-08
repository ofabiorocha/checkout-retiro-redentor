import { formatCurrency } from '@/lib/formatters'

export default function OrderSummary({
  ticketTypes,
  selectedTickets,
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
  const hasItems = items.length > 0

  // Links fixos do Asaas
  const PAYMENT_LINKS = {
    1: "https://www.asaas.com/c/9y5k1l9kay36o840",
    2: "https://www.asaas.com/c/ekyc2z38r6pblaoy",
    3: "https://www.asaas.com/c/927vhdzzczouxhc7",
    4: "https://www.asaas.com/c/hsdl4tact0ns3xt7",
    5: "https://www.asaas.com/c/a6urkoxk4hi83f5j",
  }

  const handleRedirect = () => {
    const totalTickets = items.reduce((sum, t) => sum + t.qty, 0)
    const link = PAYMENT_LINKS[totalTickets]
    if (!link) {
      alert("Selecione entre 1 e 5 inscrições para continuar.")
      return
    }
    window.location.href = link
  }

  return (
    <aside
      className={[
        'bg-white rounded-2xl shadow-card p-6',
        'lg:sticky lg:top-8',
        fullHeight ? 'lg:h-full lg:flex lg:flex-col' : '',
      ].join(' ')}
    >
      <h3 className="text-xl font-bold mb-4 text-text-primary">
        Resumo do Pedido
      </h3>

      <div className="space-y-3 mb-4 pb-4 border-b">
        {items.map(t => (
          <div key={t.id} className="flex justify-between text-sm">
            <span>{t.qty}× {t.name}</span>
            <span className="font-semibold">{formatCurrency(t.price * t.qty)}</span>
          </div>
        ))}

        {!hasItems && (
          <p className="text-sm text-gray-500">
            Nenhum ingresso selecionado.
          </p>
        )}
      </div>

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
        onClick={handleRedirect}
        disabled={!hasItems || loading}
        className={[
          'w-full py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2',
          fullHeight ? 'lg:mt-auto' : '',
          hasItems
            ? 'bg-brand-600 hover:bg-brand-700 text-white'
            : 'bg-gray-200 text-gray-500 cursor-not-allowed',
        ].join(' ')}
      >
        {loading ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Processando...
          </>
        ) : (
          'Continuar para Pagamento'
        )}
      </button>

      <p className="text-xs text-gray-500 text-center mt-4">
        Pagamento seguro via <span className="font-semibold text-brand-600">Asaas</span>
      </p>
    </aside>
  )
}
