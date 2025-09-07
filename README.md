# Prep-se - Web App

Um web-app responsivo para a Prep-se que facilita o processo de consultas médicas online com integração completa de pagamentos, agendamento e acompanhamento da jornada do paciente.

## 🚀 Funcionalidades

- **Jornada Gamificada**: Timeline interativa com 6 etapas do processo
- **Integração HubSpot**: Captura e sincronização de leads
- **Agendamento Cal.com**: Sistema de agendamento integrado
- **Pagamento Stripe**: Processamento seguro de pagamentos
- **Formulário Tally**: Cadastro clínico com redirecionamento
- **Webhooks**: Atualização automática do progresso
- **Design Responsivo**: Mobile-first com dark mode
- **Micro-interações**: Animações e feedback visual

## 🛠️ Tecnologias

- **Next.js 14** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização utilitária
- **Framer Motion** - Animações
- **React Hot Toast** - Notificações
- **React Confetti** - Efeitos visuais
- **Stripe** - Processamento de pagamentos
- **HubSpot** - CRM e gestão de leads
- **Cal.com** - Agendamento
- **Tally** - Formulários

## 📋 Pré-requisitos

- Node.js 18+ 
- npm ou yarn
- Contas nas plataformas de integração:
  - HubSpot (API key)
  - Stripe (chaves de API)
  - Cal.com (link de agendamento)
  - Tally (formulário)

## ⚙️ Instalação

1. **Clone o repositório**
```bash
git clone <repository-url>
cd prep-se
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**
```bash
cp .env.example .env.local
```

Edite o arquivo `.env.local` com suas credenciais:

```env
# HubSpot Configuration
HUBSPOT_API_KEY=pat-na1-your-hubspot-api-key

# Stripe Configuration
STRIPE_PUBLISHABLE_KEY=pk_test_your-stripe-publishable-key
STRIPE_SECRET_KEY=sk_test_your-stripe-secret-key
STRIPE_PRICE_ID=price_your-stripe-price-id

# Cal.com Configuration
CALCOM_URL=https://cal.com/prepse/consulta

# Tally Configuration
TALLY_FORM_URL=https://tally.so/r/your-tally-form-id

# App Configuration
APP_BASE_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret
NEXTAUTH_URL=http://localhost:3000
```

4. **Execute o projeto**
```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000)

## 🔧 Configuração das Integrações

### HubSpot
1. Acesse Settings → Integrations → API key
2. Crie uma nova API key
3. Adicione no arquivo `.env.local`

### Stripe
1. Acesse Dashboard → Developers → API keys
2. Copie as chaves de teste
3. Crie um produto e preço no Stripe
4. Adicione as chaves e Price ID no `.env.local`

### Cal.com
1. Configure seu evento de agendamento
2. Copie a URL do evento
3. Adicione no `.env.local`

### Tally
1. Crie seu formulário clínico
2. Obtenha a URL de compartilhamento
3. Adicione no `.env.local`

## 📱 Estrutura do Projeto

```
src/
├── app/                    # App Router (Next.js 14)
│   ├── api/               # API Routes
│   │   ├── hubspot/       # HubSpot integration
│   │   ├── stripe/        # Stripe integration
│   │   └── webhooks/      # Webhook handlers
│   ├── jornada/           # Journey page
│   ├── sucesso/           # Success page
│   ├── erro/              # Error page
│   ├── faq/               # FAQ page
│   └── config/            # Configuration page
├── components/            # React components
│   ├── ui/                # Base UI components
│   ├── forms/             # Form components
│   ├── journey/           # Journey-specific components
│   └── layout/            # Layout components
├── hooks/                 # Custom React hooks
├── lib/                   # Utilities and services
│   └── services/          # External service integrations
└── types/                 # TypeScript type definitions
```

## 🎯 Jornada do Usuário

1. **Criar Conta** - Captura nome + e-mail → HubSpot
2. **Entender o Processo** - Leitura de informações
3. **Agendar Consulta** - Cal.com embed
4. **Pagamento** - Stripe Checkout
5. **Cadastro Clínico** - Redirecionamento para Tally
6. **Aprovação & Receita** - Status final

## 🔗 Webhooks

### Cal.com Webhook
- **Endpoint**: `/api/webhooks/cal`
- **Eventos**: `BOOKING_CREATED`, `BOOKING_CANCELLED`
- **Ação**: Atualiza status da etapa de agendamento

### Stripe Webhook
- **Endpoint**: `/api/webhooks/stripe`
- **Eventos**: `checkout.session.completed`, `payment_intent.succeeded`
- **Ação**: Atualiza status da etapa de pagamento

### Tally Webhook
- **Endpoint**: `/api/webhooks/tally`
- **Eventos**: `FORM_RESPONSE`
- **Ação**: Atualiza status da etapa de cadastro clínico

## 🧪 Testes

Acesse `/config` para testar todas as integrações:

1. Configure suas chaves de API
2. Execute os testes individuais
3. Verifique os resultados

## 🚀 Deploy

### Vercel (Recomendado)
1. Conecte seu repositório ao Vercel
2. Configure as variáveis de ambiente
3. Deploy automático

### Outras plataformas
1. Build do projeto: `npm run build`
2. Configure as variáveis de ambiente
3. Deploy da pasta `.next`

## 📊 Monitoramento

- **Logs**: Console logs para debugging
- **Webhooks**: Verificação de assinaturas
- **Erros**: Tratamento e notificações
- **Performance**: Otimizações do Next.js

## 🔒 Segurança

- **Validação**: Validação de entrada em todas as APIs
- **Autenticação**: Verificação de webhooks
- **Criptografia**: Dados sensíveis protegidos
- **LGPD**: Conformidade com proteção de dados

## �� Design System

- **Cores**: Paleta de azul/verde saúde
- **Tipografia**: Inter + IBM Plex Sans
- **Componentes**: Sistema consistente
- **Responsividade**: Mobile-first
- **Acessibilidade**: WCAG 2.1 AA

## 📞 Suporte

- **E-mail**: suporte@prepse.com
- **Telefone**: (11) 99999-9999
- **Chat**: Disponível 24/7

## 📄 Licença

Este projeto é propriedade da Prep-se. Todos os direitos reservados.

## 🤝 Contribuição

Para contribuir com o projeto:

1. Fork o repositório
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

---

**Prep-se** - Sua prevenção, sem burocracia 🏥
