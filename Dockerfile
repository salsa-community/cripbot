FROM node:10


# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY . /usr/src/app

RUN cd /usr/src/app \
  && npm install --production
# If you are building your code for production
# RUN npm ci --only=production

WORKDIR /usr/src/app

EXPOSE 8080
CMD [ "node", "bot.js"]
