const cursoModel = require('../models/cursoModel');

const getAllCursos = async (req, res) => {
    try {
        const cursos = await cursoModel.getAll();
        res.status(200).json(cursos);
    } catch (error) {
        console.error('Erro ao buscar cursos:', error);
        res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
};

const getCursoById = async (req, res) => {
    const { id } = req.params;
    try {
        const curso = await cursoModel.getById(id);
        if (curso) {
            res.status(200).json(curso);
        } else {
            res.status(404).json({ mensagem: 'Curso não encontrado' });
        }
    } catch (error) {
        console.error('Erro ao buscar curso:', error);
        res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
};

const createCurso = async (req, res) => {
    const { nomeCurso } = req.body;
    if (!nomeCurso) {
        return res.status(400).json({ mensagem: 'O nome do curso é obrigatório' });
    }
    try {
        const novoCurso = await cursoModel.create(nomeCurso);
        res.status(201).json(novoCurso);
    } catch (error) {
        console.error('Erro ao criar curso:', error);
        res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
};

const updateCurso = async (req, res) => {
    const { id } = req.params;
    const { nomeCurso } = req.body;
    if (!nomeCurso) {
        return res.status(400).json({ mensagem: 'O nome do curso é obrigatório' });
    }
    try {
        const cursoAtualizado = await cursoModel.update(id, nomeCurso);
        if (cursoAtualizado) {
            res.status(200).json(cursoAtualizado);
        } else {
            res.status(404).json({ mensagem: 'Curso não encontrado' });
        }
    } catch (error) {
        console.error('Erro ao atualizar curso:', error);
        res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
};

const deleteCurso = async (req, res) => {
    const { id } = req.params;
    try {
        const cursoDeletado = await cursoModel.delete(id);
        if (cursoDeletado) {
            res.status(200).json({ mensagem: 'Curso deletado com sucesso' });
        } else {
            res.status(404).json({ mensagem: 'Curso não encontrado' });
        }
    } catch (error) {
        console.error('Erro ao deletar curso:', error);
        res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
};

module.exports = {
    getAllCursos,
    getCursoById,
    createCurso,
    updateCurso,
    deleteCurso
};