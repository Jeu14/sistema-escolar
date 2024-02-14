const knex = require("../database/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  schemaUserLogin,
} = require("../validations/userLoginValidation");

const userLogin = async (req, res) => {
    const { error } = schemaUserLogin.validate(req.body);

    if (error) {
        const errorMessage = error.details[0].message;
        return res.status(400).json({ erro: errorMessage });
    }

    const { email, senha } = req.body;

    const errorMessages = {
      checkEmailAndPass: "Email ou senha inválida",
      internalServerError: "Não foi possível fazer login",
  };

    try {
        const [user] = await knex("usuarios").select("*").where("email", email);

        if (!user) {
            return res.status(401).json({
              erro: errorMessages.checkEmailAndPass,
            });
        }

        const { senha: userPass, ...userWithoutPass } = user;

        const validPass = await bcrypt.compare(senha, userPass);

        if (!validPass) {
            return res.status(401).json({
              erro: errorMessages.checkEmailAndPass,
            });
        }

        const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
            expiresIn: "8h",
        });
        return res.status(200).json({ usuario: userWithoutPass, token });
    } catch (error) {
        console.log(error.message);
        return res
            .status(500)
            .json({ erro: errorMessages.checkEmailAndPass });
    }
};

module.exports = userLogin;
