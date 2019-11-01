# Socrates Bot

[Botkit Docs](https://botkit.ai/docs/v4)

[a folder full of modules](https://botkit.ai/docs/v4/core.html#organize-your-bot-code). 


### Clone the project

```bash
git clone git@github.com:danimaniarqsoft/socrates.git

cd socrates
```

#### Download Dependencies

```bash
npm install
```
#### Build docker images

```bash
TAG=0.0.3 npm run docker-build
```

#### Start the bot

```bash
npm start
```

#### Update CSS

```bash
sass --update sass/:public/css/
```

## Run the images

```bash
docker run -p 8080:3000 -d i2cmx/atebot:$TAG
```

#### References

https://nodejs.org/de/docs/guides/nodejs-docker-webapp/


#### Push Image to Docker Hub

```bash
docker login --username=i2cmx
docker tag 3bb870e7a6d4 i2cmx/atebot:0.0.1
docker push i2cmx/atebot:0.0.1
```

#### Versioning

```bash
npm version [major|minor|patch]
```


#### Add context into the deployment

```bash
CONTEXT=api npm start
```