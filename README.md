# CodeKids – Site institucional e CMS básico

Este projeto simula o site da ONG CodeKids, com:

- página institucional com hero, notícias/blog e transparência
- autenticação simples para área administrativa
- painel de gerenciamento de conteúdo com CRUD
- upload de imagens local em navegador
- armazenamento de dados em localStorage para simulação de CMS
- **integração com Google Maps** para localização
- **integração com Google Sheets** para coleta de dados via formulário

## Como executar

A forma mais simples é abrir o arquivo `index.html` no navegador.

Se preferir um servidor local:

```bash
cd "c:\Users\Aluno Tech\Documents\Arthur Souza"
python -m http.server 8000
```

Depois acesse:

```text
http://localhost:8000
```

## Login demo

- usuário: `codekids`
- senha: `codekids123`

> A autenticação é uma simulação em frontend para fins didáticos, sem backend real.

## 🔗 Integração com Google Maps e Sheets

Este projeto agora inclui integração com serviços Google:

### Google Maps
- Mapa interativo mostrando a localização da CodeKids
- Localizado na seção "Onde estamos" (Contato)
- Requer chave de API do Google Maps

### Google Sheets
- Dados do formulário de apoio/voluntariado são salvos em uma planilha Google
- Implementado via Google Apps Script
- Armazena: nome, email, telefone, mensagem e tipo de contribuição

### ⚠️ Configuração Necessária

**Antes de usar em produção, siga estas etapas:**

1. **Obtenha uma chave de API do Google Maps** no [Google Cloud Console](https://console.cloud.google.com/)
2. **Crie uma planilha Google** para receber os dados
3. **Configure o Google Apps Script** com o código fornecido em `google-apps-script-codigo.js`

Para instruções completas, consulte o arquivo **`INTEGRACAO_GOOGLE.md`**

## Estrutura do Projeto

```
.
├── index.html              # Página principal
├── admin.html              # Painel administrativo
├── app.js                  # Lógica do painel admin
├── styles.css              # Estilos CSS
├── css/
│   └── site.css           # Estilos adicionais
├── js/
│   ├── site.js            # Lógica do site (incluindo Google Maps e Sheets)
│   └── admin.js           # Lógica do admin
├── INTEGRACAO_GOOGLE.md   # Guia de integração
├── google-apps-script-codigo.js  # Código Google Apps Script
└── README.md              # Este arquivo
```
