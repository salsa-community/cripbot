#!/bin/bash

#########################
## Variables del BOT
#########################

export BOT_ENV='production'
export BOT_TAG='2.8.2'
export DISABLE_STATE_STORAGE='true'
export DISABLE_ANALYTICS='true'
export CACHE_TTL='120'

#########################
## Variables dek KBASE
#########################
export KBASE_TAG='latest'

docker compose -f docker-compose-development.yml up kbase-db
