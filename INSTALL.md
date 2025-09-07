# 🚀 Guia de Instalação - Prep-se

## Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js 18+** - [Download aqui](https://nodejs.org/)
- **npm** (vem com Node.js) ou **yarn**
- **Git** - [Download aqui](https://git-scm.com/)

## 📦 Instalação Passo a Passo

### 1. Instalar Node.js (se não tiver)

```bash
# Verificar se Node.js está instalado
node --version
npm --version

# Se não estiver instalado, baixe em: https://nodejs.org/
```

### 2. Instalar Dependências

```bash
# Navegar para o diretório do projeto
cd prep-se

# Instalar todas as dependências
npm install
```

### 3. Configurar Variáveis de Ambiente

```bash
# Copiar arquivo de exemplo
cp .env.example .env.local

# Editar o arquivo .env.local com suas credenciais
```

**Conteúdo do arquivo `.env.local`:**

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
NEXTAUTH_SECRET=your-nextauth-secret-here
NEXTAUTH_URL=http://localhost:3000
```

### 4. Executar o Projeto

```bash
# Modo desenvolvimento
npm run dev

# O projeto estará disponível em: http://localhost:3000
```

## 🔧 Configuração das Integrações

### HubSpot
1. Acesse [HubSpot](https://app.hubspot.com/)
2. Vá em **Settings** → **Integrations** → **API key**
3. Crie uma nova API key
4. Copie e cole no arquivo `.env.local`

### Stripe
1. Acesse [Stripe Dashboard](https://dashboard.stripe.com/)
2. Vá em **Developers** → **API keys**
3. Copie as chaves de **teste** (não produção!)
4. Crie um produto e preço
5. Copie o Price ID
6. Adicione tudo no arquivo `.env.local`

### Cal.com
1. Acesse [Cal.com](https://cal.com/)
2. Configure seu evento de agendamento
3. Copie a URL do evento
4. Adicione no arquivo `.env.local`

### Tally
1. Acesse [Tally](https://tally.so/)
2. Crie seu formulário clínico
3. Obtenha a URL de compartilhamento
4. Adicione no arquivo `.env.local`

## 🧪 Testando as Integrações

1. Acesse: `http://localhost:3000/config`
2. Configure suas chaves de API
3. Execute os testes individuais
4. Verifique se tudo está funcionando

## 🚀 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Executar build de produção
npm run start

# Linting
npm run lint
```

## 📱 Páginas Disponíveis

- **/** - Página inicial
- **/jornada** - Timeline da jornada do usuário
- **/sucesso** - Página pós-pagamento
- **/erro** - Página de erro genérica
- **/faq** - Perguntas frequentes
- **/config** - Configuração e testes

## 🔍 Solução de Problemas

### Erro: "Module not found"
```bash
# Reinstalar dependências
rm -rf node_modules package-lock.json
npm install
```

### Erro: "Port 3000 already in use"
```bash
# Usar outra porta
npm run dev -- -p 3001
```

### Erro de variáveis de ambiente
- Verifique se o arquivo `.env.local` existe
- Confirme se todas as variáveis estão preenchidas
- Reinicie o servidor após alterações

### Erro de integração
- Verifique se as chaves de API estão corretas
- Confirme se está usando chaves de **teste** (não produção)
- Teste as integrações na página `/config`

## 📞 Suporte

Se encontrar problemas:

1. Verifique os logs no console
2. Teste as integrações em `/config`
3. Consulte a documentação das APIs:
   - [HubSpot API](https://developers.hubspot.com/)
   - [Stripe API](https://stripe.com/docs/api)
   - [Cal.com API](https://cal.com/docs/api-reference)
   - [Tally API](https://tally.so/help/api)

## 🎉 Próximos Passos

Após a instalação:

1. Configure todas as integrações
2. Teste o fluxo completo
3. Personalize o design conforme necessário
4. Configure os webhooks para produção
5. Faça o deploy para produção

---

**Boa sorte com sua instalação! ��**
