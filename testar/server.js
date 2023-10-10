const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;

// Configuração da conexão com o banco de dados MariaDB
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'joice',
  database: 'emprestimo_chaves',
});

connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }else{
    console.log('Conexão com o banco de dados MariaDB estabelecida.');
  }
  
});

// Rota para listar chaves disponíveis
app.get('/api/chaves', (req, res) => {
  const query = 'SELECT * FROM chave WHERE situacao = true';
  connection.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Erro ao listar chaves disponíveis.' });
    } else {
      res.json(results);
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor Express está rodando na porta ${port}`);
});