<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Project Description
NestJS Server for PinMap Project 

## Installation

```bash
$ npm install
$ yarn install 
```

## Running the app

```bash
# localhost (debug & watch)
$ yarn start
```

## Database Migrations
```bash
# NOTE: ORM 변경사항을 Migration 파일로 자동 생성
$ yarn migration:generate src/migration/{migration_content}
# NOTE: Migration 파일을 모두 자동 적용
$ yarn migration:run
```

## Local Docker
```bash
docker network create pinmap-network
docker build -f dockerfiles/local.database.Dockerfile -t pinmap-database .
docker run --network pinmap-network --name pinmap-database -p 6000:3306 -d pinmap-database
docker build -f dockerfiles/local.Dockerfile -t pinmap-server .
docker run --network pinmap-network --name pinmap-server -p 4000:3000 -d pinmap-server
```