let selectedMetadata;
let metadataData;

async function getData() {
    const metadataSelect = document.getElementById('metadataSelect');
    selectedMetadata = metadataSelect.value;

    const apiUrl = `http://www.ipeadata.gov.br/api/odata4/Metadados('${selectedMetadata}')`;

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }

        metadataData = await response.json();
        displayData(metadataData, selectedMetadata);
    } catch (error) {
        console.error(`Erro: ${error.message}`);
    }
}

async function mostrarTabela() {
    if (!selectedMetadata) {
        alert('Escolha um tipo de consulta primeiro.');
        return;
    }

    const apiUrl = `http://www.ipeadata.gov.br/api/odata4/Metadados('${selectedMetadata}')/Valores`;

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }

        const data = await response.json();
        displayData(data, selectedMetadata);
    } catch (error) {
        console.error(`Erro: ${error.message}`);
    }
}

function displayData(data, selectedMetadata) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = ''; // Limpa o conteúdo anterior

    if (data.value && data.value.length > 0) {
        const table = document.createElement('table');
        const headerRow = table.createTHead().insertRow(0);

        // Adicione aqui as colunas que deseja exibir, utilizando as informações do metadado
        const columnNames = Object.keys(data.value[0]);
        columnNames.forEach(columnName => {
            const th = document.createElement('th');
            th.textContent = columnName;
            headerRow.appendChild(th);
        });

        data.value.forEach(item => {
            const row = table.insertRow();
            columnNames.forEach(columnName => {
                const cell = row.insertCell();
                cell.textContent = item[columnName];
            });
        });

        resultDiv.appendChild(table);
    } else {
        resultDiv.textContent = 'Nenhum dado encontrado.';
    }
}