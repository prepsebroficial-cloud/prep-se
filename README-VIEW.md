# 🌐 COMO VER SEU WEBSITE NO NAVEGADOR
## Guia Super Simples para Iniciantes

### 🎯 O que você vai conseguir fazer:
- Ver seu website funcionando no navegador
- Navegar pelas páginas
- Testar as funcionalidades básicas
- Ver como ficou o design

---

## 📋 ANTES DE COMEÇAR - O que você precisa:

### 1. **Node.js** (obrigatório)
- É como um "motor" que faz o website funcionar
- **Baixe aqui**: https://nodejs.org/
- Escolha a versão **LTS** (a mais estável)
- Instale normalmente (clique em "Next" até o final)

### 2. **Verificar se instalou corretamente**
- Abra o **Terminal** (no Mac) ou **Prompt de Comando** (no Windows)
- Digite: `node --version`
- Se aparecer um número (ex: v18.17.0), está funcionando! ✅
- Se der erro, reinstale o Node.js

---

## 🚀 PASSO A PASSO PARA VER O WEBSITE:

### **PASSO 1: Abrir o Terminal**
- **Mac**: Aperte `Cmd + Espaço`, digite "Terminal" e aperte Enter
- **Windows**: Aperte `Windows + R`, digite "cmd" e aperte Enter

### **PASSO 2: Navegar até a pasta do projeto**
Digite exatamente isso (uma linha por vez):
```bash
cd Desktop
cd prep-se
```

### **PASSO 3: Instalar as dependências**
Digite:
```bash
npm install
```
- Isso vai baixar todas as "peças" necessárias
- Pode demorar 2-3 minutos
- Quando terminar, você verá algo como "added 1234 packages"

### **PASSO 4: Iniciar o website**
Digite:
```bash
npm run dev
```

### **PASSO 5: Abrir no navegador**
- Você verá uma mensagem como: "Local: http://localhost:3000"
- **Clique nesse link** ou copie e cole no navegador
- **PRONTO!** Seu website está funcionando! 🎉

---

## 🎮 O QUE VOCÊ PODE FAZER AGORA:

### **Página Principal** (http://localhost:3000)
- Veja o design bonito
- Clique em "Começar minha jornada"
- Teste o botão de dark mode

### **Página da Jornada** (http://localhost:3000/jornada)
- Veja a timeline com 6 etapas
- Clique nas etapas para ver os modais
- Teste o formulário de cadastro

### **Outras Páginas:**
- **FAQ**: http://localhost:3000/faq
- **Sucesso**: http://localhost:3000/sucesso
- **Erro**: http://localhost:3000/erro
- **Configuração**: http://localhost:3000/config

---

## 🔧 SE ALGO DER ERRADO:

### **Erro: "node não é reconhecido"**
- **Solução**: Reinstale o Node.js
- Baixe novamente em: https://nodejs.org/

### **Erro: "npm não é reconhecido"**
- **Solução**: Reinstale o Node.js
- O npm vem junto com o Node.js

### **Erro: "Cannot find module"**
- **Solução**: Digite `npm install` novamente
- Aguarde terminar completamente

### **Erro: "Port 3000 already in use"**
- **Solução**: Feche outros programas que usam a porta 3000
- Ou use: `npm run dev -- -p 3001`

### **Website não abre**
- **Solução**: Verifique se o terminal mostra "Local: http://localhost:3000"
- Tente acessar: http://127.0.0.1:3000

---

## �� TESTANDO NO CELULAR:

### **Para ver no seu celular:**
1. Descubra o IP do seu computador:
   - **Mac**: Digite `ifconfig` no terminal
   - **Windows**: Digite `ipconfig` no prompt
2. Use o IP + :3000 (ex: http://192.168.1.100:3000)
3. **Importante**: Celular e computador devem estar na mesma rede Wi-Fi

---

## 🎨 O QUE VOCÊ VAI VER:

### **Design:**
- Cores azul e verde (tema saúde)
- Layout limpo e profissional
- Animações suaves
- Responsivo (funciona no celular)

### **Funcionalidades:**
- Timeline interativa
- Formulários funcionais
- Botões com efeitos
- Modais (janelas popup)
- Confetes quando completa etapas

### **Páginas:**
- **Home**: Apresentação do serviço
- **Jornada**: Timeline com 6 etapas
- **FAQ**: Perguntas e respostas
- **Sucesso**: Página pós-pagamento
- **Config**: Testes de integração

---

## 🛑 PARA PARAR O WEBSITE:

- No terminal, aperte `Ctrl + C` (Mac) ou `Ctrl + C` (Windows)
- O website para de funcionar
- Para voltar, digite `npm run dev` novamente

---

## 📞 PRECISA DE AJUDA?

### **Se algo não funcionar:**
1. **Copie a mensagem de erro** exata
2. **Verifique se seguiu todos os passos**
3. **Tente reiniciar o terminal**
4. **Reinstale o Node.js se necessário**

### **Dicas importantes:**
- ✅ Sempre use o terminal na pasta correta
- ✅ Aguarde o `npm install` terminar completamente
- ✅ Mantenha o terminal aberto enquanto usa o website
- ✅ Use `Ctrl + C` para parar o servidor

---

## 🎉 PARABÉNS!

Se você conseguiu ver o website funcionando, você já é um desenvolvedor! 

**Próximos passos:**
- Explore todas as páginas
- Teste as funcionalidades
- Veja como fica no celular
- Depois podemos configurar as integrações reais

**Lembre-se**: Este é apenas o "visual" do website. Para funcionar com dados reais (HubSpot, Stripe, etc.), precisamos configurar as chaves de API. Mas por enquanto, você pode ver e testar tudo!

---

**🚀 Divirta-se explorando seu website!**
