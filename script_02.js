/*document.addEventListener('DOMContentLoaded', () => {
    const nomeCasaInput = document.getElementById('nomeCasa');
    const nomeComodoInput = document.getElementById('nomeComodo');
    const larguraInput = document.getElementById('largura');
    const comprimentoInput = document.getElementById('comprimento');
    const addComodoBtn = document.getElementById('addComodo');
    const salvarCasaBtn = document.getElementById('salvarCasa');
    const listaComodosUl = document.getElementById('listaComodos');
    const areaTotalH2 = document.getElementById('areaTotal');
    const listaCasasUl = document.getElementById('listaCasas');

    let comodos = [];
    let areaTotal = 0;

    carregarCasasSalvas();

    addComodoBtn.addEventListener('click', () => {
        const nomeComodo = nomeComodoInput.value.trim();
        const largura = parseFloat(larguraInput.value);
        const comprimento = parseFloat(comprimentoInput.value);

        if (!nomeComodo || isNaN(largura) || isNaN(comprimento) || largura <= 0 || comprimento <= 0) {
            alert('Por favor, preencha todos os campos corretamente.');
            return;
        }

        const areaComodo = largura * comprimento;
        areaTotal += areaComodo;

        comodos.push({
            nome: nomeComodo,
            largura: largura,
            comprimento: comprimento,
            area: areaComodo
        });

        const listItem = document.createElement('li');
        listItem.textContent = `${nomeComodo} (${largura.toFixed(1)}m x ${comprimento.toFixed(1)}m): ${areaComodo.toFixed(2)} m²`;
        listaComodosUl.appendChild(listItem);

        areaTotalH2.textContent = `Área Total: ${areaTotal.toFixed(2)} m²`;

        nomeComodoInput.value = '';
        larguraInput.value = '';
        comprimentoInput.value = '';
        nomeComodoInput.focus();
    });

    salvarCasaBtn.addEventListener('click', () => {
        const nomeCasa = nomeCasaInput.value.trim();
        if (!nomeCasa) {
            alert('Por favor, insira um nome para a casa.');
            return;
        }
        if (comodos.length === 0) {
            alert('Adicione pelo menos um cômodo antes de salvar.');
            return;
        }

        let casas = JSON.parse(localStorage.getItem('casas')) || {};
        casas[nomeCasa] = { comodos, areaTotal };
        localStorage.setItem('casas', JSON.stringify(casas));

        alert(`Casa "${nomeCasa}" salva com sucesso!`);
        carregarCasasSalvas();
    });

    function carregarCasasSalvas() {
        listaCasasUl.innerHTML = '';
        let casas = JSON.parse(localStorage.getItem('casas')) || {};
        Object.keys(casas).forEach(nomeCasa => {
            const casa = casas[nomeCasa];
            const listItem = document.createElement('li');
            listItem.textContent = `${nomeCasa} - Total: ${casa.areaTotal.toFixed(2)} m² `;
            const btnCarregar = document.createElement('button');
            btnCarregar.textContent = 'Carregar';
            btnCarregar.onclick = () => carregarCasa(nomeCasa, casa);
            const btnExcluir = document.createElement('button');
            btnExcluir.textContent = 'Excluir';
            btnExcluir.onclick = () => excluirCasa(nomeCasa);
            listItem.appendChild(btnCarregar);
            listItem.appendChild(btnExcluir);
            listaCasasUl.appendChild(listItem);
        });
    }

    function carregarCasa(nomeCasa, casaDados) {
        nomeCasaInput.value = nomeCasa;
        comodos = casaDados.comodos;
        areaTotal = casaDados.areaTotal;
        listaComodosUl.innerHTML = '';
        comodos.forEach(c => {
            const listItem = document.createElement('li');
            listItem.textContent = `${c.nome} (${c.largura.toFixed(1)}m x ${c.comprimento.toFixed(1)}m): ${c.area.toFixed(2)} m²`;
            listaComodosUl.appendChild(listItem);
        });
        areaTotalH2.textContent = `Área Total: ${areaTotal.toFixed(2)} m²`;
    }

    function excluirCasa(nomeCasa) {
        let casas = JSON.parse(localStorage.getItem('casas')) || {};
        delete casas[nomeCasa];
        localStorage.setItem('casas', JSON.stringify(casas));
        carregarCasasSalvas();
    }
});*/

// Mudanç daqui para baixo

