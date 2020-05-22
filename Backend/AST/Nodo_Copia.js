"use strict";
exports.__esModule = true;
var Nodo_Copia = /** @class */ (function () {
    function Nodo_Copia(nom, descripcion) {
        this.Hijos = [];
        this.Nombre = nom;
        this.Tipo = descripcion;
    }
    Nodo_Copia.prototype.addChild = function (nuevoH) {
        if (nuevoH != null) {
            this.Hijos.push(nuevoH);
        }
    };
    Nodo_Copia.prototype.addHermano = function (nuevoH) {
        if (nuevoH != null) {
            this.Hermano = nuevoH;
        }
    };
    return Nodo_Copia;
}());
exports.Nodo_Copia = Nodo_Copia;
