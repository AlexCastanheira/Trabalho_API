const url1 = `http://www.ipeadata.gov.br/api/odata4/Metadados('WDI_PPCTAXAC')`;
const url2 = `http://www.ipeadata.gov.br/api/odata4/Metadados('WDI_PPCTAXAC2011')`;
const url3 = `http://www.ipeadata.gov.br/api/odata4/Metadados('WDI_PPCTAXAC2017')`;

document.getElementById('btnPromiseAny').addEventListener('click', async () => {
    const urls = [url1, url2, url3];
    try {
        const result = await Promise.any(urls.map(url => fetch(url).then(response => response.json())));
        document.getElementById('resultPromiseAny').innerText = JSON.stringify(result);
    } catch (error) {
        document.getElementById('resultPromiseAny').innerText = `Erro: ${error.message}`;
    }
});

document.getElementById('btnPromiseRace').addEventListener('click', async () => {
    const urls = [url1, url2, url3];

    try {
        const result = await Promise.race(urls.map(url => fetch(url).then(response => response.json())));
        document.getElementById('resultPromiseRace').innerText = JSON.stringify(result);
    } catch (error) {
        document.getElementById('resultPromiseRace').innerText = `Erro: ${error.message}`;
    }
});


document.getElementById('btnPromiseAll').addEventListener('click', async () => {
    const urls = [url1, url2, url3];

    try {
        const results = await Promise.all(urls.map(url => fetch(url).then(response => response.json())));
        document.getElementById('resultPromiseAll').innerText = JSON.stringify(results);
    } catch (error) {
        document.getElementById('resultPromiseAll').innerText = `Erro: ${error.message}`;
    }
});
