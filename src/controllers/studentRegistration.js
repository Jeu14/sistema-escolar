const knex = require("../database/database");
const schemaStudentRegistration = require("../validations/studentRegistrationValidation");

const registerStudent = async (req, res) => {
    const { error, value } = schemaStudentRegistration.validate(req.body);

    if (error) {
        const errorMessage = error.details[0].message;
        return res.status(400).json({ erro: errorMessage });
    }

    const { nome } = value;

    const errorMessages = {
        studentExists: "Aluno  já cadastrado",
        internalServerError: "Erro interno do servidor",
    };

    try {
        const checkStudent = await knex("alunos").where("nome", nome).first();

        if (checkStudent) {
            return res.status(400).json({ erro: errorMessages.studentExists });
        }

        const [registeredStudent] = await knex("alunos")
            .insert({
                nome,
            })
            .returning("nome");

        return res
            .status(201)
            .json({
                mensagem: `Aluno(a) ${registeredStudent.nome} registrado com sucesso!`,
            });
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({ erro: errorMessages.internalServerError });
    }
};

module.exports = registerStudent;
