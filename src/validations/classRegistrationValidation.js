const Joi = require("joi");

const schemaClassRegistration = Joi.object({
    nome: Joi.string().required().messages({
        "string.empty": "O campo nome não pode estar vazio",
        "any.required": "O campo nome é obrigatório",
    }),
    usuario_id: Joi.number().integer().required().messages({
      'any.required': 'O campo usuario_id é obrigatório.',
      'number.base': 'O campo usuario_id deve ser um número inteiro.',
    }),
});

module.exports = schemaClassRegistration