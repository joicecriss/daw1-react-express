import express from 'express';
import bodyParser from 'body-parser';
import config from './config';
import chaveRoute from '/routes/chaveRoute'; 


const app = express();

app.use(bodyParser.json());
app.use('/api/chaves', chaveRoute);

app.listen(config.PORT, () => {
    console.log('Servidor rodando em http://localhost:5000');
  });