# 🚧 Trabalho em progresso.

Repositório para o projeto de back-end

## Como contribuir

Leia nosso guia de contribuição nesse [arquivo](https://github.com/idvogados/backend/blob/dev/CONTRIBUTING.md)

#### Iniciando a API

```sh
# Criando a imagem Docker do banco de dados:
# Dentro do projeto, já existe uma arquivo docker-compose.yml que possui o
# PostgreSQL como banco de dados, basta ter o Docker instalado em sua máquina.
$ yarn docker # Iniciará em background e não irá bloquear o shell

# Rodando as migrations para o banco de dados e iniciando o projeto
$ yarn && yarn dev:server
```

[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=Idvogados&uri=https%3A%2F%2Fgithub.com%2Fidvogados%2Fbackend%2Fblob%2Fdev-mastercoks%2Fapi%2Finsomnia.json)

### :memo: Licença

Este projeto é desenvolvido sob a licença EUPL-1.2. Veja o arquivo [LICENSE](LICENSE.md) para saber mais detalhes.
