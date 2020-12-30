# Instalación y configuración del Chatbot dentro de un sitio Web

#### *Premisas :*

> 1. El chatbot está instalado en `https://bot.dominio`, el cual es un dominio que no existe y que tiene como propósito explicar una instalación genérica. En una instalación productiva, se deberá de sustituir por un dominio real.
> 2. Existen dos clientes de chatbot; el que corresponde a **Red Cofidi** y el corresponde a  **PAC WEB**. Para cada uno de ellos, existe un archivo javascript, el cual contiene la configuración de cada chatbot. Para fines generales, se utilizará la siguiente notación agnóstica al cliente que se está conectando: `bot-[cliente].js` , en dónde cliente puede tomar el valor de `redcofidi` o `webpack`  ; Por ejemplo, `bot-redcofidi.js`



#### *Adecuaciones y Consideraciones:*

Con la finalidad de que el **chatbot** se encuentre configurado dentro de un sitio web de manera correcta,  se deberá de cuidar el orden en que se registra cada componente:

1. Registro del componente `iframe`: de preferencia que sea el primer elemento del tag `<body>` 
2. Registro del archivo `embed.js`, que deberá de ser uno de los últimos elementos  a registrar y antes de cerrar el tag `</body>`
3. Registro de los estílos a través del archivo `embed.css`
4. Registro del cliente chatbot `bot-[cliente].js`



***Nota***: *Registrar primero los archivos `bot-[cliente].js` , antes que el `iframe`,  provocará inconsistencias en el funcionamiento del chatbot*

## Instalación del Chatbot

Primeramente, se deberá de identificar en qué página web se desea visualizar el chatbot; por ejemplo, si se desea que el chatbot esté activo para el usuario desde que entra al sitio web, entonces, deberá de configurar el chatbot en el archivo `index.html` de su portal. Por otro lado, si sólo desea que el chatbot esté activo cuando el usuario visita una determinada página web, por ejemplo, `contacto.html`, entonces se deberá de configurar el chatbot sólo para para esta pantalla. 



La configuración del chabot consiste en cuatro pasos:

1. Agregar el componente `iframe` dentro de la página web 
2. incluir el archivo `embed.js` como elemento javascript
3. incluir las configuraciones del bot a través de un componente `<script>`
4. incluir la hoja de estilos diseñada para el chatbot, `embed.css`



A continuación, se detalla cada uno de los pasos anteriores.

### 1. Componente iFrame
En la página web que se quiera agregar el chatbot, se deberá de agregar el siguiente `<div>`

```html
<html>
  <head>
    [...]
  </head>
  <body>
     [...]
      <div id="embedded_messenger">
        <header id="message_header" onclick="Botkit.toggle()">
          <div class="circle"></div>
          <img id="avatar-bot" class="avatar_icon" src="" alt="Avatar" >
          <div class="header_text">En línea</div>
        </header>
        <iframe id="botkit_client" title="bot" /></iframe>
      </div>
      [...]
    </body>
</html>
```



### 2. Script “embed.js”
La instrucción que se deberá de incluir es:

```html
<script src="https://bot.dominio/embed.js"></script>
```

> El script `embed.js` deberá de ir después de haberse registrado del `iFrame` que muestra al Bot



A continuación, se muestra un ejemplo (se omite el componente Iframe por simplicidad):

```html
<html>
    <head>
    	[...]
    	<script src="https://bot.dominio/embed.js"></script>
    </head>
    <body>
    	[Componente IFRAME]
    	[...]
    </body>
</html>
```



### 3. Script de configuración:

El script de configuración del bot,  deberá de ir después de haberse registrado el archivo `embed.js` 

La instrucción que se deberá de incluir es:

```html
<script id="bot-client-script" 
        bothome="https://bot.dominio" 
        src="https://bot.dominio/bot-[cliente].js"></script>
```

> En dónde:`bot-[cliente].js`  puede tomar el valor de `redcofidi` o `webpack`  ; Por ejemplo, `bot-redcofidi.js`

> El script de configuración del bot  deberá de ir después de haberse registrado el archivo `embed.js` 



A continuación se muestra un ejemplo de inclusión (se omite el componente Iframe por simplicidad):

```html
<html>
    <head>
    	[...]
	    <script src="https://bot.dominio/embed.js"></script>
    </head>
    <body>
    	[Componente IFRAME]
    	[...]
   		<script id="bot-client-script" 
                bothome="https://bot.dominio" 
                src="https://bot.dominio/bot-[cliente].js"></script>
    </body>
</html>
```



### 4. Agregar estílos utilizados por el Chatbot

> Los estílos que utiliza el chatbot, deberán de ir antes de haber registrado el script de configuración 

La instrucción que se deberá de incluir es:

```html
<link rel="stylesheet" href="https://bot.dominio/css/embed.css" />
```

A continuación se muestra un ejemplo de inclusión (se omite el componente Iframe y embed.js por simplicidad):

```html
<html>
    <head>
    	[...]
    	<link rel="stylesheet" href="https://bot.dominio/css/embed.css" />
		[SCRIPT Archivo embed.js]
    </head>
    <body>
    	[Componente IFRAME]
    	[...]
    </body>
</html>
```



### 5 Ejemplo Completo

#### *premisas:*

>  El chatbot se encuentra instalado en: `http://192.223.3.5:8085`

Con la finalidad de mostrar un mapa con las configuraciones realizadas hasta el momento, es que a continuación se muestra un ejemplo de como se vería un documento terminado (se omite detalle de otros elementos por simplicidad):

```html
<html>
  <head>    
    [...]
      <link rel="stylesheet" href="http://192.223.3.5:8085/css/embed.css" />
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
              src="http://192.223.3.5:8085/bot-redcofidi.js"></script>
  	  [...]
    </body>
</html>
```
