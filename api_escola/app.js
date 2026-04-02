require('dotenv').config();
const express = require('express');
const pool = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const cursoRouter = require('./src/routes/cursoRoutes');
const turmaRouter = require('./src/routes/turmaRoutes');
const alunoRouter = require('./src/routes/alunoRoutes');

app.use('/cursos', cursoRouter);
app.use('/turmas', turmaRouter);
app.use('/alunos', alunoRouter);

app.get('/', (req, res) => {
    res.send('API REST com Node.js e PostgreSQL está funcionando!');
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
    console.log(`Acesse http://localhost:${PORT}/api/cursos`);
    console.log(`Acesse http://localhost:${PORT}/api/turmas`);
    console.log(`Acesse http://localhost:${PORT}/api/alunos`);
});