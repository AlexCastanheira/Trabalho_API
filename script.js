document.addEventListener('DOMContentLoaded', function () {
            
    // Carrega os dados dos países de um arquivo chamado 'paises.json'
    fetch('paises.json')
        .then(response => response.json())  // Converte a resposta para o formato JSON
        .then(data => {
            const selectPais = document.getElementById('selectPais');
            const resultDiv = document.getElementById('result');

            // Preenche o menu de seleção com os nomes dos países
           // Itera sobre cada país no conjunto de dados
data.forEach(pais => {
    // Cria um novo elemento de opção para o menu suspenso
    const option = document.createElement('option');

    // pesquisa a sigla do país como valor da opção
    option.value = pais.sigla;

    // coloca o nome do país como texto visível na opção
    option.text = pais.nome_pais;

    // Adiciona a opção ao menu suspenso
    selectPais.appendChild(option);
});


            // Adiciona um ouvinte para quando o usuário escolher um país no menu
            selectPais.addEventListener('change', function () {
                // Obtém a sigla do país selecionado a partir do valor da opção escolhida
                const selectedSigla = this.value;
            
                // Encontra as informações do país escolhido nos dados
                const selectedPais = data.find(pais => pais.sigla === selectedSigla);
            
                // Exibe detalhes sobre o país escolhido na div de resultados
                resultDiv.innerHTML = `
                    <h2>${selectedPais.nome_pais}</h2>
                    <p>Gentílico: ${selectedPais.gentilico}</p>
                    <p>Nome Internacional: ${selectedPais.nome_pais_int}</p>
                    <p>Sigla: ${selectedPais.sigla}</p>
                `;
            });
        })
        .catch(error => console.error('Erro ao carregar o JSON:', error));
});