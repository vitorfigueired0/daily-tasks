const express = require('express');
const { sequelize } = require('./models');
const { routes } = require('./routes');
const { isTokenValid } = require('./util/jwt')
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3333;

const noTokenRequisitions = ['/auth', '/user']

const corsOptions = {
  origin: process.env.HOSTNAME_FRONTEND, 
  optionsSuccessStatus: 200
};

const jwtVerify = (req, res, next) => {
  if(noTokenRequisitions.includes(req.url) && req.method === 'POST') {
    next();
    return;
  }

  const token = req.headers['authorization']
  const decoded = isTokenValid(token)
  if(!decoded) return res.status(401).json({ error: 'Unauthorized' });
  
  req.currentUser = decoded
  next();
};

app.use(cors(corsOptions));
app.use(jwtVerify)
app.use(express.json());
app.use('/', routes);


app.listen(PORT, async () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  try {
    await sequelize.authenticate();
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
  } catch (error) {
    console.error('Não foi possível conectar ao banco de dados:', error);
  }
});
