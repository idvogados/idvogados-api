# Orientações Idvogados

Guia para código fonte de backend do projeto Idvogados.
O objetivo desse documento é descrever as decisões tomadas para definição da estrutura do código e guiar os desenvolvedores

## Nomenclatura

A nomenclatura segue as seguintes regras:

- Arquivos: Nome em minúsculo, separado por `-`. `nome-de-arquivo.js`.
- Código: [CamelCase](https://pt.wikipedia.org/wiki/CamelCase). `minhaVariavel`.
- Objetos JSON: Nome das chaves em [snake_case](https://en.wikipedia.org/wiki/Snake_case).

```json
{
  "campo_com_multiplas_palavras": "valor"
}
```

## Estrutura de pastas

```
.github/
  ISSUE_TEMPLATES/
bin/
docs/
src/
  api/
  client/
  config/
  errors/
  helpers/
  middlewares/
  models/
  routes/
  services/
test/
  acceptance/
  unit/
```

### Propósito de cada uma das pastas escolhidas

#### bin/

Scripts e arquivos binários

### docs/

Documentações importantes para o projeto, comumente escritas em arquivo [Markdown](https://en.wikipedia.org/wiki/Markdown)

### src/

Todo código relacionado a camada de negócio da API

### src/api/

Handlers (Controllers) para os endpoints da API

### src/client/

Clientes de serviços ou módulos externos (Banco de dados, Fila, Log, etc)

### src/config/

Definição dos objetos de configurações da API

### src/errors/

Classes customizadas de erro, geralmente extendendo da classe padrão `Error` do JavaScript

### src/helpers/

Funções auxiliares

### src/middlewares/

Middlewares para serem usados junto a Framework HTTP

### src/models/

Entidades para acesso e manipulação de dados (ORM)

### src/routes/

Definição de rotas da API

### src/services/

Definição das regras de negócio das entidades

### test/acceptance/

Testes de aceitação da API, executando o fluxo de request e response em um endpoint

### test/unit/

Testes unitários dos módulos

## Scripts

O projeto conta com vários scripts que irão auxiliar no desenvolvimento e podem ser utilizados das seguintes formas:

### Comandos Node.js

- `npm run deps`: Inicia as dependências do projeto configurados no arquivo [`docker-compose.test.yml`](https://github.com/idvogados/backend/blob/dev/docker-compose.test.yml)
- `npm run start`: Inicia a API
- `npm run start:docker`: Inicia a API utilizando Docker
- `npm run debug`: Inicia a API em modo Debug
- `npm run cli`: Acessa a API em modo terminal na pasta raiz do projeto
- `npm run test`: Executa todos os testes (Pasta `test/*`)
- `npm run test:acceptance`: Executa somente os testes de aceitação (Pasta `test/acceptance/*`)
- `npm run test:unit`: Executa somente os testes unitários (Pasta `test/unit/*`)
- `npm run style:check`: Verifica se o código fonte segue os padrões de estilo definidos nos arquivos `.eslintrc` e `.prettierrc`
- `npm run style:fix`: Formata o código fonte seguindo os estilos recomendados

### Comandos Docker

- `docker-compose up --build`: Inicia o projeto e suas dependências no Docker
- `docker-compose run idvogados_api npm run cli`: Acessa a API em modo terminal na pasta raiz do projeto
- `docker-compose run idvogados_api npm run test`: Executa todos os testes (Pasta `test/*`)

### Comandos Make

- `make build`: Faz build das imagens docker
- `make up`: Inicializa a api localmente com docker, utilizando as configurações do arquivo [`docker-compose.yml`](https://github.com/idvogados/backend/blob/dev/docker-compose.yml)

## Configurações do projeto

Para saber como configurar o projeto, clique [aqui](https://github.com/idvogados/backend/blob/dev/src/docs/configuracoes.md)