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


#### Start the bot

```bash
npm start
```

#### Update CSS

```bash
sass --update sass/:public/css/
```


# Docker images

## Create de docker image

```bash
docker build -t i2cmx/socrates .
```

## Verify the docker images

```bash
$ docker images

# Example
REPOSITORY                      TAG        ID              CREATED
node                            10         1934b0b038d1    5 days ago
<your username>/socrates    latest     d64d3505b0d2    1 minute ago
```

## Run the images

```bash
docker run -p 49160:8080 -d <your username>/socrates
```



#### References

https://nodejs.org/de/docs/guides/nodejs-docker-webapp/



docker login --username=i2cmx --email=daniel.cortes@i2c.mx
