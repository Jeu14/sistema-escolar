const Joi = require("joi");

const schemaGradeRegistration = Joi.object({
    aluno_id: Joi.number().integer().required().messages({
        "any.required": "O campo aluno_id é obrigatório.",
        "number.base": "O campo aluno_id deve ser um número inteiro.",
    }),
    materia_id: Joi.number().integer().required().messages({
        "any.required": "O campo materia_id é obrigatório.",
        "number.base": "O campo materia_id deve ser um número inteiro.",
    }),
    unidade: Joi.number().integer().required().messages({
      "any.required": "O campo unidade é obrigatório.",
      "number.base": "O campo unidade deve ser um número inteiro.",
    }),
    nota_acumulada: Joi.number().required().precision(1).messages({
      "any.required": "O campo nota_acumulada é obrigatório.",
      "number.base": "O campo nota_acumulada deve ser um número com até uma casa decimal.",
    }),
});

module.exports = schemaGradeRegistration;
