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
  bottom: 20px;
  right: 20px;
  width: 60px;
  height: 60px;
  -webkit-box-shadow: 0px 0px 16px 3px rgba(0,0,0,0.2);
  -moz-box-shadow: 0px 0px 16px 3px rgba(0,0,0,0.2);
  box-shadow: 0px 0px 16px 3px rgba(0,0,0,0.2);
  transition: 0.1s ease-in-out;
}
#embedded_messenger .chat-icon{
  display: block;
  font-size: 32px;
  left: 13px;
  text-align: center;
  top: 14px;
  position: absolute;
} 
#embedded_messenger #message_header {
  border-radius: 4px;
  transition: 0.1s ease-in-out;
  background: #$CSS_COLOR;
  color: #FFF;
  height: 60px;
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
#embedded_messenger.active .chat-icon{
  display: none;
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
  transition: width 0.1s ease-in-out;
  width: 0px;
  z-index: 9;
}
.header_text {
  display: inline;
  font-size: 1em;
  transition: 0.1s ease-in-out;
  padding-left: 1.7em;
}
.circle {
  transition: 0.1s ease-in-out;
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
#bot-overlay {
  position: relative;
  display: none;
  justify-content: center;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 3;
  background: white;
}

.lds-spinner {
  color: official;
  top: 50%;
  margin-top: -50px;
  display: inline-block;
  position: absolute;
  width: 80px;
  height: 80px;
}
.lds-spinner div {
  transform-origin: 40px 40px;
  animation: lds-spinner 1.2s linear infinite;
}
.lds-spinner div:after {
  content: " ";
  display: block;
  position: absolute;
  top: 3px;
  left: 37px;
  width: 6px;
  height: 18px;
  border-radius: 20%;
  background: #618f4f;
}
.lds-spinner div:nth-child(1) {
  transform: rotate(0deg);
  animation-delay: -1.1s;
}
.lds-spinner div:nth-child(2) {
  transform: rotate(30deg);
  animation-delay: -1s;
}
.lds-spinner div:nth-child(3) {
  transform: rotate(60deg);
  animation-delay: -0.9s;
}
.lds-spinner div:nth-child(4) {
  transform: rotate(90deg);
  animation-delay: -0.8s;
}
.lds-spinner div:nth-child(5) {
  transform: rotate(120deg);
  animation-delay: -0.7s;
}
.lds-spinner div:nth-child(6) {
  transform: rotate(150deg);
  animation-delay: -0.6s;
}
.lds-spinner div:nth-child(7) {
  transform: rotate(180deg);
  animation-delay: -0.5s;
}
.lds-spinner div:nth-child(8) {
  transform: rotate(210deg);
  animation-delay: -0.4s;
}
.lds-spinner div:nth-child(9) {
  transform: rotate(240deg);
  animation-delay: -0.3s;
}
.lds-spinner div:nth-child(10) {
  transform: rotate(270deg);
  animation-delay: -0.2s;
}
.lds-spinner div:nth-child(11) {
  transform: rotate(300deg);
  animation-delay: -0.1s;
}
.lds-spinner div:nth-child(12) {
  transform: rotate(330deg);
  animation-delay: 0s;
}
@keyframes lds-spinner {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
`
