#!/bin/bash

export BOT_ENV='production'
export BOT_TAG='latest'
export KBASE_TAG='latest'

docker-compose -f docker-compose-dev.yml up
