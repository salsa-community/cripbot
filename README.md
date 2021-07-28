<h1 align="center">Welcome to CRIPBot 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-2.5.1-blue.svg?cacheSeconds=2592000" />
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
</p>

> CRIPBot

## Install

```sh
npm install
```

### Config vtiger database (optional)

Connect to the mysql database with the credentials defined at `docker/data/mysql/env`
Execute the script located in `docker/vtiger-dump.sql`

## Usage

```sh
npm start
```

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
npm run docker-cripbot-build
```

## Authors

👤 **Daniel Cortés Pichardo**

* Website: https://danimaniarqsoft.github.io/
* Github: [@danimaniarqsoft](https://github.com/danimaniarqsoft)

## Show your support

Give a ⭐️ if this project helped you!
