import { CreditCard } from 'lucide-react'
import { formatCPF, formatPhone } from '@/lib/formatters'

export default function CheckoutForm({ formData, setFormData }) {
  // Quando o usuário trocar a forma de pagamento, normaliza installments
  function handlePaymentChange(value) {
    // Cartão: não mostramos select de parcelas aqui (parcelamento do cartão é tratado pelo hosted checkout)
    if (value === "CREDIT_CARD") {
      setFormData({ ...formData, paymentMethod: value, installments: undefined })
      return
    }

    // PIX / BOLETO: se não existir installments, default pra 1
    setFormData({ ...formData, paymentMethod: value, installments: formData.installments ?? 1 })
  }

  return (
    <section className="bg-white rounded-2xl shadow-card p-6">
      <h2 className="text-2xl font-bold mb-6 text-text-primary">Dados do Comprador</h2>

      <div className="space-y-4 mb-6">
        {/* Nome */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            Nome Completo <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            type="text"
            value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
            required
            aria-required="true"
            placeholder="João Silva"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
          />
        </div>

        {/* E-mail */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            E-mail <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={e => setFormData({ ...formData, email: e.target.value })}
            required
            aria-required="true"
            placeholder="joao@email.com"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
          />
        </div>

        {/* CPF e telefone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="cpf" className="block text-sm font-medium mb-2">
              CPF <span className="text-red-500">*</span>
            </label>
            <input
              id="cpf"
              type="text"
              value={formData.cpf}
              onChange={e => setFormData({ ...formData, cpf: formatCPF(e.target.value) })}
              placeholder="000.000.000-00"
              maxLength={14}
              required
              aria-required="true"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-2">
              Telefone <span className="text-red-500">*</span>
            </label>
            <input
              id="phone"
              type="text"
              value={formData.phone}
              onChange={e => setFormData({ ...formData, phone: formatPhone(e.target.value) })}
              placeholder="(00) 00000-0000"
              maxLength={15}
              required
              aria-required="true"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* ===== Forma de Pagamento ===== */}
      <h3 className="text-xl font-bold mb-4">Forma de Pagamento</h3>
      <div className="space-y-3 mb-2">
        <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:border-purple-300">
          <input
            type="radio"
            name="payment"
            value="CREDIT_CARD"
            checked={formData.paymentMethod === "CREDIT_CARD"}
            onChange={(e) => handlePaymentChange(e.target.value)}
            className="w-4 h-4"
            aria-checked={formData.paymentMethod === "CREDIT_CARD"}
          />
          <span className="font-medium">Cartão de crédito (parcelado com juros)</span>
        </label>

        <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:border-purple-300">
          <input
            type="radio"
            name="payment"
            value="PIX"
            checked={formData.paymentMethod === "PIX"}
            onChange={(e) => handlePaymentChange(e.target.value)}
            className="w-4 h-4"
            aria-checked={formData.paymentMethod === "PIX"}
          />
          <span className="font-medium">PIX (até 6x sem juros — gera N cobranças)</span>
        </label>

        <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:border-purple-300">
          <input
            type="radio"
            name="payment"
            value="BOLETO"
            checked={formData.paymentMethod === "BOLETO"}
            onChange={(e) => handlePaymentChange(e.target.value)}
            className="w-4 h-4"
            aria-checked={formData.paymentMethod === "BOLETO"}
          />
          <span className="font-medium">Boleto (até 6x sem juros — gera N boletos)</span>
        </label>
      </div>

      {/* Select de parcelas — aparece só para PIX ou BOLETO */}
      {(formData.paymentMethod === "PIX" || formData.paymentMethod === "BOLETO") && (
        <div className="mt-4">
          <label htmlFor="installments" className="block text-sm font-medium mb-2">Parcelas</label>
          <select
            id="installments"
            value={formData.installments ?? 1}
            onChange={(e) => setFormData({ ...formData, installments: Number(e.target.value) })}
            className="w-32 px-3 py-2 border rounded-lg"
            aria-label="Número de parcelas (PIX/Boleto)"
          >
            {/* 1 até 6 */}
            {[1, 2, 3, 4, 5, 6].map(n => (
              <option key={n} value={n}>{n}x</option>
            ))}
          </select>
          <p className="text-xs text-gray-500 mt-1">Parcelamento sem juros — cada parcela será uma cobrança separada.</p>
        </div>
      )}

      {/* Asaas cuida do fluxo de pagamento */}
    </section>
  )
}
