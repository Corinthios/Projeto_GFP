import express from 'express';
import cors from 'cors';
import { testarConexao } from './db.js';

//rotasUsuarios
import RotasUsuarios from './routes/RotasUsuarios.js';
import RotasCategorias from './routes/RotasCategorias.js';
import RotasSubCategorias from './routes/RotasSubCategorias.js';
import RotasLocalTransacao from './routes/RotasLocalTransacao.js';
import RotasTransacoes from './routes/RotasTransacoes.js';

const app = express();
testarConexao();

app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.send("  API FUNCIONANDO");
});

// Rotas de Usuários
app.post('/usuarios', RotasUsuarios.cadastrar);
app.get('/usuarios', RotasUsuarios.buscarTodos);
app.post('/usuarios/login', RotasUsuarios.login);
app.put('/usuarios/:id', RotasUsuarios.atualizarCampo);
app.put('/usuarios/:id', RotasUsuarios.atualizarTodosCampos);
app.delete('/usuarios/:id', RotasUsuarios.deletar);

// Rotas de Categorias
app.post('/categorias', RotasCategorias.cadastrar);
app.get('/categorias', RotasCategorias.buscarTodos);
app.get('/categorias/:id', RotasCategorias.buscarPorId);
app.patch('/categorias/:id', RotasCategorias.atualizar);
app.put('/categorias/:id', RotasCategorias.atualizarTodosCampos);
app.delete('/categorias/:id', RotasCategorias.deletar);

// Rotas de SubCategorias
app.post('/subcategorias', RotasSubCategorias.cadastrar);
app.get('/subcategorias', RotasSubCategorias.buscarTodos);
app.get('/subcategorias/:id', RotasSubCategorias.buscarPorId);
app.patch('/subcategorias/:id', RotasSubCategorias.atualizar);
app.put('/subcategorias/:id', RotasSubCategorias.atualizarTodosCampos);
app.delete('/subcategorias/:id', RotasSubCategorias.deletar);

  


// Rotas de TransaçõesLocais
app.post('/transacoes_locais', RotasLocalTransacao.criar);
app.get('/transacoes_locais', RotasLocalTransacao.buscarTodos);
app.get('/transacoes_locais/:id', RotasLocalTransacao.buscarPorId);
app.patch('/transacoes_locais/:id', RotasLocalTransacao.atualizar);
app.put('/transacoes_locais/:id', RotasLocalTransacao.atualizarTodosCampos);
app.delete('/transacoes_locais/:id', RotasLocalTransacao.deletar);

// Rotas de Transações
app.post('/transacoes', RotasTransacoes.criar);
app.get('/transacoes', RotasTransacoes.buscarTodos);
app.get('/transacoes/:id', RotasTransacoes.buscarPorId);
app.patch('/transacoes/:id', RotasTransacoes.atualizar);
// app.put('/transacoes/:id', RotasTransacoes.atualizarTodosCampos);
// app.delete('/transacoes/:id', RotasTransacoes.deletar);
//Server iniciado 
const porta = 3000;
app.listen(porta, () => {
    console.log(`Api http://localhost:${porta}`);
})
