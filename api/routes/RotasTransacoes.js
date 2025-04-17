import { BD } from "../db.js";
export class RotasTransacoes {
    // Buscar todas as transações
    static async buscarTodos(req, res) {
        try {
            const resultado = await BD.query(`SELECT * FROM transacoes`);
            res.status(200).json(resultado.rows);
        } catch (error) {
            console.error('Erro ao buscar transações:', error);
            res.status(500).json({ message: 'Erro ao buscar transações.', error: error.message });
        }
    }

    // Buscar transação por ID
    static async buscarPorId(req, res) {
        const { id } = req.params;
        try {
            const resultado = await BD.query(`SELECT * FROM transacoes WHERE id_transacao = $1`, [id]);
            if (resultado.rowCount === 0) {
                return res.status(404).json({ message: 'Transação não encontrada.' });
            }
            res.status(200).json(resultado.rows[0]);
        } catch (error) {
            console.error('Erro ao buscar transação:', error);
            res.status(500).json({ message: 'Erro ao buscar transação.', error: error.message });
        }
    }

    // Criar nova transação
    static async criar(req, res) {
        const {
            valor,
            data_transacao,
            data_vencimento,
            data_pagamento,
            tipo_transacao,
            id_local_transacao,
            id_categoria,
            id_subcategoria,
            id_usuario,
            num_parcelas,
            parcela_atual
        } = req.body;

        // Validação de campos obrigatórios
        if (!valor || !data_transacao || !tipo_transacao || !id_usuario) {
            return res.status(400).json({ message: 'Campos obrigatórios não preenchidos!' });
        }

        // Validação de formato de data
        if (data_transacao && !isValidDate(data_transacao)) {
            return res.status(400).json({ message: 'Data de transação inválida.' });
        }
        if (data_vencimento && !isValidDate(data_vencimento)) {
            return res.status(400).json({ message: 'Data de vencimento inválida.' });
        }
        if (data_pagamento && !isValidDate(data_pagamento)) {
            return res.status(400).json({ message: 'Data de pagamento inválida.' });
        }

        try {
            await BD.query(
                `INSERT INTO transacoes 
                    (valor, data_transacao, data_vencimento, data_pagamento, tipo_transacao, 
                     id_local_transacao, id_categoria, id_subcategoria, id_usuario, 
                     num_parcelas, parcela_atual)
                 VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
                [
                    valor,
                    data_transacao,
                    data_vencimento,
                    data_pagamento,
                    tipo_transacao,
                    id_local_transacao,
                    id_categoria,
                    id_subcategoria,
                    id_usuario,
                    num_parcelas,
                    parcela_atual
                ]
            );
            res.status(200).json('Transação cadastrada com sucesso!');
        } catch (error) {
            console.error('Erro ao cadastrar transação:', error);
            res.status(500).json({ message: 'Erro ao cadastrar transação.', error: error.message });
        }
    }

    // Atualizar todos os campos da transação (PUT)
    static async atualizar(req, res) {
        const { id } = req.params;
        const {
            valor,
            data_transacao,
            data_vencimento,
            data_pagamento,
            tipo_transacao,
            id_local_transacao,
            id_categoria,
            id_subcategoria,
            id_usuario,
            num_parcelas,
            parcela_atual
        } = req.body;

        // Validação de campos obrigatórios
        if (!valor || !data_transacao || !tipo_transacao || !id_usuario) {
            return res.status(400).json({ message: 'Campos obrigatórios não preenchidos!' });
        }

        // Validação de formato de data
        if (data_transacao && !isValidDate(data_transacao)) {
            return res.status(400).json({ message: 'Data de transação inválida.' });
        }
        if (data_vencimento && !isValidDate(data_vencimento)) {
            return res.status(400).json({ message: 'Data de vencimento inválida.' });
        }
        if (data_pagamento && !isValidDate(data_pagamento)) {
            return res.status(400).json({ message: 'Data de pagamento inválida.' });
        }

        try {
            const resultado = await BD.query(
                `UPDATE transacoes SET 
                    valor = $1,
                    data_transacao = $2,
                    data_vencimento = $3,
                    data_pagamento = $4,
                    tipo_transacao = $5,
                    id_local_transacao = $6,
                    id_categoria = $7,
                    id_subcategoria = $8,
                    id_usuario = $9,
                    num_parcelas = $10,
                    parcela_atual = $11
                 WHERE id_transacao = $12`,
                [
                    valor,
                    data_transacao,
                    data_vencimento,
                    data_pagamento,
                    tipo_transacao,
                    id_local_transacao,
                    id_categoria,
                    id_subcategoria,
                    id_usuario,
                    num_parcelas,
                    parcela_atual,
                    id
                ]
            );

            if (resultado.rowCount === 0) {
                return res.status(404).json({ message: 'Transação não encontrada.' });
            }

            res.status(200).json({ message: 'Transação atualizada com sucesso!' });
        } catch (error) {
            console.error('Erro ao atualizar transação:', error);
            res.status(500).json({ message: 'Erro ao atualizar transação.', error: error.message });
        }
    }

    // Atualização parcial da transação (PATCH)
    static async atualizarParcial(req, res) {
        const { id } = req.params;
        const {
            valor,
            data_transacao,
            data_vencimento,
            data_pagamento,
            tipo_transacao,
            id_local_transacao,
            id_categoria,
            id_subcategoria,
            id_usuario,
            num_parcelas,
            parcela_atual
        } = req.body;

        const campos = [];
        const valores = [];
        let i = 1;

        valor !== undefined && (campos.push(`valor = $${i++}`), valores.push(valor));
        data_transacao !== undefined && (campos.push(`data_transacao = $${i++}`), valores.push(data_transacao));
        data_vencimento !== undefined && (campos.push(`data_vencimento = $${i++}`), valores.push(data_vencimento));
        data_pagamento !== undefined && (campos.push(`data_pagamento = $${i++}`), valores.push(data_pagamento));
        tipo_transacao !== undefined && (campos.push(`tipo_transacao = $${i++}`), valores.push(tipo_transacao));
        id_local_transacao !== undefined && (campos.push(`id_local_transacao = $${i++}`), valores.push(id_local_transacao));
        id_categoria !== undefined && (campos.push(`id_categoria = $${i++}`), valores.push(id_categoria));
        id_subcategoria !== undefined && (campos.push(`id_subcategoria = $${i++}`), valores.push(id_subcategoria));
        id_usuario !== undefined && (campos.push(`id_usuario = $${i++}`), valores.push(id_usuario));
        num_parcelas !== undefined && (campos.push(`num_parcelas = $${i++}`), valores.push(num_parcelas));
        parcela_atual !== undefined && (campos.push(`parcela_atual = $${i++}`), valores.push(parcela_atual));

        if (campos.length === 0) {
            return res.status(400).json({ message: 'Nenhum campo para atualizar.' });
        }

        const query = `UPDATE transacoes SET ${campos.join(', ')} WHERE id_transacao = $${i}`;
        valores.push(id);

        try {
            const resultado = await BD.query(query, valores);

            if (resultado.rowCount === 0) {
                return res.status(404).json({ message: 'Transação não encontrada.' });
            }

            res.status(200).json({ message: 'Transação atualizada parcialmente com sucesso!' });
        } catch (error) {
            console.error('Erro ao atualizar parcialmente a transação:', error);
            res.status(500).json({ message: 'Erro ao atualizar parcialmente a transação.', error: error.message });
        }
    }

    // Deletar transação
    static async deletar(req, res) {
        const { id } = req.params;

        try {
            const resultado = await BD.query(`DELETE FROM transacoes WHERE id_transacao = $1`, [id]);

            if (resultado.rowCount === 0) {
                return res.status(404).json({ message: 'Transação não encontrada.' });
            }

            res.status(200).json({ message: 'Transação deletada com sucesso!' });
        } catch (error) {
            console.error('Erro ao deletar transação:', error);
            res.status(500).json({ message: 'Erro ao deletar transação.', error: error.message });
        }
    }
}

export default RotasTransacoes;
