"use strict";
exports.__esModule = true;
var Nodo_Error = /** @class */ (function () {
    function Nodo_Error(tipo, descripcion, linea) {
        this.Tipo = tipo;
        this.Descripcion = descripcion;
        this.Linea = (linea + 1);
    }
    Nodo_Error.prototype.getTipo = function () {
        return this.Tipo;
    };
    Nodo_Error.prototype.getDescripcion = function () {
        return this.Descripcion;
    };
    Nodo_Error.prototype.getLinea = function () {
        return this.Linea;
    };
    return Nodo_Error;
}());
exports.Nodo_Error = Nodo_Error;
