const turmaModel = require('../models/turmaModel');
const cursoModel = require('../models/cursoModel');

const getAllTurmas = async (req, res) => {
    try {
        const turmas = await turmaModel.getAll();
        res.status(200).json(turmas);
    } catch (error) {
        console.error('Erro ao buscar turmas:', error);
        res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
};

const getTurmaById = async (req, res) => {
    const { id } = req.params;
    try {
        const turma = await turmaModel.getById(id);
        if (turma) {
            res.status(200).json(turma);
        } else {
            res.status(404).json({ mensagem: 'Turma nao encontrada' });
        }
    } catch (error) {
        console.error('Erro ao buscar turma:', error);
        res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
};

const createTurma = async (req, res) => {
    const { idCurso, anoLetivo, periodo } = req.body;

    if (!idCurso || !anoLetivo || !periodo) {
        return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios' });
    }

    try {
        const curso = await cursoModel.getById(idCurso);
        if (!curso) {
            return res.status(404).json({ mensagem: 'Curso não encontrado' });
        }
        const novaturma = await turmaModel.create(idCurso, anoLetivo, periodo);
        res.status(201).json(novaturma);
    } catch (error) {
        console.error('Erro ao criar turma:', error);
        res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
};

const updateTurma = async (req, res) => {
    const { id } = req.params;
    const { idCurso, anoLetivo, periodo } = req.body;
    if (!idCurso || !anoLetivo || !periodo) {
        return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios' });
    }
    try {
        const turmaAtualizada = await turmaModel.update(id, idCurso, anoLetivo, periodo);
        if (turmaAtualizada) {
            res.status(200).json(turmaAtualizada);
        } else {
            res.status(404).json({ mensagem: 'Turma nao encontrada' });
        }
    } catch (error) {
        console.error('Erro ao atualizar turma:', error);
        res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
};

const deleteTurma = async (req, res) => {
    const { id } = req.params;
    try {
        const turmaDeletada = await turmaModel.remove(id);
        if (turmaDeletada) {
            res.status(200).json({ mensagem: 'Turma deletada com sucesso' });
        } else {
            res.status(404).json({ mensagem: 'Turma não encontrada' });
        }
    } catch (error) {
        console.error('Erro ao deletar turma:', error);
        res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
};

module.exports = {
    getAllTurmas,
    getTurmaById,
    createTurma,
    updateTurma,
    deleteTurma
};