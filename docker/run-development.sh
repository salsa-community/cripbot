#!/bin/bash

export BOT_ENV='production'
export BOT_TAG='2.1.0'
export KBASE_TAG='latest'

export BOT_ENV=production

docker-compose -f docker-compose-development.yml up
