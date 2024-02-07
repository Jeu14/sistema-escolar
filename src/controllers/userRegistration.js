const knex = require("../database/database");
const bcrypt = require("bcrypt");
const {
    schemaUserRegistration,
} = require("../validations/userRegistrationValidation");

const registerUser = async (req, res) => {
    const { error, value } = schemaUserRegistration.validate(req.body);

    if (error) {
        const errorMessage = error.details[0].message;
        return res.status(400).json({ erro: errorMessage });
    }

    const { nome, email, senha } = value;

    try {
        const errorMessages = {
            emailExists: "E-mail já cadastrado",
            internalServerError: "Erro interno do servidor",
        };

        const checkEmail = await knex("usuarios").where("email", email).first();
        if (checkEmail) {
            return res.status(400).json({ erro: errorMessages.emailExists });
        }

        const hashPass = await bcrypt.hash(senha, 10);

        const registeredUser = await knex("usuarios")
            .insert({
                nome,
                email,
                senha: hashPass,
            })
            .returning(["nome", "email"]);

        return res.status(201).json({
            message: "Usuário cadastrado com sucesso",
            usuario: registeredUser[0],
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ erro: errorMessages.internalServerError });
    }
};

module.exports = { registerUser };
