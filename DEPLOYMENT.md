# 🚀 Guia de Deploy - Prep-se

## Opções de Deploy

### 1. Vercel (Recomendado)

**Vantagens:**
- Deploy automático via Git
- Integração nativa com Next.js
- CDN global
- SSL automático
- Variáveis de ambiente fáceis

**Passos:**

1. **Conectar repositório**
   - Acesse [vercel.com](https://vercel.com)
   - Conecte sua conta GitHub/GitLab
   - Importe o projeto

2. **Configurar variáveis de ambiente**
   ```bash
   # No dashboard da Vercel, vá em Settings → Environment Variables
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
   NEXT_PUBLIC_CALCOM_URL=https://cal.com/prepse/consulta
   NEXT_PUBLIC_TALLY_FORM_URL=https://tally.so/r/...
   NEXT_PUBLIC_APP_BASE_URL=https://seu-dominio.vercel.app
   HUBSPOT_API_KEY=pat-na1-...
   STRIPE_SECRET_KEY=sk_test_...
   STRIPE_PRICE_ID=price_...
   NEXTAUTH_SECRET=seu-secret-aqui
   NEXTAUTH_URL=https://seu-dominio.vercel.app
   ```

3. **Deploy automático**
   - Push para main branch
   - Deploy automático acontece

### 2. Netlify

**Passos:**

1. **Build settings**
   ```bash
   Build command: npm run build
   Publish directory: .next
   ```

2. **Variáveis de ambiente**
   - Configure no dashboard da Netlify
   - Mesmas variáveis da Vercel

### 3. Railway

**Passos:**

1. **Conectar repositório**
2. **Configurar variáveis**
3. **Deploy automático**

### 4. Servidor Próprio (VPS/Docker)

**Dockerfile:**
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

**docker-compose.yml:**
```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - HUBSPOT_API_KEY=${HUBSPOT_API_KEY}
      - STRIPE_SECRET_KEY=${STRIPE_SECRET_KEY}
      # ... outras variáveis
```

## 🔧 Configuração Pós-Deploy

### 1. Webhooks

**Stripe Webhook:**
- URL: `https://seu-dominio.com/api/webhooks/stripe`
- Eventos: `checkout.session.completed`, `payment_intent.succeeded`

**Cal.com Webhook:**
- URL: `https://seu-dominio.com/api/webhooks/cal`
- Eventos: `BOOKING_CREATED`, `BOOKING_CANCELLED`

**Tally Webhook:**
- URL: `https://seu-dominio.com/api/webhooks/tally`
- Eventos: `FORM_RESPONSE`

### 2. Domínio Personalizado

**Vercel:**
1. Settings → Domains
2. Adicionar domínio
3. Configurar DNS

**Netlify:**
1. Domain settings
2. Add custom domain
3. Configure DNS

### 3. SSL/HTTPS

- **Vercel/Netlify**: Automático
- **Servidor próprio**: Use Let's Encrypt

### 4. Monitoramento

**Logs:**
- Vercel: Dashboard → Functions → Logs
- Netlify: Functions → Logs
- Servidor: PM2 logs

**Métricas:**
- Google Analytics
- Vercel Analytics
- Sentry (erros)

## 🔒 Segurança

### 1. Variáveis de Ambiente
- Nunca commite chaves no Git
- Use diferentes chaves para dev/prod
- Rotacione chaves regularmente

### 2. Webhooks
- Sempre verifique assinaturas
- Use HTTPS
- Valide payloads

### 3. Rate Limiting
```javascript
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Implementar rate limiting
  return NextResponse.next()
}
```

## 📊 Performance

### 1. Otimizações
- Imagens: Next.js Image
- Fonts: Next.js Font
- Bundle: Analyze bundle size

### 2. CDN
- Vercel: Automático
- Netlify: Automático
- Servidor: CloudFlare

### 3. Caching
```javascript
// next.config.mjs
export default {
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Cache-Control', value: 'no-store' }
        ]
      }
    ]
  }
}
```

## 🧪 Testes Pós-Deploy

### 1. Checklist
- [ ] Página inicial carrega
- [ ] Formulário HubSpot funciona
- [ ] Cal.com embed carrega
- [ ] Stripe checkout funciona
- [ ] Webhooks respondem
- [ ] Mobile responsivo
- [ ] Performance OK

### 2. Testes de Integração
```bash
# Testar APIs
curl -X POST https://seu-dominio.com/api/hubspot/create-contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","consent":true}'
```

### 3. Monitoramento
- Uptime: UptimeRobot
- Performance: Google PageSpeed
- Erros: Sentry

## 🚨 Troubleshooting

### Erro: "Module not found"
- Verificar se todas as dependências estão no package.json
- Reinstalar node_modules

### Erro: "Environment variable not found"
- Verificar se variáveis estão configuradas
- Reiniciar aplicação

### Erro: "Webhook signature invalid"
- Verificar secret do webhook
- Confirmar URL do webhook

### Performance lenta
- Verificar bundle size
- Otimizar imagens
- Usar CDN

## 📞 Suporte

**Em caso de problemas:**
1. Verificar logs
2. Testar localmente
3. Consultar documentação
4. Contatar suporte da plataforma

---

**Deploy bem-sucedido! 🎉**
