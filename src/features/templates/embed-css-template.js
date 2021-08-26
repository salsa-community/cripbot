/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

module.exports = embedCssTemplate = `
/* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
/* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
#embedded_messenger {
  border-radius: 4px;
  position: fixed;
  z-index: 1000;
  bottom: 60px;
  right: 20px;
  width: 60px;
  height: 60px;
  -webkit-box-shadow: 0px 0px 16px 3px rgba(0,0,0,0.2);
  -moz-box-shadow: 0px 0px 16px 3px rgba(0,0,0,0.2);
  box-shadow: 0px 0px 16px 3px rgba(0,0,0,0.2);
  transition: 1.0s ease-in-out;
}
#embedded_messenger #message_header {
  border-radius: 4px;
  transition: 1.0s ease-in-out;  
  background: #$CSS_COLOR;
  color: #FFF;
  min-height: 60px;
}
#embedded_messenger .circle,
#embedded_messenger .avatar_icon,
#embedded_messenger .header_text,
#embedded_messenger iframe   {
  visibility: hidden;
}
#embedded_messenger.active {
  border-radius: 4px 4px 0px 0px;
  bottom: 60px;
  height: 70%;
  width: 450px;
}
#embedded_messenger.active #message_header {
  font-size: 1em;
  padding: 1.1rem 2rem;
  border-radius: 2px 2px 0px 0px;
}
#embedded_messenger.active .circle {
  visibility: visible;
  float: right;
  opacity: 1;
}
#embedded_messenger.active .avatar_icon {
  float: left;
  position: absolute;
  width: $AVATAR_WIDTH;
  left: $AVATAR_LEFT;
  top: $AVATAR_TOP;
  visibility: visible;
}
#embedded_messenger.active .header_text {
  font-size: 1em;
  padding: 1em 3.5em;
  visibility: visible;
}
#embedded_messenger.active  iframe {
  height: 100%;
  width: 100%;
  border: 0;
  visibility: visible;
}
#embedded_messenger #message_header #avatar-bot {
  max-width: 100%;
  height: auto;
}
.active_text {
  display: none;
}
.avatar_icon {
  transition: width 0.2s ease-in-out;
  width: 0px;
}
.header_text {
  display: inline;
  font-size: 1em;
  transition: 1.2s ease-in-out;
  padding-left: 1.7em;
}
.circle {
  transition: 1.2s ease-in-out;
  width: 15px;
  height: 15px;
  padding: .1em;
  border-radius: 50%;
  background-color: #35AC19;
  border:1px solid #021326;
  float: left;
  margin-top: .25rem;
}

---
/* For Tablets */
@media screen and (max-width: 780px) {
  #embedded_messenger {
    right: 0rem;
  }
  #embedded_messenger.active {
    bottom: 70px;
    height: 70%;
    width: 80%; 
  }
  #embedded_messenger.active .avatar_icon {
    float: left;
    position: absolute;
    width: 0px;
    left: 0px;
    top: 0px;
  }
}
/* For Mobile */
@media only screen and (max-width: 540px){
  #embedded_messenger {
    right: 0rem;
  }
  #embedded_messenger.active {
    bottom: 70px;
    height: 70%;
    width: 90%; 
  }
  #embedded_messenger.active .avatar_icon {
    float: left;
    position: absolute;
    width: 0px;
    left: 0px;
    top: 0px;}

}
/*# sourceMappingURL=embed.css.map */

`
