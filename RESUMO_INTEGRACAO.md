# 📋 Resumo da Integração Google Maps e Sheets

## ✅ O que foi feito

### 1. **Google Maps Integrado** 🗺️
- ✨ Nova seção "Onde estamos" na página de contato
- 🎯 Mapa interativo mostrando localização da CodeKids em São Paulo
- 📱 Design responsivo que se adapta em dispositivos móveis
- 🎨 Estilos modernos com sombras e animações

### 2. **Google Sheets Integrado** 📊
- 💾 Dados do formulário agora são salvos em planilha Google
- 🔄 Integração via Google Apps Script (webhook)
- 📝 Armazena: Nome, Email, Telefone, Mensagem e Tipo
- ⚡ Funciona de forma automática quando alguém preenche o formulário

### 3. **Arquivos Criados** 📁
```
✅ INTEGRACAO_GOOGLE.md              - Guia completo (4 seções principais)
✅ google-apps-script-codigo.js      - Código pronto para copiar/colar
✅ Alterações em index.html          - Nova seção de mapa
✅ Alterações em js/site.js          - Funções Google Maps e Sheets
✅ Alterações em styles.css          - Estilos para mapa e localização
✅ Alterações em README.md           - Documentação atualizada
```

---

## 🚀 Próximas Etapas (Passo a Passo)

### PASSO 1: Configurar Google Maps API Key
1. Acesse: https://console.cloud.google.com/
2. Crie novo projeto ou selecione existente
3. Vá a **APIs e Serviços** > **Credenciais**
4. Clique **+ Criar Credenciais** > **Chave de API**
5. Ative a **Maps JavaScript API**
6. Copie a chave
7. Em `index.html`, substitua:
   ```
   AIzaSyDummy_Replace_With_Your_API_Key
   ```
   Pela sua chave

### PASSO 2: Criar Planilha Google
1. Acesse: https://sheets.google.com
2. Crie nova planilha: "CodeKids - Apoiadores"
3. Crie cabeçalhos (linha 1):
   ```
   A: Data/Hora
   B: Nome
   C: Email
   D: Telefone
   E: Mensagem
   F: Tipo
   ```

### PASSO 3: Configurar Google Apps Script
1. Na planilha, clique: **Extensões** > **Apps Script**
2. Delete código padrão
3. Copie o código de `google-apps-script-codigo.js`
4. Cole no editor do Apps Script
5. Clique em **Salvar**
6. Clique em **Deploy** > **Novo deploy**
7. Selecione **Tipo**: Web app
8. Configure:
   - Executar como: Sua conta
   - Quem tem acesso: Qualquer pessoa
9. Copie a URL gerada

### PASSO 4: Conectar URL no Site
1. Abra `js/site.js`
2. Procure função `sendToGoogleSheets`
3. Substitua a URL:
   ```javascript
   const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/d/SEU_SCRIPT_ID/usercopy?action=submitForm';
   ```

### PASSO 5: Testar
1. Abra o site
2. Role até "Onde estamos" - deve ver o mapa
3. Preencha o formulário de apoio/voluntário
4. Verifique se aparece na planilha Google

---

## 📊 Estrutura de Dados na Planilha

Quando um usuário preenche o formulário, os seguintes dados são salvos:

```
Data/Hora       | Nome          | Email              | Telefone       | Mensagem              | Tipo
31/08/2026...   | João Silva    | joao@email.com     | (11) 98765-4321| Gostaria de apoiar... | Apoio
```

---

## 🔒 Considerações de Segurança

### API Key
- Restrinja em **Google Cloud Console** para apenas seu domínio
- Configure **HTTP referrers** com seu site

### Planilha
- Apenas Google Apps Script pode adicionar dados
- Compartilhe com sua equipe para leitura
- Faça backup regularmente

### Apps Script
- Nunca compartilhe o Script ID publicamente
- Use HTTPS sempre
- Valide dados no servidor

---

## 🆘 Troubleshooting Rápido

| Problema | Solução |
|----------|---------|
| Mapa não aparece | Verifique API Key em `index.html` |
| Dados não salvam | Verifique URL do Apps Script em `site.js` |
| Erro de permissão | Redeploy com "Qualquer pessoa" |
| Mapa em branco | API Maps pode não estar ativada |

---

## 📞 Contatos Úteis

- 📚 [Documentação Google Maps](https://developers.google.com/maps)
- 📚 [Documentação Google Apps Script](https://script.google.com/home)
- 📚 [Google Cloud Console](https://console.cloud.google.com/)
- 📚 [Google Sheets API](https://developers.google.com/sheets/api)

---

## ✨ Recursos Extras Disponíveis

No arquivo `google-apps-script-codigo.js` você encontra funções prontas:

- `testarScript()` - Testa se tudo está funcionando
- `formatarPlanilha()` - Formata a planilha automaticamente
- `enviarNotificacao()` - Envia email quando formulário é enviado (comentado)

---

**Criado em**: 31/08/2026  
**Versão**: 1.0  
**Status**: ✅ Pronto para produção (após configurar chaves)