/*document.addEventListener('DOMContentLoaded', () => {
    const nomeCasaInput = document.getElementById('nomeCasa');
    const nomeComodoInput = document.getElementById('nomeComodo');
    const larguraInput = document.getElementById('largura');
    const comprimentoInput = document.getElementById('comprimento');
    const addComodoBtn = document.getElementById('addComodo');
    const salvarCasaBtn = document.getElementById('salvarCasa');
    const listaComodosUl = document.getElementById('listaComodos');
    const areaTotalH2 = document.getElementById('areaTotal');
    const listaCasasUl = document.getElementById('listaCasas');

    let comodos = [];
    let areaTotal = 0;

    carregarCasasSalvas();

    addComodoBtn.addEventListener('click', () => {
        const nomeComodo = nomeComodoInput.value.trim();
        const largura = parseFloat(larguraInput.value);
        const comprimento = parseFloat(comprimentoInput.value);

        if (!nomeComodo || isNaN(largura) || isNaN(comprimento) || largura <= 0 || comprimento <= 0) {
            alert('Por favor, preencha todos os campos corretamente.');
            return;
        }

        const areaComodo = largura * comprimento;
        areaTotal += areaComodo;

        comodos.push({
            nome: nomeComodo,
            largura: largura,
            comprimento: comprimento,
            area: areaComodo
        });

        atualizarListaComodos();
    });

    salvarCasaBtn.addEventListener('click', () => {
        const nomeCasa = nomeCasaInput.value.trim();
        if (!nomeCasa) {
            alert('Por favor, insira um nome para a casa.');
            return;
        }
        if (comodos.length === 0) {
            alert('Adicione pelo menos um cômodo antes de salvar.');
            return;
        }

        let casas = JSON.parse(localStorage.getItem('casas')) || {};
        casas[nomeCasa] = { comodos: [...comodos], areaTotal };
        localStorage.setItem('casas', JSON.stringify(casas));

        alert(`Casa "${nomeCasa}" salva com sucesso!`);
        carregarCasasSalvas();
        limparTudo();
    });

    function carregarCasasSalvas() {
        listaCasasUl.innerHTML = '';
        let casas = JSON.parse(localStorage.getItem('casas')) || {};
        Object.keys(casas).forEach(nomeCasa => {
            const casa = casas[nomeCasa];
            const listItem = document.createElement('li');
            listItem.textContent = `${nomeCasa} - Total: ${casa.areaTotal.toFixed(2)} m² `;
            const btnCarregar = document.createElement('button');
            btnCarregar.textContent = 'Carregar';
            btnCarregar.onclick = () => carregarCasa(nomeCasa, casa);
            const btnExcluir = document.createElement('button');
            btnExcluir.textContent = 'Excluir';
            btnExcluir.onclick = () => excluirCasa(nomeCasa);
            listItem.appendChild(btnCarregar);
            listItem.appendChild(btnExcluir);
            listaCasasUl.appendChild(listItem);
        });
    }

    function carregarCasa(nomeCasa, casaDados) {
        limparTudo();
        nomeCasaInput.value = nomeCasa;
        comodos = casaDados.comodos.map(c => ({...c}));
        areaTotal = casaDados.areaTotal;
        atualizarListaComodos();
    }

    function excluirCasa(nomeCasa) {
        let casas = JSON.parse(localStorage.getItem('casas')) || {};
        delete casas[nomeCasa];
        localStorage.setItem('casas', JSON.stringify(casas));
        carregarCasasSalvas();
    }

    function atualizarListaComodos() {
        listaComodosUl.innerHTML = '';
        comodos.forEach(c => {
            const listItem = document.createElement('li');
            listItem.textContent = `${c.nome} (${c.largura.toFixed(1)}m x ${c.comprimento.toFixed(1)}m): ${c.area.toFixed(2)} m²`;
            listaComodosUl.appendChild(listItem);
        });
        areaTotalH2.textContent = `Área Total: ${areaTotal.toFixed(2)} m²`;
    }

    function limparTudo() {
        comodos = [];
        areaTotal = 0;
        nomeCasaInput.value = '';
        listaComodosUl.innerHTML = '';
        areaTotalH2.textContent = 'Área Total: 0.00 m²';
    }
});*/


// continua daqui


