import { BD } from "../db.js";
import bcrypt from "bcrypt";

class RotasUsuarios {
    // Rota para cadastrar um usuário
    static async cadastrar(req, res) {
        const { nome, email, senha, tipo_acesso } = req.body;

        if (!email || !senha || !nome || !tipo_acesso) {
            return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
        }

        const saltRounds = 10;
        const senhaCriptografada = await bcrypt.hash(senha, saltRounds);
        try { 
            const usuario = await BD.query(
                `INSERT INTO usuarios (nome, email, senha, tipo_acesso) VALUES ($1, $2, $3, $4)`, 
                [nome, email, senhaCriptografada, tipo_acesso]
            );
            
            res.status(201).json('Usuário cadastrado com sucesso!');
        } catch (error) {
            console.error('Erro ao cadastrar o usuário:', error);
            res.status(500).json({ message: 'Erro ao cadastrar o usuário.', error: error.message });
        }
    }

    // Rota para buscar todos os usuários
    static async buscarTodos(req, res) {
        try {
            const resultado = await BD.query(`SELECT * FROM usuarios`);
            res.status(200).json(resultado.rows);
        } catch (error) {
            console.error('Erro ao buscar usuários:', error);
            res.status(500).json({ message: 'Erro ao buscar usuários.', error: error.message });
        }
    }

    // Rota de login
    static async login(req, res) {
        const { email, senha } = req.body;

        try {
            // Buscar o usuário pelo e-mail
            const result = await BD.query('SELECT * FROM usuarios WHERE email = $1', [email]);

            if (result.rows.length === 0) {
                return res.status(404).json({ message: 'Usuário não encontrado.' });
            }

            const usuario = result.rows[0];

            // Verificar se a senha está correta
            const senhaOk = await bcrypt.compare(senha, usuario.senha);
            if (!senhaOk) {
                return res.status(401).json({ message: 'Senha incorreta.' });
            }

            // Retornar os dados do usuário sem a senha
            const { senha: _, ...usuarioSemSenha } = usuario;
            res.status(200).json({ message: 'Login realizado com sucesso!', usuario: usuarioSemSenha });

        } catch (error) {
            console.error('Erro ao realizar login:', error);
            res.status(500).json({ message: 'Erro ao realizar login.', error: error.message });
        }
    }

    // Rota para atualizar um campo específico
    static async atualizarCampo(req, res) {
        const { id } = req.params;
        const { campo, valor } = req.body;

        if (!campo || !valor) {
            return res.status(400).json({ message: 'Campo e valor são necessários.' });
        }

        if (campo === 'senha') {
            const saltRounds = 10;
            const senhaCriptografada = await bcrypt.hash(valor, saltRounds);
            valor = senhaCriptografada;
        }

        try {
            const resultado = await BD.query(
                `UPDATE usuarios SET ${campo} = $1 WHERE id = $2`, [valor, id]
            );

            if (resultado.rowCount === 0) {
                return res.status(404).json({ message: 'Usuário não encontrado.' });
            }

            res.status(200).json({ message: `${campo} atualizado com sucesso!` });
        } catch (error) {
            console.error('Erro ao atualizar o campo:', error);
            res.status(500).json({ message: 'Erro ao atualizar o campo.', error: error.message });
        }
    }

    // Rota para atualizar todos os campos de um usuário
    static async atualizarTodosCampos(req, res) {
        const { id } = req.params;
        const { nome, email, senha, tipo_acesso } = req.body;

        if (!nome || !email || !senha || !tipo_acesso) {
            return res.status(400).json({ message: 'Nome, email, senha e tipo_acesso são obrigatórios.' });
        }

        const saltRounds = 10;
        const senhaCriptografada = await bcrypt.hash(senha, saltRounds);

        try {
            const resultado = await BD.query(
                `UPDATE usuarios
                 SET nome = $1, email = $2, senha = $3, tipo_acesso = $4
                 WHERE id_usuario = $5`,
                [nome, email, senhaCriptografada, tipo_acesso, id]
            );

            if (resultado.rowCount === 0) {
                return res.status(404).json({ message: 'Usuário não encontrado.' });
            }

            res.status(200).json({ message: 'Usuário atualizado com sucesso!' });
        } catch (error) {
            console.error('Erro ao atualizar o usuário:', error);
            res.status(500).json({ message: 'Erro ao atualizar o usuário.', error: error.message });
        }
    }

    // Rota para deletar um usuário
    static async deletar(req, res) {
        const { id } = req.params;

        try {
            // Deletar o usuário pelo ID
            const resultado = await BD.query(`UPDATE usuarios SET ativo = false WHERE id_usuario = $1`, [id]);

            if (resultado.rowCount === 0) {
                return res.status(404).json({ message: 'Usuário não encontrado.' });
            }

            res.status(200).json({ message: 'Usuário deletado com sucesso!' });
        } catch (error) {
            console.error('Erro ao deletar o usuário:', error);
            res.status(500).json({ message: 'Erro ao deletar o usuário.', error: error.message });
        }
    }
}

export default RotasUsuarios;
