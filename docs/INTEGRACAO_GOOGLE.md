# 🔗 Integração Google Maps e Google Sheets - CodeKids

Este guia fornece instruções passo a passo para configurar o Google Maps e Google Sheets na plataforma CodeKids.

---

## 📍 PARTE 1: Integração Google Maps

### Passo 1: Obter API Key do Google Maps

1. Acesse [Google Cloud Console](https://console.cloud.google.com/)
2. Crie um novo projeto ou selecione um existente
3. No menu esquerdo, vá para **APIs e Serviços** > **Credenciais**
4. Clique em **+ Criar Credenciais** > **Chave de API**
5. Copie a chave de API gerada
6. Ative a API do Google Maps:
   - Vá para **APIs e Serviços** > **Biblioteca**
   - Procure por **Maps JavaScript API**
   - Clique em **Ativar**

### Passo 2: Configurar a API Key no Projeto

1. Abra o arquivo `index.html`
2. Procure pela linha com `AIzaSyDummy_Replace_With_Your_API_Key`
3. Substitua pelo sua chave de API:
   ```html
   <script async src="https://maps.googleapis.com/maps/api/js?key=SUA_CHAVE_DE_API_AQUI&callback=initMap"></script>
   ```

### Passo 3: Testar o Mapa

1. Abra o site no navegador
2. Vá para a seção "Onde estamos" (Contato)
3. Você deve ver um mapa do Google Maps com a localização

---

## 📊 PARTE 2: Integração Google Sheets

### Passo 1: Criar uma Planilha Google

1. Acesse [Google Sheets](https://sheets.google.com)
2. Crie uma nova planilha chamada "CodeKids - Apoiadores"
3. Crie as seguintes colunas na primeira linha:
   ```
   A: Data/Hora
   B: Nome
   C: Email
   D: Telefone
   E: Mensagem
   F: Tipo (Apoio/Voluntário)
   ```

### Passo 2: Criar Google Apps Script

1. Na planilha, clique em **Extensões** > **Apps Script**
2. Delete o código padrão
3. Cole o seguinte código:

```javascript
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    
    const sheet = SpreadsheetApp.getActiveSheet();
    
    sheet.appendRow([
      new Date().toLocaleString('pt-BR'),
      data.name,
      data.email,
      data.phone,
      data.message,
      data.type === 'support' ? 'Apoio' : 'Voluntário'
    ]);
    
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'sucesso' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch(error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'erro', mensagem: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

4. Clique em **Salvar** (ícone de disquete)
5. Nomeie o projeto como "CodeKids Form Handler"

### Passo 3: Fazer Deploy como Web App

1. Clique em **Deploy** > **Novo deploy**
2. Selecione **Tipo**: Web app
3. Preencha:
   - **Executar como**: Sua conta Google
   - **Quem tem acesso**: Qualquer pessoa
4. Clique em **Implantar**
5. Copie a URL gerada (algo como: `https://script.google.com/macros/d/{SCRIPT_ID}/usercopy?action=submitForm`)

### Passo 4: Configurar URL no Projeto

1. Abra o arquivo `js/site.js`
2. Procure pela função `sendToGoogleSheets`
3. Substitua `{SEU_SCRIPT_ID}` pela URL do Deploy:
   ```javascript
   const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/d/SEU_SCRIPT_ID/usercopy?action=submitForm';
   ```

---

## 🔒 SEGURANÇA E DICAS

### Proteção de API Key
- Restrinja a chave do Google Maps:
  1. No [Google Cloud Console](https://console.cloud.google.com/)
  2. Vá para **Credenciais**
  3. Clique na sua chave
  4. Em **Restrições de aplicação**, selecione **HTTP referrers (sites da web)**
  5. Adicione seu domínio

### Permissões da Planilha
- A planilha pode ser partilhada com sua equipe para visualizar os dados
- Apenas o Apps Script pode adicionar dados automaticamente

### Localização do Mapa
- O mapa está configurado para São Paulo, SP (-23.5505, -46.6333)
- Para alterar, edite em `js/site.js` na função `initMap()`:
  ```javascript
  const codekidsLocation = { lat: SEU_LAT, lng: SEU_LNG };
  ```

---

## ✅ Checklist de Configuração

- [ ] Google Maps API Key obtida e configurada
- [ ] Maps JavaScript API ativada
- [ ] Google Sheet criada
- [ ] Google Apps Script configurado
- [ ] URL do Apps Script adicionada ao `site.js`
- [ ] Testes realizados no navegador
- [ ] Verificação de dados na planilha

---

## 🆘 Troubleshooting

**O mapa não aparece:**
- Verifique se a API Key está correta
- Verifique se a API do Google Maps está ativada
- Verifique o console do navegador (F12) para erros

**Os dados não vão para a planilha:**
- Verifique se o Apps Script foi implantado como Web App
- Verifique se a URL está correta no `site.js`
- Abra o console (F12) e veja se há erros

**Erro "You do not have permission to access this content":**
- Verifique as permissões do Apps Script
- O Deploy deve ser configurado para "Qualquer pessoa"

---

## 📝 Próximos Passos

1. Considere adicionar validação de email
2. Implemente notificações por email quando um formulário é enviado
3. Crie um dashboard com dados da planilha
4. Configure autenticação para sua equipe
5. Adicione mais campos ao formulário conforme necessário

---

**Suporte**: Para dúvidas, consulte a [documentação do Google Maps](https://developers.google.com/maps) e [Google Apps Script](https://script.google.com/home).
