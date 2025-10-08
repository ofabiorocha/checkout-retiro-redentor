import { useState } from 'react'
import { Check, AlertCircle, Ticket } from 'lucide-react'
import EventHeader from '@/components/EventHeader'
import TicketSelector from '@/components/TicketSelector'
import CheckoutForm from '@/components/CheckoutForm'
import OrderSummary from '@/components/OrderSummary'
import { EVENT, TICKET_TYPES } from '@/lib/constants'
import { createCardCheckout, createPixBoletoCheckout } from "@/lib/api";

export default function EventPage() {
  const [selectedTickets, setSelectedTickets] = useState({})
  const [step, setStep] = useState('tickets') // tickets | checkout | success
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    cpf: '',
    phone: '',
    paymentMethod: 'CREDIT_CARD', // padrão coerente com CheckoutForm
    installments: 1, // default para PIX/BOLETO
  });
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const getTotalTickets = () =>
    Object.values(selectedTickets).reduce((sum, qty) => sum + (qty || 0), 0)

  const handleCheckout = () => {
    if (getTotalTickets() === 0) {
      setError('Selecione pelo menos um ingresso.')
      return
    }
    setError('')
    setStep('checkout')
  }

  // ======== Pagamento ========
  async function handlePay() {
    if (!formData.name || !formData.email || !formData.cpf || !formData.phone) {
      setError("Preencha todos os campos obrigatórios.");
      console.warn("⚠️ Campos obrigatórios faltando:", formData);
      return;
    }

    const items = TICKET_TYPES
      .map(t => ({ ...t, qty: selectedTickets[t.id] || 0 }))
      .filter(t => t.qty > 0)
      .map(t => ({
        productId: t.productId,
        name: t.name,
        unitPrice: t.price,
        qty: t.qty,
      }));

    setLoading(true);
    setError("");

    const log = (...args) => {
      if (process.env.NODE_ENV !== "production") {
        console.log("%c🧾 [Checkout]", "color: #7c3aed; font-weight: bold;", ...args);
      }
    };

    try {
      log("Iniciando pagamento:", {
        method: formData.paymentMethod,
        installments: formData.installments,
        buyer: formData.name,
        items
      });

      if (formData.paymentMethod === "CREDIT_CARD") {
        log("→ Criando checkout de cartão...");
        const { checkoutUrl } = await createCardCheckout({
          buyer: {
            name: formData.name,
            email: formData.email,
            cpf: formData.cpf,
            phone: formData.phone,
          },
          items,
        });

        if (!checkoutUrl) throw new Error("CheckoutUrl não retornado.");
        log("✅ Checkout de cartão criado:", checkoutUrl);
        window.location.href = checkoutUrl;
        return;
      }

      log(`→ Criando cobranças via ${formData.paymentMethod}...`);
      const resp = await createPixBoletoCheckout({
        buyer: {
          name: formData.name,
          email: formData.email,
          cpf: formData.cpf,
          phone: formData.phone,
        },
        items,
        payment: {
          method: formData.paymentMethod,
          installments: formData.installments || 1,
        },
      });

      log("📦 Resposta bruta do backend:", resp);

      // Normaliza formatos de retorno
      let paymentsArray = null;

      if (Array.isArray(resp.payments)) {
        paymentsArray = resp.payments.map(p => ({
          parcela: p.parcela ?? p.numero ?? null,
          link: p.link ?? p.url ?? p.invoiceUrl ?? p.bankSlipUrl ?? null,
          id: p.id ?? null,
        }));
      } else if (Array.isArray(resp.links)) {
        paymentsArray = resp.links.map(p => ({
          parcela: p.numero ?? null,
          link: p.url ?? p.link ?? null,
          id: p.id ?? null,
        }));
      } else if (resp.primeiraParcela && resp.links) {
        paymentsArray = [];
        if (resp.primeiraParcela) {
          paymentsArray.push({
            parcela: resp.primeiraParcela.parcela ?? 1,
            link: resp.primeiraParcela.link ?? resp.primeiraParcela.url ?? null,
            id: resp.primeiraParcela.id ?? null,
          });
        }
        if (Array.isArray(resp.links)) {
          resp.links.forEach((l, i) => paymentsArray.push({
            parcela: l.numero ?? i + 1,
            link: l.url ?? l.link ?? null,
            id: l.id ?? null,
          }));
        }
      } else {
        const possible = [];
        for (const k of Object.keys(resp || {})) {
          const val = resp[k];
          if (val && typeof val === "object") {
            if (val.invoiceUrl || val.bankSlipUrl || val.url || val.link) {
              possible.push({
                parcela: val.parcela ?? null,
                link: val.invoiceUrl ?? val.bankSlipUrl ?? val.url ?? val.link,
                id: val.id ?? null,
              });
            }
          }
        }
        if (possible.length) paymentsArray = possible;
      }

      if (Array.isArray(paymentsArray) && paymentsArray.length > 0) {
        log(`✅ ${paymentsArray.length} cobrança(s) geradas:`, paymentsArray);
        const first = paymentsArray[0];
        if (first.link) {
          log("🔗 Abrindo primeira parcela:", first.link);
          window.open(first.link, "_blank", "noopener");
        }

        const listText = paymentsArray
          .map(p => `Parcela ${p.parcela ?? '?'}: ${p.link ?? 'sem link'}`)
          .join('\n');

        alert(`✅ Foram geradas ${paymentsArray.length} parcela(s):\n\n${listText}`);
      } else {
        log("⚠️ Nenhum link detectado:", resp);
        alert("Cobranças geradas com sucesso (sem links imediatos). Verifique o e-mail informado.");
      }

    } catch (e) {
      console.group("%c💥 Erro no pagamento", "color: red; font-weight: bold;");
      console.error("Mensagem:", e?.message);
      console.error("Detalhes completos:", e);
      console.groupEnd();
      const msg = e?.message || "Erro ao processar pagamento.";
      setError(msg);
    } finally {
      setLoading(false);
      log("🕓 Finalizando fluxo de pagamento");
    }
  }

  const resetAll = () => {
    setSelectedTickets({})
    setFormData({ name: '', email: '', cpf: '', phone: '', paymentMethod: 'CREDIT_CARD', installments: 1 })
    setStep('tickets')
    setError('')
    setLoading(false)
  }

  // ======== Tela de sucesso ========
  if (step === 'success') {
    return (
      <main className="min-h-screen py-12 px-4">
        <section className="max-w-2xl mx-auto bg-white rounded-2xl shadow-card p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Compra Realizada com Sucesso!
          </h2>
          <p className="text-gray-600 mb-8">
            Seus ingressos foram enviados para o e-mail{' '}
            <strong>{formData.email}</strong>.
          </p>

          <div className="bg-brand-50 rounded-lg p-6 mb-8">
            <h3 className="font-semibold text-lg mb-4">{EVENT.name}</h3>
            <div className="space-y-2 text-sm text-gray-700">
              <div className="flex items-center justify-center gap-2">
                <Ticket className="w-4 h-4 text-brand-600" />
                <span>{getTotalTickets()} ingresso(s)</span>
              </div>
            </div>
          </div>

          <button
            onClick={resetAll}
            className="bg-brand-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-brand-700 transition focus:ring-2 focus:ring-brand-400 focus:outline-none"
          >
            Fazer Nova Compra
          </button>
        </section>
      </main>
    )
  }

  // ======== Etapas principais ========
  return (
    <main className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* HERO (vídeo) - à esquerda no desktop */}
        <section className="lg:col-span-2 order-1">
          <EventHeader event={EVENT} />
        </section>

        {/* RESUMO - à direita do HERO */}
        <aside className="lg:col-span-1 order-2 lg:self-start">
          <OrderSummary
            ticketTypes={TICKET_TYPES}
            selectedTickets={selectedTickets}
            onCheckout={handleCheckout}
            onPay={handlePay}
            step={step}
            loading={loading}
          />
        </aside>

        {/* CONTEÚDO PRINCIPAL (tickets/checkout) - abaixo do HERO */}
        <section className="lg:col-span-2 order-3 lg:col-start-1">
          {step === 'tickets' ? (
            <TicketSelector
              ticketTypes={TICKET_TYPES}
              selectedTickets={selectedTickets}
              onChange={setSelectedTickets}
              error={error}
            />
          ) : (
            <>
              <CheckoutForm formData={formData} setFormData={setFormData} />
              {error && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
                  <AlertCircle className="w-5 h-5" />
                  <span>{error}</span>
                </div>
              )}
              <button
                onClick={() => setStep('tickets')}
                className="mt-6 text-brand-600 hover:text-brand-700 font-medium transition focus:underline"
              >
                ← Voltar para seleção de ingressos
              </button>
            </>
          )}
        </section>
      </div>
    </main>
  )

}
