// ============================================
// Google Apps Script - CodeKids Form Handler
// ============================================
// Este código deve ser copiado e colado no Google Apps Script
// e implantado como Web App
// ============================================

/**
 * Função principal que recebe dados do formulário
 * e adiciona à planilha Google
 */
function doPost(e) {
  try {
    // Parse dos dados JSON enviados
    const data = JSON.parse(e.postData.contents);
    
    // Obter a planilha ativa
    const sheet = SpreadsheetApp.getActiveSheet();
    
    // Adicionar nova linha com os dados
    sheet.appendRow([
      new Date().toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }),
      data.name || '',
      data.email || '',
      data.phone || '',
      data.message || '',
      data.type === 'support' ? 'Apoio' : 'Voluntário'
    ]);
    
    // Retornar resposta de sucesso
    return ContentService
      .createTextOutput(JSON.stringify({ 
        status: 'sucesso',
        mensagem: 'Dados recebidos e salvos com sucesso!'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch(error) {
    // Retornar resposta de erro
    return ContentService
      .createTextOutput(JSON.stringify({ 
        status: 'erro',
        mensagem: error.message,
        detalhes: error.stack
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Função auxiliar para testar o script
 * Execute esta função para verificar se está funcionando
 */
function testarScript() {
  const dadosTeste = {
    name: 'João Silva',
    email: 'joao@example.com',
    phone: '(11) 98765-4321',
    message: 'Gostaria de apoiar o projeto CodeKids',
    type: 'support',
    createdAt: new Date().toISOString()
  };
  
  // Simular chamada POST
  const e = {
    postData: {
      contents: JSON.stringify(dadosTeste)
    }
  };
  
  const resultado = doPost(e);
  Logger.log('Teste concluído: ' + resultado.getContent());
}

/**
 * Função para configurar formatação na planilha
 * Execute uma vez para melhorar a aparência
 */
function formatarPlanilha() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const headerRange = sheet.getRange(1, 1, 1, 6);
  
  // Estilo do cabeçalho
  headerRange.setBackground('#5533ff');
  headerRange.setFontColor('#ffffff');
  headerRange.setFontWeight('bold');
  headerRange.setFontSize(12);
  
  // Ajustar largura das colunas
  sheet.setColumnWidth(1, 150); // Data/Hora
  sheet.setColumnWidth(2, 180); // Nome
  sheet.setColumnWidth(3, 200); // Email
  sheet.setColumnWidth(4, 150); // Telefone
  sheet.setColumnWidth(5, 300); // Mensagem
  sheet.setColumnWidth(6, 120); // Tipo
  
  // Congelar linha de cabeçalho
  sheet.setFrozenRows(1);
  
  Logger.log('Planilha formatada com sucesso!');
}

/**
 * Função para enviar email quando um novo formulário é recebido
 * Descomente e configure o email para receber notificações
 */
function enviarNotificacao(nome, email) {
  try {
    // CONFIGURAR ESTE EMAIL
    const seuEmail = 'seu-email@example.com';
    
    const subject = `Nova submissão CodeKids: ${nome}`;
    const message = `Uma nova pessoa se registrou no formulário CodeKids!\n\nNome: ${nome}\nEmail: ${email}`;
    
    // Descomente para ativar notificações por email
    // MailApp.sendEmail(seuEmail, subject, message);
  } catch(error) {
    Logger.log('Erro ao enviar email: ' + error.message);
  }
}
