// Funções de consulta
async function consultarCEP() {
    const cepInput = document.getElementById('cep').value;

    try {
        const response = await fetch(`https://brasilapi.com.br/api/cep/v1/${cepInput}`);
        const data = await response.json();

        // Exibir resultado
        exibirResultado('resultadoConsulta', 'Consulta CEP', data);
    } catch (error) {
        console.error('Erro na consulta CEP:', error);
    }
}

async function consultarCNPJ() {
    const cnpjInput = document.getElementById('cnpj').value;

    try {
        const response = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${cnpjInput}`);
        const data = await response.json();

        // Exibir resultado
        exibirResultado('resultadoConsulta', 'Consulta CNPJ', data);
    } catch (error) {
        console.error('Erro na consulta CNPJ:', error);
    }
}

async function consultarDDD() {
    const dddInput = document.getElementById('ddd').value;

    try {
        const response = await fetch(`https://brasilapi.com.br/api/ddd/v1/${dddInput}`);
        if (!response.ok) {
            throw new Error(`Erro na consulta DDD: ${response.statusText}`);
        }
        const data = await response.json();

        // Exibir resultado
        exibirResultado('resultadoConsulta', 'Consulta DDD', data);
    } catch (error) {
        console.error(`Erro na consulta DDD: ${error.message}`);
        exibirResultado('resultadoConsulta', 'Consulta DDD', { error: 'Consulta de DDD não disponível' });
    }
}

// Função para exibir resultados na tela
function exibirResultado(elementId, title, data) {
    const resultadoElement = document.getElementById(elementId);
    resultadoElement.innerHTML = `<h2>${title}</h2><pre>${JSON.stringify(data, null, 2)}</pre>`;
}