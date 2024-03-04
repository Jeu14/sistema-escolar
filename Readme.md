# Sistema escolar


##RESTful API que permite:

- Cadastrar Usuário (professor)
- Fazer login do usuário cadastrado
- Cadastrar matéria
- Cadastrar Aluno
- Registrar nota do aluno cadastrado
- Registrar presença do aluno cadastrado

## **Banco de dados**

Os dados deste projeto serão persistidos em um Banco de Dados PostgreSQL.

### **Cadastrar usuário**

#### **Exemplo de requisição**

```javascript
// POST /usuario
{
    "nome": "José",
    "email": "jose@email.com",
    "senha": "123456"
}
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
{
	"message": "Usuário cadastrado com sucesso",
	"usuario": {
		"nome": "José",
		"email": "jose@email.com"
	}
}
```

```javascript
// HTTP Status 400 / 401 / 403 / 404
{
    "mensagem": "E-mail já cadastrado"
}
```

### **Login do usuário**

#### **Exemplo de requisição**

```javascript
// POST /login
{
    "email": "jose@email.com",
    "senha": "123456"
}
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
{
    "usuario": {
        "id": 1,
        "nome": "José",
        "email": "jose@email.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjIzMjQ5NjIxLCJleHAiOjE2MjMyNzg0MjF9.KLR9t7m_JQJfpuRv9_8H2-XJ92TSjKhGPxJXVfX6wBI"
}
```

```javascript
// HTTP Status 400 / 401 / 403 / 404
{
    "mensagem": "Usuário e/ou senha inválido(s)."
}
```

### **Cadastrar matéria**

#### **Exemplo de requisição**

```javascript
// POST /login
{
	"nome": "teste3",
	"usuario_id": 2
}
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
{
	"Mensagem": "Matéria cadastrada com sucesso"
}
```

```javascript
// HTTP Status 400 / 401 / 403 / 404
{
    "mensagem": "Matéria já cadastrada."
}
```

### **Cadastrar aluno**

#### **Exemplo de requisição**

```javascript
// POST /login
{
	"nome": "teste2"
}
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
{
	"mensagem": "Aluno(a) teste2 registrado com sucesso!"
}
```

```javascript
// HTTP Status 400 / 401 / 403 / 404
{
	"erro": "Aluno  já cadastrado"
}
```

### **Registrar nota do aluno**

#### **Exemplo de requisição**

```javascript
// POST /login
{
	"aluno_id": 1,
	"materia_id" : 1,
	"unidade" : 1,
	"nota_acumulada" : 14
}
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
{
	"id": 1,
	"aluno_id": 1,
	"materia_id": 1,
	"unidade": 1,
	"nota_acumulada": "14.0"
}
```

```javascript
// HTTP Status 400 / 401 / 403 / 404
{
	"erro": "Não foi possível registrar a nota do aluno"
}
```

### **Registrar frequencia do aluno**

#### **Exemplo de requisição**

```javascript
// POST /login
{
	"aluno_id": 1,
	"materia_id" : 1,
	"presente" : true
}
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
[
	{
		"aluno_id": 1,
		"materia_id": 1,
		"data": "2024-02-19T20:18:58.916Z",
		"presente": true
	}
]
```

```javascript
// HTTP Status 400 / 401 / 403 / 404
{
	"erro": "Não foi possível registrar a frequencia do aluno"
}
```