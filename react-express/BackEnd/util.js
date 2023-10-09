import jwt, { decode } from 'jsonwebtoken';  //biblioteca de importação webtoken
//import config from './config'; //conexão com o banco

const getToken = (servidor) => { //informações de acesso do usuário
    return jwt.sign({
        id    : servidor.id,
        nome  : servidor.nome,
        stuser: servidor.status
    },
    config.JWT_SECRET,
    {
        expiresIn:'24h',
    });
};

const acesso = (req, res, next) => {
    const token = req.headers.authorization;

    if (token){
        const TOKEN = token.slice(7, token.length);

        jwt.verify(TOKEN, config.JWT_SECRET, (err, decode)=>{
            if (err){
                return res.status(401).send({ message: 'Token Inválido!'})
            }
            req.servidor = decode;
            next();
            return;
        });
    }
    else{
        return res.status(401).send({ message: 'Token não suportado!'})
    }

    if(servidor.status = 1){
        return res.status(401).send({ message: 'Usuário Inativo!'})
    }
};