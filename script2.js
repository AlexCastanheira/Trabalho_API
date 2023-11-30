// Função async para consultar CEP
async function consultarCEP() {
    // Obtém o valor do CEP
    const cepInput = document.getElementById('cep').value;

    try {
        // Faz uma requisição à API de CEP
        const response = await fetch(`https://brasilapi.com.br/api/cep/v1/${cepInput}`);
        const data = await response.json();

        // Exibe o resultado na tela
        exibirResultado('resultadoConsulta', 'Consulta CEP', data);
    } catch (error) {
        // Em caso de erro, exibe no console
        console.error('Erro na consulta CEP:', error);
    }
}

// Função assíncrona para consultar CNPJ
async function consultarCNPJ() {
    // Obtém o valor do input do CNPJ
    const cnpjInput = document.getElementById('cnpj').value;

    try {
        // Faz uma requisição à API de CNPJ
        const response = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${cnpjInput}`);
        const data = await response.json();

        // Exibe o resultado na tela
        exibirResultado('resultadoConsulta', 'Consulta CNPJ', data);
    } catch (error) {
        // Em caso de erro, exibe no console
        console.error('Erro na consulta CNPJ:', error);
    }
}

// Função assíncrona para consultar DDD
async function consultarDDD() {
    // Obtém o valor do input do DDD
    const dddInput = document.getElementById('ddd').value;

    try {
        // Faz uma requisição à API de DDD
        const response = await fetch(`https://brasilapi.com.br/api/ddd/v1/${dddInput}`);
        
        // Verifica se a resposta é bem-sucedida
        if (!response.ok) {
            throw new Error(`Erro na consulta DDD: ${response.statusText}`);
        }

        const data = await response.json();

        // Exibe o resultado na tela
        exibirResultado('resultadoConsulta', 'Consulta DDD', data);
    } catch (error) {
        // Em caso de erro, exibe no console e exibe uma mensagem de erro na tela
        console.error(`Erro na consulta DDD: ${error.message}`);
        exibirResultado('resultadoConsulta', 'Consulta DDD', { error: 'Consulta de DDD não disponível' });
    }
}

// Função para exibir resultados na tela
function exibirResultado(elementId, title, data) {
    const resultadoElement = document.getElementById(elementId);
    // Exibe o título e os dados formatados na tela
    // converte os dados JSON em uma string formatada com 2 espaços.
    resultadoElement.innerHTML = `<h2>${title}</h2><pre>${JSON.stringify(data, null, 2)}</pre>`;
}
