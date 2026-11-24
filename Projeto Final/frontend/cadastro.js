
const form = document.getElementById('formCadastro');

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

    const mensagem = document.getElementById('mensagem');

    try {
        const resposta = await fetch('http://localhost:3000/api/funcionarios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(funcionario)
        });

        const dados = await resposta.json();

        mensagem.textContent = dados.mensagem;
        mensagem.style.color = resposta.ok ? 'green' : 'red';

        if (resposta.ok) {
            form.reset();
        }

    } catch (erro) {
        mensagem.textContent = 'Erro ao conectar com o servidor.';
        mensagem.style.color = 'red';
    }
});
