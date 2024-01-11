## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Requirements

- Docker with Docker Compose
- NodeJS (min v20)
- Yarn Packatemanger

## Installation

```bash
$ yarn install
```

## Start database

```bash
# Start the docker containers
docker compose up -d

```

## Database management

```bash
# Migrate first before starting the api
yarn db:mig

# You can also reset the whole database
# tbd

```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Enviroment variable

| name             | type   | description                         |
| ---------------- | ------ | ----------------------------------- |
| PRIVATE_KEY_PATH | string | path to the private key file        |
| PUBLIC_CERT_PATH | string | path to the public certificate file |
