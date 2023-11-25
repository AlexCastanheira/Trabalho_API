document.addEventListener('DOMContentLoaded', function () {
    // Carrega o JSON
    fetch('paises.json')
        .then(response => response.json())
        .then(data => {
            const selectPais = document.getElementById('selectPais');
            const resultDiv = document.getElementById('result');

            // Preenche o dropdown com os países
            data.forEach(pais => {
                const option = document.createElement('option');
                option.value = pais.sigla;
                option.text = pais.nome_pais;
                selectPais.appendChild(option);
            });

            // Adiciona um listener para o evento de mudança no dropdown
            selectPais.addEventListener('change', function () {
                const selectedSigla = this.value;
                const selectedPais = data.find(pais => pais.sigla === selectedSigla);

                // Exibe os detalhes do país selecionado
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
