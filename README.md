# Nesjts Redis Config Microservice

The example microservice used for [nest-redis-config](https://github.com/uhmpasterig/nest-redis-config) which is an alternative to the [@nestjs/config](https://github.com/nestjs/config) package which uses redis to store data, so ur able to share that data across your Microservices.

## Installation

```bash
npm install
```

## Running the app

```bash
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
```

## Docker Commands

```bash
# start the redis database
npm run docker:db

# build the Docker image
npm run docker:build

# run the Docker container
npm run docker:run

# stop the Docker container
npm run docker:stop

# stop and remove the Docker containers
npm run docker:down

# restart the Docker containers
npm run docker:restart
```
