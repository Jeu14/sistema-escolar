const Joi = require("joi");

const schemaAttendanceRegistration = Joi.object({
    aluno_id: Joi.number().integer().required().messages({
        "any.required": "O campo aluno_id é obrigatório.",
        "number.base": "O campo aluno_id deve ser um número inteiro.",
    }),
    materia_id: Joi.number().integer().required().messages({
        "any.required": "O campo materia_id é obrigatório.",
        "number.base": "O campo materia_id deve ser um número inteiro.",
    }),
    presente: Joi.boolean().required().messages({
        "any.required": "O campo presente é obrigatório.",
        "boolean.base": "O campo presente deve ser um valor booleano.",
    })
});

module.exports = schemaAttendanceRegistration;
