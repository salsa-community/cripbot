#!/bin/bash

export BOT_ENV='production'
export BOT_TAG='2.1.0'
export KBASE_TAG='2.2.2'

export BOT_ENV=production
export DB_HOST='vtiger-db'
export DB_NAME=becovtig
export DB_USERNAME=becovtiguser
export DB_PASSWORD='5g#k@&k2p'

docker-compose -f docker-compose-dev.yml up &
