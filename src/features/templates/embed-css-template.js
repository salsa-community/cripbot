/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

module.exports = embedCssTemplate = `
/* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
/* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
#embedded_messenger {
  position: fixed;
  z-index: 1000;
  bottom: -500px;
  right: 2rem;
  width: 200px;
  height: 555px;
  -webkit-box-shadow: 0px 0px 16px 3px rgba(0,0,0,0.2);
  -moz-box-shadow: 0px 0px 16px 3px rgba(0,0,0,0.2);
  box-shadow: 0px 0px 16px 3px rgba(0,0,0,0.2);
  transition: 1.0s ease-in-out;
  border-radius: 12px 12px 0px 0px; }
  #embedded_messenger.active {
    border-radius: 2px 2px 0px 0px;
    bottom: 36px;
    width: 450px; }
    #embedded_messenger.active #message_header {
      padding: 1.1rem 2rem;
      border-radius: 2px 2px 0px 0px; }
    #embedded_messenger.active .circle {
      float: right;
      opacity: 1; }
    #embedded_messenger.active .avatar_icon {
      float: left;
      position: absolute;
      width: $AVATAR_WIDTH;
      left: $AVATAR_LEFT;
      top: $AVATAR_TOP;}
    #embedded_messenger.active .header_text {
      font-size: 1em;
      padding: 1em 3.5em; }
  #embedded_messenger iframe {
    height: 500px;
    width: 100%;
    border: 0; }
  #embedded_messenger #message_header {
    border-radius: 2px 2px 0px 0px;
    transition: 1.0s ease-in-out;
    background: #000;
    padding: 1.1rem 2rem;
    font-size: 1em;
    background: #$CSS_COLOR;
    color: #FFF; }
    #embedded_messenger #message_header #avatar-bot {
      max-width: 100%;
      height: auto; }

.circle {
  transition: 1.2s ease-in-out;
  width: 15px;
  height: 15px;
  padding: .1em;
  border-radius: 50%;
  background-color: #35AC19;
  border:1px solid #021326;
  float: left;
  margin-top: .25rem;}

.active_text {
  display: none; }

.avatar_icon {
  transition: width 0.2s ease-in-out;
  width: 0px; }

.header_text {
  display: inline;
  font-size: 1em;
  transition: 1.2s ease-in-out;
  padding-left: 1.7em; }

@media only screen and (max-width: 767px) {  
  #embedded_messenger.active {
    bottom: 180px;
    height: 400px;
    width: 320px;
  }
}

/*# sourceMappingURL=embed.css.map */

`
