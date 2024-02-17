const knex = require("../database/database");
const schemaGradeRegistration = require("../validations/gradeRegistrationValidation");

const registerGrade = async (req, res) => {
    const { error, value } = schemaGradeRegistration.validate(req.body);

    if (error) {
        const errorMessage = error.details[0].message;
        return res.status(400).json({ erro: errorMessage });
    }

    const { aluno_id, materia_id, unidade, nota_acumulada } = value;

    const errorMessages = {
        studentExists: "Aluno já cadastrado",
        internalServerError: "Não foi possível registrar a nota do aluno",
    };

    try {
        const previousGrade = await knex("notas")
            .select("nota_acumulada")
            .where({
                aluno_id,
                materia_id,
                unidade,
            })
            .first();

        if (previousGrade) {
            const updatedGrade = await knex("notas")
                .where({
                    aluno_id,
                    materia_id,
                    unidade,
                })
                .increment({ nota_acumulada: nota_acumulada })
                .returning("*");

            return res.status(200).json(updatedGrade[0]);
        }

        const newGrade = await knex("notas")
            .insert({
                aluno_id,
                materia_id,
                unidade,
                nota_acumulada,
            })
            .returning("*");

        return res.status(201).json(newGrade);
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({ erro: errorMessages.internalServerError });
    }
};

module.exports = registerGrade;
