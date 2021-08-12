#!/bin/bash

export BOT_ENV='production'
export BOT_TAG='2.6.1'
export KBASE_TAG='2.4.0'

export BOT_ENV=production

export DISABLE_STATE_STORAGE='true'
export DISABLE_ANALYTICS='true'
export CACHE_TTL='120'

docker-compose -f docker-compose-conacyt.yml up
