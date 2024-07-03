const apiKey = '8e59fbf8473043279d0acf6d62cf111d';

const currencyMap = {
    "dólar americano": "USD",
    "euro": "EUR",
    "real brasileiro": "BRL",
    "iene japonês": "JPY",
    "libra esterlina": "GBP",
    "dólar australiano": "AUD",
    "dólar canadense": "CAD",
    "franco suíço": "CHF",
    "yuan chinês": "CNY",
    "dólar de hong kong": "HKD",
    // Adicione mais moedas conforme necessário
};

async function converterMoeda() {
    const valor = document.getElementById('valor').value;
    const deMoedaNome = document.getElementById('de_moeda').value.toLowerCase();
    const paraMoedaNome = document.getElementById('para_moeda').value.toLowerCase();
    const resultadoDiv = document.getElementById('resultado');

    if (!valor || !deMoedaNome || !paraMoedaNome) {
        resultadoDiv.innerText = 'Por favor, preencha todos os campos.';
        return;
    }

    const deMoeda = currencyMap[deMoedaNome];
    const paraMoeda = currencyMap[paraMoedaNome];

    if (!deMoeda || !paraMoeda) {
        resultadoDiv.innerText = 'Nome de moeda inválido.';
        return;
    }

    const url = `https://openexchangerates.org/api/latest.json?app_id=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (!data.rates[deMoeda] || !data.rates[paraMoeda]) {
            resultadoDiv.innerText = 'Erro ao obter os dados de conversão.';
            return;
        }

        let valorEmUsd;
        if (deMoeda !== 'USD') {
            valorEmUsd = valor / data.rates[deMoeda];
        } else {
            valorEmUsd = valor;
        }

        const valorConvertido = valorEmUsd * data.rates[paraMoeda];
        resultadoDiv.innerText = `Resultado: ${valorConvertido.toFixed(2)} ${paraMoeda}`;
    } catch (error) {
        resultadoDiv.innerText = 'Erro ao obter os dados de conversão.';
    }
}