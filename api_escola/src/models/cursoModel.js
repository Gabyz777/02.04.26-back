const pool = require('../../db');

const getAll = async () => {
    const result = await pool.query('SELECT * FROM cursos ORDER BY idCurso');
    return result.rows;
};

const getById = async (id) => {
    const result = await pool.query('SELECT * FROM cursos WHERE idCurso = $1', [id]);
    return result.rows[0];
};

const create = async (nomeCurso) => {
    const result = await pool.query('INSERT INTO cursos (nomeCurso) VALUES ($1) RETURNING *', 
    [nomeCurso]
    );
    return result.rows[0];
};

const update = async (id, nomeCurso) => {
    const result = await pool.query('UPDATE cursos SET nomeCurso = $1 WHERE idCurso = $2 RETURNING *', 
    [nomeCurso, id]
    );
    return result.rows[0];
}

const remove = async (id) => {
    const result = await pool.query('DELETE FROM cursos WHERE idCurso = $1 RETURNING *', [id]);
    return result.rows[0];
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
};