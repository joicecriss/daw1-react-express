//rodar comando npm install sequelize
const dbConfig = require('./config/database');
const Sequelize = require('sequelize');

// Crie uma instância do Sequelize usando as configurações apropriadas do arquivo de configuração
const chaves = new Sequelize(
    dbConfig.development.database,
    dbConfig.development.username,
    dbConfig.development.password,
    {
      host: dbConfig.development.host,
      dialect: dbConfig.development.dialect,
      // Outras opções de configuração, se necessário
    }
);

ProductReview.findAll({
    where: {
      // Condições para o filtro
      status: 'inativo',
      availability: 'disponivel',
    }
});