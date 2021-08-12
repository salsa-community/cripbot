#!/bin/sh
PACKAGE_VERSION=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g' \
  | xargs)

docker build -t "conacyt/cripbot:${PACKAGE_VERSION}" .
cat password.txt | docker login --username conacyt --password-stdin
docker push conacyt/cripbot:$PACKAGE_VERSION