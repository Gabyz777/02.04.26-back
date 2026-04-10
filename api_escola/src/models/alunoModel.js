{/* create table cursos ( idCurso serial primary key, nomeCurso varchar(100) not null ) create table turmas ( idTurma serial primary key, idCurso int references cursos(idCurso), anoLetivo int, periodo varchar(20) ) create table alunos ( idAluno serial primary key, idTurma int references turmas(idTurma), nomeCompleto varchar(150), cpf char(14), dataNascimento date, email varchar(100) ) */}

const pool = require('../../db');

const getAll = async () => {
    const result = await pool.query(
        `SELECT a.idAluno, a.nomeCompleto, a.cpf, a.dataNascimento, a.email, t.anoLetivo, t.periodo, c.nomeCurso
        FROM alunos a
        JOIN turmas t ON a.idTurma = t.idTurma
        JOIN cursos c ON t.idCurso = c.idCurso
        ORDER BY a.idAluno`
    );
    return result.rows;
};

const getById = async (id) => {
    const result = await pool.query(
        `SELECT a.idAluno, a.nomeCompleto, a.cpf, a.dataNascimento, a.email, t.anoLetivo, t.periodo, c.nomeCurso
        FROM alunos a
        JOIN turmas t ON a.idTurma = t.idTurma
        JOIN cursos c ON t.idCurso = c.idCurso
        WHERE a.idAluno = $1`,
        [id]
    );
    return result.rows[0];
};

const getByTurmaId = async (id) => {
    const result = await pool.query(
        `SELECT a.idAluno, a.nomeCompleto, a.cpf, a.dataNascimento, a.email, t.anoLetivo, t.periodo, c.nomeCurso
        FROM alunos a
        JOIN turmas t ON a.idTurma = t.idTurma
        JOIN cursos c ON t.idCurso = c.idCurso
        WHERE a.idTurma = $1
        ORDER BY a.idAluno`,
        [id]
    );
    return result.rows;
};

const create = async (idTurma, nomeCompleto, cpf, dataNascimento, email) => {
    const result = await pool.query(
        'INSERT INTO alunos (idTurma, nomeCompleto, cpf, dataNascimento, email) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [idTurma, nomeCompleto, cpf, dataNascimento, email]
    );
    return result.rows[0];
};

const update = async (id, idTurma, nomeCompleto, cpf, dataNascimento, email) => {
    const result = await pool.query(
        'UPDATE alunos SET idTurma = $1, nomeCompleto = $2, cpf = $3, dataNascimento = $4, email = $5 WHERE idAluno = $6 RETURNING *',
        [idTurma, nomeCompleto, cpf, dataNascimento, email, id]
    );
    return result.rows[0];
};

const remove = async (id) => {
    const result = await pool.query('DELETE FROM alunos WHERE idAluno = $1 RETURNING *', [id]);
    return result.rows[0];
}

module.exports = {
    getAll,
    getById,
    getByTurmaId,
    create,
    update,
    remove
};