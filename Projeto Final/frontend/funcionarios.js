
const lista = document.getElementById('listaFuncionarios');

async function carregarFuncionarios() {
    try {
        const resposta = await fetch('http://localhost:3000/api/funcionarios');
        const funcionarios = await resposta.json();

        lista.innerHTML = '';

        if (funcionarios.length === 0) {
            lista.innerHTML = '<p>Nenhum funcionário cadastrado.</p>';
            return;
        }

        funcionarios.forEach(funcionario => {
            lista.innerHTML += `
                <div class="funcionario">
                    <div>
                        <h3>${funcionario.nome}</h3>
                        <p>Função: ${funcionario.funcao || 'Não informada'}</p>
                        <p>E-mail: ${funcionario.email || 'Não informado'}</p>
                        <p>Departamento: ${funcionario.departamento || 'Não informado'}</p>
                        <p>Salário: R$ ${Number(funcionario.salario).toFixed(2).replace('.', ',')}</p>
                    </div>
                    
                    <span class="status">${funcionario.status}</span>
                    <button onclick="window.location.href='editar.html?id=${funcionario.id}'">
                        Editar
                    </button>
                    <button onclick="excluirFuncionario(${funcionario.id})">
                        Excluir
                    </button>
                </div>
            `;
        });

    } catch (erro) {
        lista.innerHTML = '<p>Erro ao carregar funcionários.</p>';
        console.log(erro);
    }
}

carregarFuncionarios();


async function excluirFuncionario(id) {
    const confirmar = confirm('Tem certeza que deseja excluir este funcionário?');

    if (!confirmar) {
        return;
    }

    try {
        const resposta = await fetch(
            `http://localhost:3000/api/funcionarios/${id}`,
            {
                method: 'DELETE'
            }
        );

        const dados = await resposta.json();

        if (resposta.ok) {
            alert(dados.mensagem);
            carregarFuncionarios();
        } else {
            alert(dados.mensagem);
        }

    } catch (erro) {
        alert('Erro ao conectar com o servidor.');
        console.log(erro);
    }
}

