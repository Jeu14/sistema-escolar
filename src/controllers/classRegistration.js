const knex = require("../database/database");
const schemaClassRegistration = require("../validations/classRegistrationValidation");

const registerClass = async (req, res) => {
    const { error, value } = schemaClassRegistration.validate(req.body);

    if (error) {
        const errorMessage = error.details[0].message;
        return res.status(400).json({ erro: errorMessage });
    }

    const errorMessages = {
      classExists: "Matéria já cadastrado",
      internalServerError: "Não foi possível realizar o cadastro da materia",
  };

    try {
        const { nome, usuario_id } = value;

        const checkClass = await knex("materias").where("nome", nome).first();

        if (checkClass) {
          return res.status(400).json({ erro: errorMessages.classExists });
        }

        await knex("materias").insert({
          nome,
          usuario_id
        })

        res.status(201).json({Mensagem: "Matéria cadastrada com sucesso"})
      
    } catch (error) {
      console.error(error);
      return res.status(500).json({ erro: errorMessages.internalServerError });
    }
};

module.exports = registerClass;
