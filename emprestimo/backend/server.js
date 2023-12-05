const express = require("express");
const mysql = require("mysql2");
const cors = require("cors"); // Importe o módulo cors
const app = express();

const port = 5000;

// Configuração do CORS para permitir solicitações do frontend
const corsOptions = {
  origin: "http://localhost:3000", // A URL do seu frontend
};

app.use(cors(corsOptions));
app.use(express.json()); // Middleware para fazer o parsing do corpo JSON

// Configuração da conexão com o banco de dados MariaDB
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123",
  database: "emprestimo_chaves",
});

connection.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err);
    return;
  }
  console.log("Conexão com o banco de dados MariaDB estabelecida.");
});

// Rota para listar chaves disponíveis
app.get("/api/chaves-disponiveis", (req, res) => {
  const query = "SELECT * FROM chave WHERE situacao = true";
  connection.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: "Erro ao listar chaves disponíveis." });
    } else {
      res.json(results);
    }
  });
});

// Rota para inserir uma nova chave
app.post("/api/inserir-chave", (req, res) => {
  // Verifica se a propriedade 'nome' está presente em req.body
  if (!req.body || !req.body.nome) {
    return res
      .status(400)
      .json({ error: 'Dados inválidos. Propriedade "nome" ausente.' });
  }

  const { nome } = req.body;

  if (!nome || nome.trim() === "") {
    return res
      .status(400)
      .json({ error: "O nome da chave não pode estar em branco." });
  }

  const verificaChaveQuery = `SELECT * FROM chave WHERE nome = ?`;
  connection.query(verificaChaveQuery, [nome], (err, results) => {
    if (err) {
      console.error("Erro na verificação da chave:", err);
      return res.status(500).json({ error: "Erro ao verificar a chave." });
    }

    if (results.length > 0) {
      return res
        .status(400)
        .json({ error: "Já existe uma chave com o mesmo nome." });
    }

    const inserirChaveQuery = `INSERT INTO chave (nome, status, situacao) VALUES (?, true, true)`;
    connection.query(inserirChaveQuery, [nome], (err) => {
      if (err) {
        console.error("Erro na inserção da chave:", err);
        return res.status(500).json({ error: "Erro ao inserir a chave." });
      }
      res.status(200).json({ message: "Chave inserida com sucesso" });
    });
  });
});

// Rota para buscar uma chave pelo nome
app.get("/api/buscar-chave/:nome", (req, res) => {
  const nomeChave = req.params.nome;
  const query = "SELECT * FROM chave WHERE nome = ?";
  connection.query(query, [nomeChave], (err, results) => {
    if (err) {
      res.status(500).json({ error: "Erro ao buscar a chave." });
    } else {
      if (results.length > 0) {
        res.json(results[0]); // Retorna a primeira chave encontrada (ou ajuste conforme necessário)
      } else {
        res.status(404).json({ error: "Chave não encontrada." });
      }
    }
  });
});

// Rota para alterar uma chave pelo ID
app.put("/api/alterar-chave/:id", (req, res) => {
  const chaveId = req.params.id;
  const { nome, situacao } = req.body;
  const query = "UPDATE chave SET nome = ?, situacao = ? WHERE id = ?";
  connection.query(query, [nome, situacao, chaveId], (err, results) => {
    if (err) {
      res.status(500).json({ error: "Erro ao alterar a chave." });
    } else {
      res.json({ message: "Chave alterada com sucesso." });
    }
  });
});

// Rota para remover (desativar) uma chave pelo ID
app.put('/api/remover-chave/:id', (req, res) => {
    const chaveId = req.params.id;
    const query = 'UPDATE chave SET situacao = false WHERE id = ?';
    connection.query(query, [chaveId], (err, results) => {
      if (err) {
        res.status(500).json({ error: 'Erro ao remover a chave.' });
      } else {
        res.json({ message: 'Chave removida com sucesso.' });
      }
    });
  });

app.listen(port, () => {
  console.log(`Servidor Express está rodando na porta ${port}`);
});
