
const form = document.getElementById('formLogin');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const login = document.getElementById('login').value;
    const senha = document.getElementById('senha').value;
    const mensagem = document.getElementById('mensagem');

    try {
        const resposta = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ login, senha })
        });

        const dados = await resposta.json();

        if (resposta.ok) {
            localStorage.setItem('logado', 'true');
            window.location.href = '/funcionarios.html';
        } else {
            mensagem.textContent = dados.mensagem;
            mensagem.style.color = 'red';
        }

    } catch (erro) {
        mensagem.textContent = 'Erro ao conectar com o servidor.';
        mensagem.style.color = 'red';
    }
});
