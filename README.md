<h1 align="center">Welcome to Chatbot 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-2.5.1-blue.svg?cacheSeconds=2592000" />
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
</p>

> Chatbot

## Preconditions

- Install Docker and docker compose [Official docker docs](https://docs.docker.com/)
- Up and run Mongodb and kbase applications with the `run-development.sh` script
- Use node v10
- Create custom env file with the command `cp .env_template .env`

## Install

```sh
npm install
```

### Config vtiger database (optional)
If you area working with a second user provider like mysql follow the next steps:

1. Connect to the mysql database with the credentials defined at `docker/data/mysql/env`
2. Execute the script located in `docker/vtiger-dump.sql`

## Usage

```sh
npm start
```
Go to `http://localhost:3000/test/bot.html` and test the bot

## Run tests

```sh
npm run test
```

## Update CSS

```bash
sass --update sass/:public/css/
```

## Build docker images

```bash
npm run docker-bot-build
```

## Authors

👤 **Daniel Cortés Pichardo**

* Website: https://danimaniarqsoft.github.io/
* Github: [@danimaniarqsoft](https://github.com/danimaniarqsoft)

## Show your support

Give a ⭐️ if this project helped you!
