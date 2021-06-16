#!/bin/bash

export BOT_ENV='production'
export BOT_TAG='2.1.9'
export KBASE_TAG='latest'

export BOT_ENV=production

export DISABLE_STATE_STORAGE='true'
export DISABLE_ANALYTICS='true'
export CACHE_TTL='120'

docker-compose -f docker-compose-development.yml up
