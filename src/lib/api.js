const API = import.meta.env.VITE_API_URL || "http://localhost:4000";
const TOKEN = import.meta.env.TOKEN;


export async function createCardCheckout(payload) {
  const resp = await fetch(`${API}/api/checkout/card?x-vercel-protection-bypass=${encodeURIComponent(TOKEN)}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    
  });
  if (!resp.ok) {
    const err = await resp.json().catch(() => ({}));
    throw new Error(err?.error || "Falha ao criar checkout (cartão)");
  }
  return resp.json(); // { checkoutUrl, holdId }
}

export async function createPixBoletoCheckout(payload) {
  const resp = await fetch(`${API}/api/checkout/pixboleto?x-vercel-protection-bypass=${encodeURIComponent(TOKEN)}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!resp.ok) {
    const err = await resp.json().catch(() => ({}));
    throw new Error(err?.error || "Falha ao gerar cobranças (pix/boleto)");
  }
  return resp.json(); // { payments: [{parcela, id, link}...] }
}
