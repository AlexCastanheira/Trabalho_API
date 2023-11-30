// URLs para diferentes metadados
const url1 = `http://www.ipeadata.gov.br/api/odata4/Metadados('WDI_PPCTAXAC')`;
const url2 = `http://www.ipeadata.gov.br/api/odata4/Metadados('WDI_PPCTAXAC2011')`;
const url3 = `http://www.ipeadata.gov.br/api/odata4/Metadados('WDI_PPCTAXAC2017')`;

// Event listener para o botão usando Promise.any
document.getElementById('btnPromiseAny').addEventListener('click', async () => {
    // Array de URLs para utilizar no Promise.any
    const urls = [url1, url2, url3];

    try {
        // Aguarda a primeira promise ser resolvida (ou rejeitada)
        const result = await Promise.any(urls.map(async url => {
            const response = await fetch(url);
            // Extrai os dados relevantes da resposta JSON
            const { value: [{ SERNOME, SERCOMENTARIO, SERATUALIZACAO }] } = await response.json();
            return { SERNOME, SERCOMENTARIO, SERATUALIZACAO };
        }));

        // Exibe o resultado no elemento HTML
        document.getElementById('resultPromiseAny').innerText = JSON.stringify(result);
    } catch (error) {
        // Em caso de erro, exibe a mensagem de erro
        document.getElementById('resultPromiseAny').innerText = `Erro: ${error.message}`;
    }
});

// Event listener para o botão usando Promise.race
document.getElementById('btnPromiseRace').addEventListener('click', async () => {
    // Array de URLs para utilizar no Promise.race
    const urls = [url1, url2, url3];

    try {
        // Aguarda a primeira promise ser resolvida (ou rejeitada)
        const result = await Promise.race(urls.map(async url => {
            const response = await fetch(url);
            // Extrai os dados relevantes da resposta JSON
            const { value: [{ SERNOME, SERCOMENTARIO, SERATUALIZACAO }] } = await response.json();
            return { SERNOME, SERCOMENTARIO, SERATUALIZACAO };
        }));

        // Exibe o resultado no elemento HTML
        document.getElementById('resultPromiseRace').innerText = JSON.stringify(result);
    } catch (error) {
        // Em caso de erro, exibe a mensagem de erro
        document.getElementById('resultPromiseRace').innerText = `Erro: ${error.message}`;
    }
});

// Event listener para o botão usando Promise.all
document.getElementById('btnPromiseAll').addEventListener('click', async () => {
    // Array de URLs para utilizar no Promise.all
    const urls = [url1, url2, url3];

    try {
        // Aguarda todas as promises serem resolvidas (ou uma ser rejeitada)
        const results = await Promise.all(urls.map(async url => {
            const response = await fetch(url);
            // Extrai os dados relevantes da resposta JSON
            const { value: [{ SERNOME, SERCOMENTARIO, SERATUALIZACAO }] } = await response.json();
            return { SERNOME, SERCOMENTARIO, SERATUALIZACAO };
        }));

        // Exibe os resultados no elemento HTML
        document.getElementById('resultPromiseAll').innerText = JSON.stringify(results);
    } catch (error) {
        // Em caso de erro, exibe a mensagem de erro
        document.getElementById('resultPromiseAll').innerText = `Erro: ${error.message}`;
    }
});
