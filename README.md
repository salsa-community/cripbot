# Socrates Bot

[Botkit Docs](https://botkit.ai/docs/v4)

[a folder full of modules](https://botkit.ai/docs/v4/core.html#organize-your-bot-code). 

## Config eviroment

**Clone the project**

`git clone git@github.com:danimaniarqsoft/socrates.git`

`cd socrates`

**Add env file from template**

`cp .env_template .env`

**Run kbase and vtiger**

`docker-compose -f docker/docker-compose-dev.yml up -d`

**Config vtiger database**

Connect to the mysql database with the credentials defined at `docker/data/mysql/env`
Execute the script located in `docker/vtiger-dump.sql`

**Start the bot**

`npm install`
`npm start`

## Production

### Build docker images

`npm run docker-build`

## Run the images

```bash
docker run -p 8080:3000 -d i2cmx/atebot:$TAG
```

#### References

https://nodejs.org/de/docs/guides/nodejs-docker-webapp/


#### Push Image to Docker Hub

```bash
docker login --username=conacyt
docker tag 3bb870e7a6d4 conacyt/cripbot:0.0.1
docker push conacyt/cripbot:0.0.1
```

#### Versioning

```bash
npm version [major|minor|patch] -m "message to %s this version"
```


#### Add context into the deployment

```bash
CONTEXT=api npm start
```

#### Update CSS

```bash
sass --update sass/:public/css/
```

#### notes

for mongodb reference: https://github.com/Eslamunto/ProductsApp/blob/master/controllers/product.js




### Versions

## 2.1.0
    * languages parameter in the url as CULTURE
## 2.0.0
    * i18n support for en and es languages