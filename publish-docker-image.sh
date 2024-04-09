#!/bin/sh
PACKAGE_VERSION=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g' \
  | xargs)

docker build -t "danimaniarqsoft/bot:${PACKAGE_VERSION}" .
cat password.txt | docker login --username danimaniarqsoft --password-stdin
docker push danimaniarqsoft/bot:$PACKAGE_VERSION