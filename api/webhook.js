// /api/webhook.js
// Recebe notificações do Mercado Pago e manda e-mail via Resend
export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(200).json({ ok: true });
  try {
    const event = req.body;
    // Aqui você poderia consultar o pagamento no MP usando o ID recebido.
    // Para simplicidade, apenas registra e envia e-mail se disponível.
    console.log("Webhook MP:", JSON.stringify(event));

    // Email via Resend
    if (process.env.RESEND_API_KEY && process.env.STORE_EMAIL) {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          from: "HC Multimarcas <loja@hcmultimarcas.com>",
          to: [process.env.STORE_EMAIL],
          subject: "Novo pagamento - HC Multimarcas",
          html: `<p>Temos uma atualização de pagamento do Mercado Pago:</p><pre>${escapeHtml(JSON.stringify(event, null, 2))}</pre>`
        })
      });
    }

    res.status(200).json({ ok: true });
  } catch (e) {
    console.error(e);
    res.status(200).json({ ok: true });
  }
}

function escapeHtml(str=""){
  return str.replace(/[&<>"']/g, s => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",""":"&quot;","'":"&#039;"
  })[s]);
}
