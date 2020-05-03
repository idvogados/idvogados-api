# Configurando o ambiente de desenvolvimento

## Docker

A maneira mais fácil de começar a desenvolver é utilizar o Docker como base para o projeto.

Tenha certeza que o docker está instalado na sua máquina (comando `docker -v`), juntamente com o docker compose (comando `docker-compose -v`) e utilize os seguintes comandos:

Linux e Mac: ```make install``` e ```make dev```

Windows: `docker-compose build` e `docker-compose up -d`

O container node irá subir no [http://localhost:30101](http://localhost:30101) (faça um teste abrindo o browser na url).
