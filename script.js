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
    const btnPdf = document.getElementById('btnPdf');

    let comodos = [];
    let areaTotal = 0;

    carregarCasasSalvas();

    addComodoBtn.addEventListener('click', () => {
        const nomeComodo = nomeComodoInput.value.trim();
        const largura = parseFloat(larguraInput.value.replace(',', '.'));
        const comprimento = parseFloat(comprimentoInput.value.replace(',', '.'));

        if (!nomeComodo || isNaN(largura) || isNaN(comprimento) || largura <= 0 || comprimento <= 0) {
            alert('Por favor, preencha todos os campos corretamente.');
            return;
        }

        const areaComodo = largura * comprimento;

        comodos.push({
            nome: nomeComodo,
            largura: largura,
            comprimento: comprimento,
            area: areaComodo
        });

        atualizarListaComodos();
        limparCamposComodo();
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

    // BOTÃO PDF - AGORA DENTRO DO MESMO ESCOPO
    btnPdf.addEventListener('click', () => {
        const nomeCasa = nomeCasaInput.value.trim() || 'Sem_Nome';

        if (comodos.length === 0) {
            alert('Adicione pelo menos um cômodo antes de exportar.');
            return;
        }

        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        let y = 20;

        doc.setFontSize(18);
        doc.text('Calculadora de Areas', 105, y, { align: 'center' });

        y += 15;
        doc.setFontSize(14);
        doc.text(`Casa: ${nomeCasa}`, 20, y);

        y += 8;
        doc.line(20, y, 190, y);

        y += 15;
        doc.setFontSize(12);
        doc.setFont(undefined, 'bold');
        doc.text('Comodo', 20, y);
        doc.text('Medidas', 80, y);
        doc.text('Area', 140, y);
        doc.setFont(undefined, 'normal');
        y += 8;
        doc.line(20, y, 190, y);
        y += 8;

        comodos.forEach(c => {
            doc.text(c.nome, 20, y);
            doc.text(`${c.largura.toFixed(1)}m x ${c.comprimento.toFixed(1)}m`, 80, y);
            doc.text(`${c.area.toFixed(2)} m2`, 140, y);
            y += 8;

            if (y > 270) {
                doc.addPage();
                y = 20;
            }
        });

        y += 10;
        doc.line(20, y, 190, y);
        y += 10;
        doc.setFontSize(14);
        doc.setFont(undefined, 'bold');
        doc.text(`AREA TOTAL: ${areaTotal.toFixed(2)} m2`, 20, y);

        y += 15;
        doc.setFontSize(10);
        doc.setFont(undefined, 'normal');
        const data = new Date().toLocaleDateString('pt-BR');
        doc.text(`Gerado em: ${data}`, 20, y);

        doc.save(`${nomeCasa.replace(/ /g, '_')}.pdf`);
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
        areaTotal = 0;

        comodos.forEach((c, index) => {
            const listItem = document.createElement('li');
            listItem.className = 'item-comodo';
            listItem.id = `comodo-${index}`;

            listItem.innerHTML = `
                <div class="inputs-comodo">
                    <input type="text" value="${c.nome}"
                           oninput="editarComodo(${index}, 'nome', this.value)" placeholder="Nome">
                    <input type="text" value="${c.largura}"
                           oninput="editarComodo(${index}, 'largura', this.value)" placeholder="Larg">
                    x
                    <input type="text" value="${c.comprimento}"
                           oninput="editarComodo(${index}, 'comprimento', this.value)" placeholder="Comp"> m
                </div>
                <span class="area-value" id="area-${index}">${c.area.toFixed(2)} m²</span>
                <button class="btn-excluir" onclick="excluirComodo(${index})">X</button>
            `;

            listaComodosUl.appendChild(listItem);
            areaTotal += c.area;
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

    window.editarComodo = (index, campo, valor) => {
        if (campo === 'nome') {
            comodos[index].nome = valor;
        } else {
            const numero = parseFloat(valor.replace(',', '.')) || 0;
            comodos[index][campo] = numero;
            comodos[index].area = comodos[index].largura * comodos[index].comprimento;
            document.getElementById(`area-${index}`).textContent = comodos[index].area.toFixed(2) + ' m²';
        }
        areaTotal = comodos.reduce((total, c) => total + c.area, 0);
        areaTotalH2.textContent = `Área Total: ${areaTotal.toFixed(2)} m²`;
    }

    window.excluirComodo = (index) => {
        if (confirm(`Excluir o cômodo "${comodos[index].nome}"?`)) {
            comodos.splice(index, 1);
            atualizarListaComodos();
        }
    }
});  // FIM DO DOMContentLoaded
