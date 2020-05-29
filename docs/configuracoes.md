# Configurações Idvogados

Nesse documento você irá encontrar todas as configurações do projeto de backend.
Além disso, você pode encontrar um guia na sessão [como rodar](#como-rodar), explicando as diferentes formas para inicializar o projeto.

## Como rodar

O projeto pode ser inicializado de várias formas:

### Rodando com Node.js

Instale o [Node.js](https://nodejs.org/en/download/) na sua versão mais recente (LTS), então execute:

```sh
npm start
```

Você irá ver uma mensagem semelhante a:

```sh
> {"level":"info" ... "msg":"Listening on port 3000"}
```

Então acesse [http://localhost:3000](http://localhost:3000)

### Rodando com nvm (Node Version Manager)

Instale o [nvm](https://github.com/nvm-sh/nvm), então execute:

```sh
nvm install
nvm use
```

Você irá ver uma mensagem semelhante a:

```sh
Now using node v12.16.3 (npm v6.14.4)
```

Execute o comando `npm start` para subir o projeto e acesse [http://localhost:3000](http://localhost:3000)

### Rodando com Docker

Instale o [Docker](https://docs.docker.com/get-docker/) e [docker-compose](https://docs.docker.com/compose/gettingstarted/) na suas versões mais recentes, então rode os seguintes comandos:

```sh
docker-compose up --build
```

Você irá ver a seguinte mensagem:

```sh
> idvogados_firebase | Dev App Server is now running.
> idvogados_api      | {"level":"info" ... "msg":"Listening on port 3000"}
```

### Rodar com Make

Para inicializar o projeto com o comando `make`, utilize os seguintes comandos:

```sh
make build
make up
```

## Variáveis de ambiente

### Configurações do Node.js

- `NODE_ENV`: Determina o ambiente onde a API será executada; Possíveis valores: `production|test|development`

**Obs:** Ao usar `NODE_ENV=test` as demais variáveis de ambiente devem ser prefixadas com `TEST_*`

### Configurações da API

- `API_PORT`: Define a porta onde a API será inicializada. Padrão: `3000`.

### Configurações de Log

- `LOG_LEVEL`: Define nível de log usado pela API, determinando a quantidade de log que será gerada pela aplicação. Os níveis suportados são: `fatal|error|warn|info|debug|trace|silent`. Padrão: `debug`.

### Configurações do Firebase

As seguintes variáveis de ambiente são utilizadas para configurar a conexão com o Firebase. A referência completa para cada variável pode ser encontrada na documentação [Firebase#initializeApp](https://firebase.google.com/docs/reference/node/firebase?hl=pt-br#initializeapp)

- `FIREBASE_API_KEY`: Api Key para conexão com o Firebase Cloud, encontrada no painel de configuração do Firebase.
- `FIREBASE_PROJECT_ID`: ID do projeto no Firebase Cloud, encontrada no painel de configuração do Firebase.
- `FIREBASE_FIRESTORE_HOST`: Host do Firestore para conexão local. Padrão: `localhost:5555`
