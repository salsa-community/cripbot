#!/bin/bash

export BOT_ENV='production'
export BOT_TAG='latest'
export KBASE_TAG='latest'

export DB_HOST='192.168.150.53'
export DB_NAME='vtiger_crm_vde'
export DB_USERNAME='chatbot'
export DB_PASSWORD='[PASSWORD]'

docker-compose -f docker-compose.yml up -d
