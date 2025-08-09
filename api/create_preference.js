// /api/create_preference.js
// Vercel serverless function
import mercadopago from "mercadopago";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  try {
    const { items, payer, back_urls } = req.body || {};
    if (!process.env.MP_ACCESS_TOKEN) {
      return res.status(500).json({ error: "MP_ACCESS_TOKEN não configurado" });
    }
    mercadopago.configure({ access_token: process.env.MP_ACCESS_TOKEN });

    const preference = {
      items: (items || []).map(i => ({
        title: String(i.title).slice(0, 250),
        quantity: Number(i.quantity) || 1,
        unit_price: Number(i.unit_price) || 0
      })),
      payer: payer || {},
      back_urls: back_urls || {},
      auto_return: "approved",
      payment_methods: {
        excluded_payment_types: [],
        installments: 12,
        default_payment_method_id: null
      },
      statement_descriptor: "HC MULTIMARCAS"
    };

    const result = await mercadopago.preferences.create(preference);
    res.status(200).json(result.body);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Falha ao criar preferência" });
  }
}
