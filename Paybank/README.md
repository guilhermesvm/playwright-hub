# 🧪 Playwright Study – Paybank Project

This project is part of my learning journey with **Playwright**, using the **Paybank** system created during **QA Tech Week 01**, hosted by QA Lead and SDET **Fernando Papito**.

## 📌 Project Context

Paybank is a sample web application used for learning automation testing and applying QA best practices. The project includes:

- Micro Frontend
- Microservices:
  - Auth service: `http://paybank-mf-auth:3000/`
  - Mail service
- 🗄️ Database Admin Panel: `http://paybank-dbadm:15432`
- Redis Insights: `http://paybank-redisadm:5540/`

## 🧠 What I'm Learning

- Playwright fundamentals
- End-to-end testing
- Page Object Model (POM)
- Integration with PostgreSQL using `pg-promise`

## To Do 
- Consultar o último codigo no banco e checar se dá match com o ultimo codigo vindo do Redis
- 

## 📚 Setup

Install dependencies:
```bash
npm i pg-promise
npm i bullmq
