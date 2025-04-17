import { BD } from "../db.js";


class RotasCategorias {
    static async cadastrar(req, res) {
        const{nome,tipo_transacao,gasto_fixo,ativo,id_usuario} = req.body;
        try {
            const resultado = await BD.query(
                `INSERT INTO categorias (nome,tipo_transacao,gasto_fixo,ativo,id_usuario) VALUES ($1, $2, $3, $4, $5)`,
                [nome,tipo_transacao,gasto_fixo,ativo,id_usuario]
            );

            if (resultado.rowCount === 0) {
                return res.status(404).json({ message: 'Usuário nao encontrado.' });
            }

            res.status(200).json({ message: 'Usuário cadastrado com sucesso!' });
        } catch (error) {
            console.error('Erro ao cadastrar o usuário:', error);
            res.status(500).json({ message: 'Erro ao cadastrar o usuário.', error: error.message });
        }
    }

    // Rota para buscar todos as Categorias
    static async buscarTodos(req, res) {
        try {
            const resultado = await BD.query(`SELECT * FROM categorias`);
            res.status(200).json(resultado.rows);
        } catch (error) {
            console.error('Erro ao buscar usuários:', error);
            res.status(500).json({ message: 'Erro ao buscar usuários.', error: error.message });
        }
    }

    //Buscar por ID
    static async buscarPorId(req, res) {
        const { id } = req.params;

        try {
            const resultado = await BD.query(`SELECT * FROM categorias WHERE id_categoria = $1`, [id]);
            res.status(200).json(resultado.rows);
        } catch (error) {
            console.error('Erro ao buscar usuários:', error);
            res.status(500).json({ message: 'Erro ao buscar usuários.', error: error.message });
        }
    }

    //Atualizar por ID
    static async atualizar(req, res) {
        const { id } = req.params;
        const { nome, tipo_transacao, gasto_fixo, ativo, id_usuario } = req.body;
    
        const campos = [];
        const valores = [];
        let i = 1;
    
        nome !== undefined && (campos.push(`nome = $${i++}`), valores.push(nome));
        tipo_transacao !== undefined && (campos.push(`tipo_transacao = $${i++}`), valores.push(tipo_transacao));
        gasto_fixo !== undefined && (campos.push(`gasto_fixo = $${i++}`), valores.push(gasto_fixo));
        ativo !== undefined && (campos.push(`ativo = $${i++}`), valores.push(ativo));
        id_usuario !== undefined && (campos.push(`id_usuario = $${i++}`), valores.push(id_usuario));
    
        if (campos.length === 0) {
            return res.status(400).json({ message: 'Nenhum campo para atualizar.' });
        }
    
        const query = `UPDATE categorias SET ${campos.join(', ')} WHERE id_categoria = $${i}`;
        valores.push(id);
    
        try {
            const resultado = await BD.query(query, valores);
    
            if (resultado.rowCount === 0) {
                return res.status(404).json({ message: 'Categoria não encontrada.' });
            }
    
            res.status(200).json({ message: 'Categoria atualizada com sucesso!' });
        } catch (error) {
            console.error('Erro ao atualizar a categoria:', error);
            res.status(500).json({ message: 'Erro ao atualizar a categoria.', error: error.message });
        }
    }
    
    //atualizar todos os campos
    static async atualizarTodosCampos(req, res) {
        const { id } = req.params;
        const { nome, tipo_transacao, gasto_fixo, ativo, id_usuario } = req.body;

        try {
            const resultado = await BD.query(
                `UPDATE categorias SET nome = $1, tipo_transacao = $2, gasto_fixo = $3, ativo = $4, id_usuario = $5 WHERE id_categoria = $6`,
                [nome, tipo_transacao, gasto_fixo, ativo, id_usuario, id]
            );            

            if (resultado.rowCount === 0) {                
                return res.status(404).json({ message: 'Usuário nao encontrado.' });
            }

            res.status(200).json({ message: 'Usuário atualizado com sucesso!' });
        } catch (error) {
            console.error('Erro ao atualizar o usuário:', error);
            res.status(500).json({ message: 'Erro ao atualizar o usuário.', error: error.message });
        }
    }
    // Rota para deletar uma Categoria
    static async deletar(req, res) {
        const { id } = req.params;

        try {
            // Deletar o usuário pelo ID
            const resultado = await BD.query(`UPDATE categorias SET ativo = false WHERE id_categoria = $1`, [id]);

            if (resultado.rowCount === 0) {
                return res.status(404).json({ message: 'Usuário nao encontrado.' });
            }

            res.status(200).json({ message: 'Usuário deletado com sucesso!' });
        } catch (error) {
            console.error('Erro ao deletar o usuário:', error);
            res.status(500).json({ message: 'Erro ao deletar o usuário.', error: error.message });
        }
    }

}

export default RotasCategorias