# QA Tech Week - 1ª Edição - Projeto Paybank
# Configuração de containers Docker para o projeto

## 1. Vá para C:\Windows\System32\drivers\etc\hosts.txt
## 2. Cole o que esta abaixo no fim do arquivo

# -------------------------
# Projeto Paybank
# -------------------------
127.0.0.1   paybank-ms-auth         # Microserviço de autenticação (paybank-ms-auth)
127.0.0.1   paybank-ms-email        # Microserviço de e-mail (paybank-ms-email)
127.0.0.1   paybank-mf-auth         # Microfrontend de autenticação (paybank-mf-auth)

# -------------------------
# Banco de Dados
# -------------------------
127.0.0.1   paybank-db              # Banco de dados PostgreSQL (paybank-db)
127.0.0.1   paybank-dbadm           # PgAdmin (paybank-dbadm) - Gerenciamento do PostgreSQL

# -------------------------
# Redis
# -------------------------
127.0.0.1   paybank-redis           # Serviço de cache e filas Redis (paybank-redis)
127.0.0.1   paybank-redisadm        # RedisInsight (paybank-redisadm) - Interface de gerenciamento do Redis

# -------------------------
# Jenkins
# -------------------------
127.0.0.1   jenkins-server          # Jenkins (jenkins-server) - Integração contínua
