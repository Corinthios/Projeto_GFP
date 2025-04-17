import pkg from "pg";
import dotenv from "dotenv";

const { Pool } = pkg;
dotenv.config();

// const BD = new Pool({
//     connectionString: process.env.DATABASE_URL,
// });

const BD = new Pool({
    // connectionString: process.env.DATABASE_URL,
    user: 'postgres', // Nome usuário do banco de dados
    host: 'localhost', // Endereço do servidor
    database: 'bd_gfp', // Nome do banco de dados
    password: 'admin', // Senha do banco de dados
    port: 5432, // Porta de conexão do servidor
});

const testarConexao = async () => {
    try {
        const client = await BD.connect(); // Tenta estabelecer uma conexão com o banco de dados
        console.log("✔ Conexão com o banco de dados estabelecida com sucesso!");
        client.release(); // Libera o client        
    } catch (error) {
        console.error("Erro ao conectar ao banco de dados", error.message);
       
    }
}


export { BD, testarConexao };

