const knex = require("../database/database");
const schemaAttendanceRegistration = require("../validations/attendanceRegistrationValidation");

const registerAttendance = async (req, res) => {
    const { error, value } = schemaAttendanceRegistration.validate(req.body);

    if (error) {
        const errorMessage = error.details[0].message;
        return res.status(400).json({ erro: errorMessage });
    }

    const { aluno_id, materia_id, presente } = value;

    const errorMessages = {
        studentExists: "Aluno não encontrado",
        classExists: "Materia não encontrada",
        internalServerError: "Não foi possível registrar a frequencia do aluno",
    };

    try {
        const student = await knex("alunos").where("id", aluno_id);

        if (!student) {
            return res.status(400).json({ erro: errorMessages.studentExists });
        }

        const findClass = await knex("materias").where("id", materia_id);

        if (!findClass) {
            return res.status(400).json({ erro: errorMessages.classExists });
        }

        const attendance = await knex("frequencias")
            .insert({
                aluno_id,
                materia_id,
                presente,
            })
            .returning(["aluno_id", "materia_id", "data", "presente"]);

        return res.status(201).json(attendance);
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({ erro: errorMessages.internalServerError });
    }
};

module.exports = registerAttendance;
