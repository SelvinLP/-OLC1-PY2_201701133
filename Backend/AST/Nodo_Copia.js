"use strict";
exports.__esModule = true;
var Nodo_Copia = /** @class */ (function () {
    function Nodo_Copia(nom, descripcion) {
        this.Hijos = [];
        this.Nombre = nom;
        this.Tipo = descripcion;
    }
    Nodo_Copia.prototype.addChild = function (nuevoH) {
        this.Hijos.push(nuevoH);
    };
    Nodo_Copia.prototype.getTipo = function () {
        return this.Tipo;
    };
    Nodo_Copia.prototype.getNombre = function () {
        return this.Nombre;
    };
    return Nodo_Copia;
}());
exports.Nodo_Copia = Nodo_Copia;
