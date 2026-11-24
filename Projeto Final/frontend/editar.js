
const parametros = new URLSearchParams(window.location.search);
const id = parametros.get('id');

const form = document.getElementById('formEditar');
const mensagem = document.getElementById('mensagem');

// Buscar os dados do funcionário
async function carregarDados() {
    try {
        const resposta = await fetch('http://localhost:3000/api/funcionarios');
        const funcionarios = await resposta.json();

        const funcionario = funcionarios.find(f => f.id == id);

        if (!funcionario) {
            mensagem.textContent = 'Funcionário não encontrado.';
            return;
        }

        document.getElementById('nome').value = funcionario.nome;
        document.getElementById('funcao').value = funcionario.funcao;
        document.getElementById('salario').value = funcionario.salario;
        document.getElementById('email').value = funcionario.email;
        document.getElementById('data_admissao').value =
            new Date(funcionario.data_admissao).toISOString().split('T')[0];
        document.getElementById('status').value = funcionario.status;
        document.getElementById('departamento_id').value =
            funcionario.DEPARTAMENTOS_id || '';

    } catch (erro) {
        mensagem.textContent = 'Erro ao carregar funcionário.';
        console.log(erro);
    }
}

carregarDados();

// Salvar alterações
form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const funcionario = {
        nome: document.getElementById('nome').value,
        funcao: document.getElementById('funcao').value,
        salario: document.getElementById('salario').value,
        email: document.getElementById('email').value,
        data_admissao: document.getElementById('data_admissao').value,
        status: document.getElementById('status').value,
        departamento_id: document.getElementById('departamento_id').value
    };

    try {
        const resposta = await fetch(`http://localhost:3000/api/funcionarios/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(funcionario)
        });

        const dados = await resposta.json();

        mensagem.textContent = dados.mensagem;
        mensagem.style.color = resposta.ok ? 'green' : 'red';

        if (resposta.ok) {
            setTimeout(() => {
                window.location.href = 'funcionarios.html';
            }, 1000);
        }

    } catch (erro) {
        mensagem.textContent = 'Erro ao conectar com o servidor.';
        mensagem.style.color = 'red';
    }
});
