const knex = require("../database/database");
const jwt = require("jsonwebtoken");

const loginVerify = async (req, res, next) => {

  const errorMessages = {
    checkTokenInfos: "Para acessar este recurso um token de autenticação válido deve ser enviado.",
};

  try {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({
          erro: errorMessages.checkTokenInfos,
        });
    }
  
    const token = authorization.split(" ")[1];

    
        const { id } = jwt.verify(token, process.env.SECRET_KEY);

        const [user] = await knex('usuarios').select('*').where('id', id);

        if (!user) {
            return res.status(401).json({
              erro: errorMessages.checkTokenInfos,
            });
        }

        const { userPass, ...userWithoutPass  } = user;

        req.user = userWithoutPass;
        next();
    } catch (error) {
        console.log(error.message);
        return res.status(401).json({
          erro: errorMessages.checkTokenInfos,
        });
    }
};

module.exports = loginVerify;