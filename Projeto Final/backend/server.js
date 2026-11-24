
const express = require('express');
const cors = require('cors');
const db = require('./db');
const path = require('path');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));
// Rota inicial para testar o servidor
app.get('/', (req, res) => {
    res.send('/login.html');
});


app.post('/api/login', (req, res) => {
    const { login, senha } = req.body;

    const sql = 'SELECT * FROM USUARIOS WHERE login = ?';

    db.query(sql, [login], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                mensagem: 'Erro no servidor'
            });
        }

        if (results.length === 0) {
            return res.status(401).json({
                mensagem: 'Usuário não encontrado'
            });
        }

        const usuario = results[0];

        if (senha !== usuario.senha) {
            return res.status(401).json({
                mensagem: 'Senha incorreta'
            });
        }

        res.json({
            mensagem: 'Login realizado com sucesso!'
        });
    });
});


const PORT = 3000;


app.get('/api/funcionarios', (req, res) => {
    const sql = `
        SELECT 
            f.id,
            f.nome,
            f.funcao,
            f.salario,
            f.email,
            f.data_admissao,
            f.status,
            d.nome AS departamento
        FROM FUNCIONARIOS f
        LEFT JOIN DEPARTAMENTOS d
        ON f.DEPARTAMENTOS_id = d.id
    `;

    db.query(sql, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                mensagem: 'Erro ao buscar funcionários'
            });
        }

        res.json(results);
    });
});


app.post('/api/funcionarios', (req, res) => {
    const {
        nome,
        funcao,
        salario,
        email,
        data_admissao,
        status,
        departamento_id
    } = req.body;

    const sql = `
        INSERT INTO FUNCIONARIOS
        (nome, funcao, salario, email, data_admissao, status, DEPARTAMENTOS_id)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [nome, funcao, salario, email, data_admissao, status, departamento_id],
        (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    mensagem: 'Erro ao cadastrar funcionário'
                });
            }

            res.status(201).json({
                mensagem: 'Funcionário cadastrado com sucesso!',
                id: result.insertId
            });
        }
    );
});


app.put('/api/funcionarios/:id', (req, res) => {
    const { id } = req.params;

    const {
        nome,
        funcao,
        salario,
        email,
        data_admissao,
        status,
        departamento_id
    } = req.body;

    const sql = `
        UPDATE FUNCIONARIOS
        SET nome = ?,
            funcao = ?,
            salario = ?,
            email = ?,
            data_admissao = ?,
            status = ?,
            DEPARTAMENTOS_id = ?
        WHERE id = ?
    `;

    db.query(
        sql,
        [nome, funcao, salario, email, data_admissao, status, departamento_id, id],
        (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    mensagem: 'Erro ao atualizar funcionário'
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    mensagem: 'Funcionário não encontrado'
                });
            }

            res.json({
                mensagem: 'Funcionário atualizado com sucesso!'
            });
        }
    );
});


app.delete('/api/funcionarios/:id', (req, res) => {
    const { id } = req.params;

    const sql = 'DELETE FROM FUNCIONARIOS WHERE id = ?';

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                mensagem: 'Erro ao excluir funcionário'
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                mensagem: 'Funcionário não encontrado'
            });
        }

        res.json({
            mensagem: 'Funcionário excluído com sucesso!'
        });
    });
});


app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
