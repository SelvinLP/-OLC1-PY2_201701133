"use strict";
exports.__esModule = true;
var L_Instrucciones = /** @class */ (function () {
    function L_Instrucciones(NTipo, NNombre, NFila) {
        this.Tipo = NTipo;
        this.Nombre = NNombre;
        this.Fila = NFila;
    }
    L_Instrucciones.prototype.Agregar = function (NuevaInterf) {
        if (NuevaInterf != null) {
            this.JsonHijo = NuevaInterf;
        }
    };
    L_Instrucciones.prototype.ReturnJson = function () {
        var cont;
        if (this.JsonHijo != null) {
            cont = '[' + this.JsonHijo.ReturnJson("#") + ']';
        }
        return cont;
    };
    L_Instrucciones.prototype.getLine = function () {
        return this.Fila;
    };
    return L_Instrucciones;
}());
exports.L_Instrucciones = L_Instrucciones;
