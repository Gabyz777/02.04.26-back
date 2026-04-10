const alunoModel = require('../models/alunoModel');
const turmaModel = require('../models/turmaModel');

const getAllAlunos = async (req, res) => {
    try {
        const alunos = await alunoModel.getAll();
        res.status(200).json(alunos);
    } catch (error) {
        console.error('Erro ao buscar alunos:', error);
        res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
};

const getVisao = async (req, res) => {
    try {
        const alunos = await alunoModel.getVisao();
        res.status(200).json(alunos);
    } catch (error) {
        console.error('Erro ao visualizar:', error);
        res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
};

const getAlunoById = async (req, res) => {
    const { id } = req.params;
    try {
        const aluno = await alunoModel.getById(id);
        if (aluno) {
            res.status(200).json(aluno);
        } else {
            res.status(404).json({ mensagem: 'Aluno não encontrado' });
        }
    } catch (error) {
        console.error('Erro ao buscar aluno:', error);
        res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
};

const createAluno = async (req, res) => {
    const { idTurma, nomeCompleto, cpf, dataNascimento, email } = req.body;

    if (!idTurma || !nomeCompleto || !cpf) {
        return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios' });
    }
    try {
        const turma = await turmaModel.getById(idTurma);
        if (!turma) {
            return res.status(404).json({ mensagem: 'Turma não encontrada' });
        }
        const novoAluno = await alunoModel.create(idTurma, nomeCompleto, cpf, dataNascimento, email);
        res.status(201).json(novoAluno);
    } catch (error) {
        console.error('Erro ao criar aluno:', error);
        res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
};

const updateAluno = async (req, res) => {
    const { id } = req.params;
    const { idTurma, nomeCompleto, cpf, dataNascimento, email } = req.body;
    if (!nomeCompleto || !idTurma) {
        return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios' });
    }
    try {
        const alunoAtualizado = await alunoModel.update(id, idTurma, cpf, dataNascimento, email);
        if (alunoAtualizado) {
            res.status(200).json(alunoAtualizado);
        } else {
            res.status(404).json({ mensagem: 'Aluno nao encontrado' });
        }
    } catch (error) {
        console.error('Erro ao atualizar aluno:', error);
        res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
};

const deleteAluno = async (req, res) => {
    const { id } = req.params;
    try {
        const alunoDeletado = await alunoModel.remove(id);
        if (alunoDeletado) {
            res.status(200).json({ mensagem: 'Aluno deletado com sucesso' });
        } else {
            res.status(404).json({ mensagem: 'Aluno nao encontrado' });
        }
    } catch (error) {
        console.error('Erro ao deletar aluno:', error);
        res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
};

module.exports = {
    getAllAlunos,
    getVisao,
    getAlunoById,
    createAluno,
    updateAluno,
    deleteAluno
};