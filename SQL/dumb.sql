CREATE DATABASE sistemaescolar;


CREATE TABLE usuarios (
	id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  senha VARCHAR(100) NOT NULL
);


CREATE TABLE materias (
	id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  usuario_id INTEGER REFERENCES usuarios(id)
);


CREATE TABLE alunos(
	id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL
);


CREATE TABLE notas(
  id SERIAL PRIMARY KEY,
  aluno_id INTEGER REFERENCES alunos(id),
  materia_id INTEGER REFERENCES materias(id),
  unidade INTEGER NOT NULL,
  nota_acumulada decimal NOT NULL DEFAULT 0
);


CREATE TABLE frequencias(
  id SERIAL PRIMARY KEY,
  aluno_id INTEGER REFERENCES alunos(id),
  materia_id INTEGER REFERENCES materias(id),
  data TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  condicao BOOLEAN NOT NULL
);


drop table frequencias;

drop table notas;

drop table alunos;

drop table materias;

drop table usuarios;