/*document.addEventListener('DOMContentLoaded', () => {
    const nomeCasaInput = document.getElementById('nomeCasa');
    const nomeComodoInput = document.getElementById('nomeComodo');
    const larguraInput = document.getElementById('largura');
    const comprimentoInput = document.getElementById('comprimento');
    const addComodoBtn = document.getElementById('addComodo');
    const salvarCasaBtn = document.getElementById('salvarCasa');
    const listaComodosUl = document.getElementById('listaComodos');
    const areaTotalH2 = document.getElementById('areaTotal');
    const listaCasasUl = document.getElementById('listaCasas');

    let comodos = [];
    let areaTotal = 0;

    carregarCasasSalvas();

    addComodoBtn.addEventListener('click', () => {
        const nomeComodo = nomeComodoInput.value.trim();
        const largura = parseFloat(larguraInput.value);
        const comprimento = parseFloat(comprimentoInput.value);

        if (!nomeComodo || isNaN(largura) || isNaN(comprimento) || largura <= 0 || comprimento <= 0) {
            alert('Por favor, preencha todos os campos corretamente.');
            return;
        }

        const areaComodo = largura * comprimento;
        areaTotal += areaComodo;

        comodos.push({
            nome: nomeComodo,
            largura: largura,
            comprimento: comprimento,
            area: areaComodo
        });

        atualizarListaComodos();
    });

    salvarCasaBtn.addEventListener('click', () => {
        const nomeCasa = nomeCasaInput.value.trim();
        if (!nomeCasa) {
            alert('Por favor, insira um nome para a casa.');
            return;
        }
        if (comodos.length === 0) {
            alert('Adicione pelo menos um cômodo antes de salvar.');
            return;
        }

        let casas = JSON.parse(localStorage.getItem('casas')) || {};
        casas[nomeCasa] = { comodos: [...comodos], areaTotal };
        localStorage.setItem('casas', JSON.stringify(casas));

        alert(`Casa "${nomeCasa}" salva com sucesso!`);
        carregarCasasSalvas();
        limparTudo();
    });

    function carregarCasasSalvas() {
        listaCasasUl.innerHTML = '';
        let casas = JSON.parse(localStorage.getItem('casas')) || {};
        Object.keys(casas).forEach(nomeCasa => {
            const casa = casas[nomeCasa];
            const listItem = document.createElement('li');
            listItem.textContent = `${nomeCasa} - Total: ${casa.areaTotal.toFixed(2)} m² `;
            const btnCarregar = document.createElement('button');
            btnCarregar.textContent = 'Carregar';
            btnCarregar.onclick = () => carregarCasa(nomeCasa, casa);
            const btnExcluir = document.createElement('button');
            btnExcluir.textContent = 'Excluir';
            btnExcluir.onclick = () => excluirCasa(nomeCasa);
            listItem.appendChild(btnCarregar);
            listItem.appendChild(btnExcluir);
            listaCasasUl.appendChild(listItem);
        });
    }

    function carregarCasa(nomeCasa, casaDados) {
        limparTudo();
        nomeCasaInput.value = nomeCasa;
        comodos = casaDados.comodos.map(c => ({...c}));
        areaTotal = casaDados.areaTotal;
        atualizarListaComodos();
    }

    function excluirCasa(nomeCasa) {
        let casas = JSON.parse(localStorage.getItem('casas')) || {};
        delete casas[nomeCasa];
        localStorage.setItem('casas', JSON.stringify(casas));
        carregarCasasSalvas();
    }

    function atualizarListaComodos() {
        listaComodosUl.innerHTML = '';
        comodos.forEach(c => {
            const listItem = document.createElement('li');
            listItem.textContent = `${c.nome} (${c.largura.toFixed(1)}m x ${c.comprimento.toFixed(1)}m): ${c.area.toFixed(2)} m²`;
            listaComodosUl.appendChild(listItem);
        });
        areaTotalH2.textContent = `Área Total: ${areaTotal.toFixed(2)} m²`;
    }

    function limparTudo() {
        comodos = [];
        areaTotal = 0;
        nomeCasaInput.value = '';
        nomeComodoInput.value = '';
        larguraInput.value = '';
        comprimentoInput.value = '';
        listaComodosUl.innerHTML = '';
        areaTotalH2.textContent = 'Área Total: 0.00 m²';
    }
});*/


// Tentar de novo


