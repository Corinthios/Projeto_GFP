import { BD } from "../db.js";

export class RotasLocaisTransacao {
    // Buscar todos os locais de transação
    static async buscarTodos(req, res) {
        try {
            const resultado = await BD.query(`SELECT * FROM local_transacao
                `);
            res.status(200).json(resultado.rows);
        } catch (error) {
            console.error('Erro ao buscar locais de transação:', error);
            res.status(500).json({ message: 'Erro ao buscar locais.', error: error.message });
        }
    }

    // Buscar local por ID
    static async buscarPorId(req, res) {
        const { id } = req.params;
        try {
            const resultado = await BD.query(`SELECT * FROM local_transacao
                 WHERE id_local_transacao = $1`, [id]);
            res.status(200).json(resultado.rows);
        } catch (error) {
            console.error('Erro ao buscar local de transação:', error);
            res.status(500).json({ message: 'Erro ao buscar local.', error: error.message });
        }
    }

    // Criar novo local de transação
    static async criar(req, res) {
        const { nome, tipo_local, saldo, ativo } = req.body;

        try {
            const resultado = await BD.query(
                `INSERT INTO local_transacao (nome, tipo_local, saldo, ativo) 
                 VALUES ($1, $2, $3, $4) RETURNING id_local_transacao`,
                [nome, tipo_local, saldo, ativo]
            );

            res.status(201).json({
                message: 'Local de transação criado com sucesso.',
                id: resultado.rows[0].id_local_transacao
            });
        } catch (error) {
            console.error('Erro ao criar local de transação:', error);
            res.status(500).json({ message: 'Erro ao criar local.', error: error.message });
        }
    }

    // Atualizar local de transação por ID (PUT)
    static async atualizar(req, res) {
        const { id } = req.params;
        const { nome, tipo_local, saldo, ativo } = req.body;

        try {
            const resultado = await BD.query(
                `UPDATE local_transacao

                 SET nome = $1, tipo_local = $2, saldo = $3, ativo = $4 
                 WHERE id_local_transacao = $5`,
                [nome, tipo_local, saldo, ativo, id]
            );

            if (resultado.rowCount === 0) {
                return res.status(404).json({ message: 'Local de transação não encontrado.' });
            }

            res.status(200).json({ message: 'Local de transação atualizado com sucesso!' });
        } catch (error) {
            console.error('Erro ao atualizar local de transação:', error);
            res.status(500).json({ message: 'Erro ao atualizar local.', error: error.message });
        }
    }

    // Atualizar todos os campos (pode usar o mesmo do PUT)
   static async atualizarTodosCampos(req, res) {
       const { id } = req.params;
       const { nome, tipo_local, saldo, ativo } = req.body;

       try {
           const resultado = await BD.query(               
               `UPDATE local_transacao SET nome = $1, tipo_local = $2, saldo = $3, ativo = $4 WHERE id_local_transacao = $5`,
               [nome, tipo_local, saldo, ativo, id]
           );

           if (resultado.rowCount === 0) {
               return res.status(404).json({ message: 'Local de transação nao encontrado.' });
           }

           res.status(200).json({ message: 'Local de transação atualizado com sucesso!' }); 
       } catch (error) {
           console.error('Erro ao atualizar local de transação:', error);   
           res.status(500).json({ message: 'Erro ao atualizar local.', error: error.message }); 
       }
   }
    // Deletar local
    static async deletar(req, res) {
        const { id } = req.params;

        try {
            const resultado = await BD.query(`DELETE FROM local_transacao
                 WHERE id_local_transacao = $1`, [id]);

            if (resultado.rowCount === 0) {
                return res.status(404).json({ message: 'Local de transação não encontrado.' });
            }

            res.status(200).json({ message: 'Local de transação deletado com sucesso!' });
        } catch (error) {
            console.error('Erro ao deletar local de transação:', error);
            res.status(500).json({ message: 'Erro ao deletar local.', error: error.message });
        }
    }
}

export default RotasLocaisTransacao;
