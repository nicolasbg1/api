# Backend da API para Sistema de Barbearia

Este é o backend de uma API para um sistema de barbearia. A API oferece endpoints para autenticação de usuários, gerenciamento de agendamentos e outras funcionalidades relacionadas à barbearia.

## Funcionalidades

### Autenticação

- **POST /users/auth**: Endpoint para autenticar usuários. 

### Usuários

- **POST /users/create**: Endpoint para registrar novos usuários.

- **GET /users/:id**: Endpoint para obter detalhes de um usuário específico. Requer autenticação.



## Configuração do Ambiente

1. Baixar dependências
2. Copiar .env e preencher
3. Rodar docker compose up para iniciar o db
5. Execute o servidor backend usando o comando `npm run dev`.

## Uso da API

- Faça requisições HTTP para os endpoints fornecidos para realizar operações de autenticação, gerenciamento de usuários e agendamentos.
- Certifique-se de incluir o token JWT recebido após o login nos cabeçalhos de todas as requisições autenticadas no formato `Authorization: Bearer <seu-token>`.

