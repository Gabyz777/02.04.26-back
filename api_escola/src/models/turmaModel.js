{/* create table cursos ( idCurso serial primary key, nomeCurso varchar(100) not null ) create table turmas ( idTurma serial primary key, idCurso int references cursos(idCurso), anoLetivo int, periodo varchar(20) ) create table alunos ( idAluno serial primary key, idTurma int references turmas(idTurma), nomeCompleto varchar(150), cpf char(14), dataNascimento date, email varchar(100) ) */}

const pool = require('../../db');

const getAll = async () => {
    const result = await pool.query(
        `SELECT t.idTurma, c.nomeCurso, t.anoLetivo, t.periodo 
        FROM turmas t 
        JOIN cursos c ON t.idCurso = c.idCurso
        ORDER BY t.idTurma`
    )
    return result.rows;
};

const getById = async (id) => {
    const result = await pool.query(
        `SELECT t.idTurma, c.nomeCurso, t.anoLetivo, t.periodo 
        FROM turmas t
        JOIN cursos c ON t.idCurso = c.idCurso
        WHERE t.idTurma = $1`,
        [id]
    )
    return result.rows[0];
};

const getByCursoId = async (id) => {
    const result = await pool.query(
        `SELECT t.idTurma, c.nomeCurso, t.anoLetivo, t.periodo 
        FROM turmas t
        JOIN cursos c ON t.idCurso = c.idCurso
        WHERE t.idCurso = $1
        ORDER BY t.idTurma`,
        [id]
    )
    return result.rows;
};

const create = async (idCurso, anoLetivo, periodo) => {
    const result = await pool.query(
        `INSERT INTO turmas (idCurso, anoLetivo, periodo) VALUES ($1, $2, $3) RETURNING *`,
        [idCurso, anoLetivo, periodo]
    )
    return result.rows[0];
};

const update = async (id, idCurso, anoLetivo, periodo) => {
    const result = await pool.query(
        `UPDATE turmas SET idCurso = $1, anoLetivo = $2, periodo = $3 WHERE idTurma = $4 RETURNING *`,
        [idCurso, anoLetivo, periodo, id]
    )
    return result.rows[0];
};

const remove = async (id) => {
    const result = await pool.query('DELETE FROM turmas WHERE idTurma = $1 RETURNING *', [id]);
    return result.rows[0];
};

module.exports = {
    getAll,
    getById,
    getByCursoId,
    create,
    update,
    remove
};