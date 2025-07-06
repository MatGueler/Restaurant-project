# 🍽️ Restaurant Project

API project for restaurant management

## Tecnologias

- Node.js
- Express
- Sequelize + PostgreSQL
- Jest

## Estrutura de Pastas

src/
├── services/
├── repository/
├── controllers/
├── services/
├── middlewares/
├── models/
├── connection/
├── seeders/
├── routes/
├── config/
├── constants/
└── utils/
tests/

## Rodando localmente

1. Clone repo

```bash
git clone https://github.com/MatGueler/Restaurant-project.git
```

2. Create .env file and use the .env.example as a template:

3. Install dependences

```bash
npm install
```

4. Create database, migrations and seeders

```bash
npm run db:create
npm run db:migrate
npm run db:seed   
```
These commands use the DATABASE_URL from your .env

5. Run start comand

```bash
npm run start
```

## Rodando os Testes

```bash
npm run test
```
Coverage is arount 70%

## Routes

[Routes](./routes.md)

[Architecture database](./arch.png)