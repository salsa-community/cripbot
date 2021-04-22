'use strict';
module.exports = class Context {
    constructor(context) {
        this.nombre = context.nombre;
        this.clave = context.clave;
        this.desc = context.desc;
        this.descEn = context.descEn;
        this.organizacion = context.organizacion;
    }
}
