# HC Multimarcas – Pagamentos Reais (Mercado Pago)

Projeto pronto para deploy na **Vercel** com:
- Checkout Pro do **Mercado Pago** (Pix + Cartão)
- **GA4** e **Meta Pixel**
- Webhook + e-mail via **Resend**
- Páginas estáticas (index, pagamento, obrigado)

## Como usar

1. **Crie as chaves** no Mercado Pago (conta de vendedor):
   - `MP_ACCESS_TOKEN` (server, começar com `APP_USR-...`)
   - `MP_PUBLIC_KEY` (client) – não é usado no Checkout Pro, mas guarde.

2. **Crie conta no Resend** e pegue `RESEND_API_KEY` (opcional).
   - Defina também `STORE_EMAIL` (para onde enviar notificações).

3. **IDs de Analytics**:
   - `GA_MEASUREMENT_ID` (ex: `G-XXXXXXX`)
   - `FB_PIXEL_ID`

4. **Deploy** (Vercel):
   - Importar este repositório no Vercel
   - Em **Settings → Environment Variables** adicione:
     - `MP_ACCESS_TOKEN`, `RESEND_API_KEY` (opcional), `STORE_EMAIL` (opcional)
   - Em **Domains**, configure seu domínio se tiver.
   - Faça o deploy.

5. **Webhook no Mercado Pago** (em *Notificações*):
   - URL: `https://SEU_DOMINIO/api/webhook`
   - Eventos: `payment`

6. **Editar IDs nos HTMLs**:
   - Substituir `GA_MEASUREMENT_ID` e `FB_PIXEL_ID` nos arquivos `index.html` e `pagamento.html`.

## Teste

- Adicione produtos no `index.html` → “Finalizar compra” → `pagamento.html` → clique **Pagar com Mercado Pago**.  
- Você será redirecionado ao **Checkout Pro** (ambiente de teste, se a conta estiver como sandbox).  
- Após pagar, retornará para `thanks.html` com o status.  

## Observações
- O carrinho é salvo no `localStorage`. A cada atualização de versão, limpamos os dados para ficar “site novo”.
- Para Pix/Cartão **sem backend** não é possível – por isso usamos o Checkout Pro via API no servidor (Vercel).

---

Qualquer dúvida, abra o `pagamento.html` e ajuste o corpo do `fetch('/api/create_preference')` (back_urls, itens, payer). Boa venda! ✨
