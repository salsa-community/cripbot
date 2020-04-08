#!/bin/bash

export BOT_ENV='production'
export BOT_TAG='latest'
export KBASE_TAG='latest'

export DB_HOST='vtiger-db'
export DB_NAME='becovtig'
export DB_USERNAME='becovtiguser'
export DB_PASSWORD='5g#k@&k2p'

export EXPRESS_USER='bot-express'
export EXPRESS_PASSWORD='bot123'

export MYSQL_HOST='db'
export MYSQL_ROOT_PASSWORD='6k*&lj@;!'
export MYSQL_USER='becovtiguser'
export MYSQL_PASSWORD='5g#k@&k2p'
export MYSQL_DATABASE='becovtig'
export BASE_URL='http://127.0.0.1'

docker-compose -f docker-compose-qa.yml up