document.addEventListener('DOMContentLoaded', () => {
    const nomeCasaInput = document.getElementById('nomeCasa');
    const nomeComodoInput = document.getElementById('nomeComodo');
    const larguraInput = document.getElementById('largura');
    const comprimentoInput = document.getElementById('comprimento');
    const addComodoBtn = document.getElementById('addComodo');
    const salvarCasaBtn = document.getElementById('salvarCasa');
    const listaComodosUl = document.getElementById('listaComodos');
    const areaTotalH2 = document.getElementById('areaTotal');
    const listaCasasUl = document.getElementById('listaCasas');

    let comodos = [];
    let areaTotal = 0;

    carregarCasasSalvas();

    addComodoBtn.addEventListener('click', () => {
        const nomeComodo = nomeComodoInput.value.trim();
        /*const largura = parseFloat(larguraInput.value);
        const comprimento = parseFloat(comprimentoInput.value);*/
        const largura = parseFloat(larguraInput.value.replace(',', '.'));
        const comprimento = parseFloat(comprimentoInput.value.replace(',', '.'));


        if (!nomeComodo || isNaN(largura) || isNaN(comprimento) || largura <= 0 || comprimento <= 0) {
            alert('Por favor, preencha todos os campos corretamente.');
            return;
        }

        const areaComodo = largura * comprimento;
        areaTotal += areaComodo;

        comodos.push({
            nome: nomeComodo,
            largura: largura,
            comprimento: comprimento,
            area: areaComodo
        });

        atualizarListaComodos();
        limparCamposComodo(); // Limpa os campos após adicionar
    });

    salvarCasaBtn.addEventListener('click', () => {
        const nomeCasa = nomeCasaInput.value.trim();
        if (!nomeCasa) {
            alert('Por favor, insira um nome para a casa.');
            return;
        }
        if (comodos.length === 0) {
            alert('Adicione pelo menos um cômodo antes de salvar.');
            return;
        }

        let casas = JSON.parse(localStorage.getItem('casas')) || {};
        casas[nomeCasa] = { comodos: [...comodos], areaTotal };
        localStorage.setItem('casas', JSON.stringify(casas));

        alert(`Casa "${nomeCasa}" salva com sucesso!`);
        carregarCasasSalvas();
        limparTudo();
    });

    function carregarCasasSalvas() {
        listaCasasUl.innerHTML = '';
        let casas = JSON.parse(localStorage.getItem('casas')) || {};
        Object.keys(casas).forEach(nomeCasa => {
            const casa = casas[nomeCasa];
            const listItem = document.createElement('li');
            listItem.textContent = `${nomeCasa} - Total: ${casa.areaTotal.toFixed(2)} m² `;
            const btnCarregar = document.createElement('button');
            btnCarregar.textContent = 'Carregar';
            btnCarregar.onclick = () => carregarCasa(nomeCasa, casa);
            const btnExcluir = document.createElement('button');
            btnExcluir.textContent = 'Excluir';
            btnExcluir.onclick = () => excluirCasa(nomeCasa);
            listItem.appendChild(btnCarregar);
            listItem.appendChild(btnExcluir);
            listaCasasUl.appendChild(listItem);
        });
    }

    function carregarCasa(nomeCasa, casaDados) {
        limparTudo();
        nomeCasaInput.value = nomeCasa;
        comodos = casaDados.comodos.map(c => ({...c}));
        areaTotal = casaDados.areaTotal;
        atualizarListaComodos();
    }

    function excluirCasa(nomeCasa) {
        let casas = JSON.parse(localStorage.getItem('casas')) || {};
        delete casas[nomeCasa];
        localStorage.setItem('casas', JSON.stringify(casas));
        carregarCasasSalvas();
    }

    function atualizarListaComodos() {
        listaComodosUl.innerHTML = '';
        comodos.forEach(c => {
            const listItem = document.createElement('li');
            listItem.textContent = `${c.nome} (${c.largura.toFixed(1)}m x ${c.comprimento.toFixed(1)}m): ${c.area.toFixed(2)} m²`;
            listaComodosUl.appendChild(listItem);
        });
        areaTotalH2.textContent = `Área Total: ${areaTotal.toFixed(2)} m²`;
    }

    function limparCamposComodo() {
        nomeComodoInput.value = '';
        larguraInput.value = '';
        comprimentoInput.value = '';
        nomeComodoInput.focus();
    }

    function limparTudo() {
        comodos = [];
        areaTotal = 0;
        nomeCasaInput.value = '';
        listaComodosUl.innerHTML = '';
        areaTotalH2.textContent = 'Área Total: 0.00 m²';
        limparCamposComodo();
    }
});