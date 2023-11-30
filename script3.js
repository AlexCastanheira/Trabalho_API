// Declaração de variáveis globais
let selectedMetadata;
let metadataData;

// Função async para obter dados do metadado selecionado
async function getData() {
    // Obtém o valor selecionado no dropdown
    const metadataSelect = document.getElementById('metadataSelect');
    selectedMetadata = metadataSelect.value;
    
    // Constrói a URL da API para obter informações sobre o metadado
    const apiUrl = `http://www.ipeadata.gov.br/api/odata4/Metadados('${selectedMetadata}')`;

    try {
        // Faz uma requisição assíncrona para a API
        const response = await fetch(apiUrl);

        // Verifica se a resposta é bem-sucedida
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }

        // Converte a resposta para JSON
        metadataData = await response.json();

        // Exibe os dados na interface
        displayData(metadataData.value);
    } catch (error) {
        // Em caso de erro, exibe no console
        console.error(`Erro: ${error.message}`);
    }
}

// Função async para exibir uma tabela com base no metadado selecionado
async function mostrarTabela() {
    // Verifica se um metadado foi selecionado
    if (!selectedMetadata) {
        alert('Escolha um tipo de consulta.');
        return;
    }

    // Constrói a URL da API para obter os valores do metadado
    const apiUrl = `http://www.ipeadata.gov.br/api/odata4/Metadados('${selectedMetadata}')/Valores`;

    try {
        // Faz a requisição para a API
        const response = await fetch(apiUrl);

        // Verifica se a resposta é bem-sucedida
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }

        // Converte a resposta para JSON
        const data = await response.json();

        // Define os valores mínimo e máximo para filtragem
        const valorMinimo = 0.001;
        const valorMaximo = 1.01;

        // Filtra os dados com base nos valores mínimo e máximo
        const filteredData = data.value.filter(item => item.VALVALOR >= valorMinimo && item.VALVALOR <= valorMaximo);

        // Exibe informações no console para debug
        console.log('Total de itens antes do filtro:', data.value.length);
        console.log('Total de itens após o filtro:', filteredData.length);
        console.log('Filtered Data:', filteredData);

        // Exibe os dados filtrados na interface
        displayData(filteredData);
    } catch (error) {
        // Em caso de erro, exibe no console
        console.error(`Erro: ${error.message}`);
    }
}

// Função para exibir os dados na interface
function displayData(data) {
    // Obtém o elemento HTML onde os resultados serão exibidos
    const resultDiv = document.getElementById('result');
    
    // Limpa o conteúdo anterior
    resultDiv.innerHTML = '';

    // Verifica se há valores para exibir
    if (data && data.length > 0) {
        // Cria uma tabela e sua linha de cabeçalho
        const table = document.createElement('table');
        const headerRow = table.insertRow(0);

        // Adiciona colunas com base nas chaves do primeiro item
        const columnNames = Object.keys(data[0]);
        columnNames.forEach(columnName => {
            // Cria uma célula de cabeçalho para cada coluna
            const th = document.createElement('th');
            // Define o texto da célula como o nome da coluna
            th.textContent = columnName;
            // Adiciona a célula de cabeçalho à linha de cabeçalho
            headerRow.appendChild(th);
        });

        // Preenche a tabela com os dados
        data.forEach(item => {
            // Cria uma nova linha na tabela para cada item de dados
            const row = table.insertRow();
            // Para cada coluna, cria uma célula e preenche com o valor correspondente
            columnNames.forEach(columnName => {
                // Cria uma célula na linha
                const cell = row.insertCell();
                // Preenche a célula com o valor correspondente do item
                cell.textContent = item[columnName];
            });
        });

        // Adiciona a tabela ao elemento de resultado
        resultDiv.appendChild(table);
    } else {
        // Se não houver dados, exibe uma mensagem
        resultDiv.textContent = 'Nenhum dado encontrado.';
    }
}
