# CodeKids – Site institucional e CMS básico

Este projeto simula o site da ONG CodeKids, com:

- página institucional com hero, notícias/blog e transparência
- autenticação simples para área administrativa
- painel de gerenciamento de conteúdo com CRUD
- upload de imagens local em navegador
- armazenamento de dados em localStorage para simulação de CMS
- **integração com Google Maps** para localização
- **integração com Google Sheets** para coleta de dados via formulário

## 📁 Estrutura do Projeto

```
codekids/
├── src/                    # Código-fonte do projeto
│   ├── index.html         # Página principal
│   ├── admin.html         # Painel administrativo
│   ├── css/
│   │   └── styles.css     # Estilos globais
│   └── js/
│       ├── site.js        # Lógica do site
│       └── admin.js       # Lógica do admin
├── docs/                  # Documentação
│   ├── INTEGRACAO_GOOGLE.md
│   ├── RESUMO_INTEGRACAO.md
│   └── google-apps-script-codigo.js
├── README.md
├── .gitignore
└── package.json (opcional)
```

## Como executar

### Opção 1: Abrir no navegador (mais simples)

1. Abra o arquivo `src/index.html` diretamente no navegador
2. Para acessar o painel admin, clique em "Apoiar" e depois em "Acesso do corpo pedagógico"

### Opção 2: Com servidor local (recomendado)

```bash
cd "c:\Users\Aluno Tech\Documents\Arthur Souza"
python -m http.server 8000
```

Depois acesse:

```text
http://localhost:8000/src/
```

Se preferir outra porta:

```bash
python -m http.server 3000
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
3. **Configure o Google Apps Script** com o código fornecido em `docs/google-apps-script-codigo.js`

Para instruções completas, consulte:
- **`docs/INTEGRACAO_GOOGLE.md`** - Guia passo a passo
- **`docs/RESUMO_INTEGRACAO.md`** - Resumo executivo
- **`docs/google-apps-script-codigo.js`** - Código pronto para copiar/colar
