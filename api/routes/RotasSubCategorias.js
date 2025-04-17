import {BD} from "../db.js";


class RotasSubCategorias {
    static async buscarTodos(req, res) {
        try {
            const resultado = await BD.query(`SELECT * FROM subcategorias`);
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
            const resultado = await BD.query(`SELECT * FROM subcategorias WHERE id_subcategoria = $1`, [id]);
            res.status(200).json(resultado.rows);
        } catch (error) {
            console.error('Erro ao buscar usuários:', error);
            res.status(500).json({ message: 'Erro ao buscar usuários.', error: error.message });
        }
    }   

    static async cadastrar(req, res) {
        const{nome,id_categoria,gasto_fixo,ativo} = req.body;
        try {
            const resultado = await BD.query( 
                `INSERT INTO subcategorias (nome,id_categoria,gasto_fixo,ativo) VALUES ($1, $2, $3, $4)`,
                [nome,id_categoria,gasto_fixo,ativo]                
            );
            res.status(200).json('Subcategoria cadastrada com sucesso!');
        } catch (error) {
            console.error('Erro ao cadastrar o usuário:', error);
            res.status(500).json({ message: 'Erro ao cadastrar o usuário.', error: error.message });
        }
    }
    //Atualizar 
    static async atualizar(req, res) {
        const { id } = req.params;
        const { nome, id_categoria, gasto_fixo, ativo } = req.body;
    
        const campos = [];
        const valores = [];
        let i = 1;
    
        nome !== undefined && (campos.push(`nome = $${i++}`), valores.push(nome));
        id_categoria !== undefined && (campos.push(`id_categoria = $${i++}`), valores.push(id_categoria));
        gasto_fixo !== undefined && (campos.push(`gasto_fixo = $${i++}`), valores.push(gasto_fixo));
        ativo !== undefined && (campos.push(`ativo = $${i++}`), valores.push(ativo));
    
        if (campos.length === 0) {
            return res.status(400).json({ message: 'Nenhum campo para atualizar.' });
        }
    
        const query = `UPDATE subcategorias SET ${campos.join(', ')} WHERE id_subcategoria = $${i}`;
        valores.push(id);
    
        try {
            const resultado = await BD.query(query, valores);
    
            if (resultado.rowCount === 0) {
                return res.status(404).json({ message: 'Subcategoria não encontrada.' });
            }
    
            res.status(200).json({ message: 'Subcategoria atualizada com sucesso!' });
        } catch (error) {
            console.error('Erro ao atualizar a subcategoria:', error);
            res.status(500).json({ message: 'Erro ao atualizar a subcategoria.', error: error.message });
        }
    }
    // Atualizar todos os Campos 
    
    static async atualizarTodosCampos(req, res) {
        const { id } = req.params;
        const { nome, id_categoria, gasto_fixo, ativo } = req.body;
    
        try {
            const resultado = await BD.query(
                `UPDATE subcategorias 
                 SET nome = $1, id_categoria = $2, gasto_fixo = $3, ativo = $4 
                 WHERE id_subcategoria = $5`,
                [nome, id_categoria, gasto_fixo, ativo, id]
            );
    
            if (resultado.rowCount === 0) {
                return res.status(404).json({ message: 'Subcategoria não encontrada.' });
            }
    
            res.status(200).json({ message: 'Subcategoria atualizada com sucesso!' });
        } catch (error) {
            console.error('Erro ao atualizar a subcategoria:', error);
            res.status(500).json({ message: 'Erro ao atualizar a subcategoria.', error: error.message });
        }
    }
    static async deletar(req, res) {
        const { id } = req.params;
    
        try {
            const resultado = await BD.query(`DELETE FROM subcategorias WHERE id_subcategoria = $1`, [id]);
    
            if (resultado.rowCount === 0) {
                return res.status(404).json({ message: 'Subcategoria não encontrada.' });
            }
    
            res.status(200).json({ message: 'Subcategoria deletada com sucesso!' });
        } catch (error) {
            console.error('Erro ao deletar a subcategoria:', error);
            res.status(500).json({ message: 'Erro ao deletar a subcategoria.', error: error.message });
        }
    }
    
}

export default RotasSubCategorias;