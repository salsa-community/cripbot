# Uso de contextos para personalizar la instalación del Chatbot

En esta sección, se muestra un ejemplo completo de la configuración de un chatbot que utiliza un contexto generado a través del `kbase`, y que deberá de personalizar los archivos `embed.css` y `bot.js` para ajustar su comportamiento.

De manera general, los archivos `embed.css` y `bot.js`, pueden localizarse de la siguiente manera:

```javascript
[BOT_HOME]/[CONTEXTO]/css/embed.css?color=[CSS_COLOR]
[BOT_HOME]/[CONTEXTO]/scripts/bot.js?color=[CSS_COLOR]
```

En donde:

* `[BOT_HOME]`: es la url donde está instalado el chatbot

* `[CONTEXTO]`: es el nombre del contexto que se registró en el `kbase`

* `[CSS_COLOR]`: es el código de color, en hexadecimal, con el que se desea personalizar el chatbot; tanto para el iframe, como para los estilos internos del chatbot.


A continuación, se muestra el esqueleto de la configuración:

```html
<html>
  <head>    
    [...]
      <link rel="stylesheet" href="[BOT_HOME]/[CONTEXTO]/css/embed.css?color=[CSS_COLOR]" />
      <script src="[BOT_HOME]/embed.js"></script>
  </head>
  <body>
      <div id="embedded_messenger">
        <header id="message_header" onclick="Botkit.toggle()">
          <div class="circle"></div>
          <img id="avatar-bot" class="avatar_icon" src="" alt="Avatar" >
          <div class="header_text">En línea</div>
        </header>
        <iframe id="botkit_client" title="bot" /></iframe>
      </div>
      [...]
      <script id="bot-client-script" 
              bothome="[BOT_HOME]" 
              src="[BOT_HOME]/[CONTEXTO]/scripts/bot.js?color=[CSS_COLOR]"></script>
  	  [...]
    </body>
</html>
```
## Ejemplo Práctico

A continuación, se ilustra con un ejemplo completo, como se configura un chatbot para utilizar un contexto y cambiar el color de los componentes del mismo:

#### *premisas:*

>  El chatbot se encuentra instalado en: `http://192.223.3.5:8085`
>  Se generó un contexto en el kbase con la clave: `RedCofidi`
>  El código de color en hexadecimal con el que se desea configurar el chatbot es: `34495E`


```html
<html>
  <head>    
    [...]
      <link rel="stylesheet" href="http://192.223.3.5:8085/RedCofidi/css/embed.css?color=34495E" />
      <script src="https://192.223.3.5:8085/embed.js"></script>
  </head>
  <body>
      <div id="embedded_messenger">
        <header id="message_header" onclick="Botkit.toggle()">
          <div class="circle"></div>
          <img id="avatar-bot" class="avatar_icon" src="" alt="Avatar" >
          <div class="header_text">En línea</div>
        </header>
        <iframe id="botkit_client" title="bot" /></iframe>
      </div>
      [...]
      <script id="bot-client-script" 
              bothome="http://192.223.3.5:8085" 
              src="http://192.223.3.5:8085/RedCofidi/scripts/bot.js?color=34495E"></script>
  	  [...]
    </body>
</html>
```
