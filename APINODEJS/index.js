const express = require('express')

const app = express()

// Middleware para ler dados enviados em JSON
app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json())

// Rota inicial GET
app.get('/', (req, res) => {
    res.json({ message: 'Oi Express' })
})

// Iniciar o servidor na porta 3000
app.listen(3000)