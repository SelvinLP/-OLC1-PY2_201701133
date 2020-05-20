"use strict";
exports.__esModule = true;
var Nodo_Instruccion = /** @class */ (function () {
    function Nodo_Instruccion(NTipo, NNombre, NFila) {
        this.Tipo = NTipo;
        this.Nombre = NNombre;
        this.Fila = NFila;
        this.Id = Math.floor(Math.random() * 10000);
    }
    Nodo_Instruccion.prototype.Agregar = function (NuevaInterf) {
        if (NuevaInterf != null) {
            this.JsonHermano = NuevaInterf;
        }
    };
    Nodo_Instruccion.prototype.AgregarHijo = function (NuevaInterf) {
        if (NuevaInterf != null) {
            this.JsonHijo = NuevaInterf;
        }
    };
    Nodo_Instruccion.prototype.ReturnJson = function (padre) {
        var cont;
        if (this.JsonHermano != null) {
            cont =
                '{' +
                    ' "id":"' + this.Tipo + this.Id + '" ,' +
                    ' "parent":"' + padre + '" ,' +
                    ' "text":"' + this.Tipo + ": " + this.Nombre + '"' +
                    ' },' + this.JsonHermano.ReturnJson(padre);
        }
        else {
            cont =
                '{ ' +
                    ' "id":"' + this.Tipo + this.Id + '" ,' +
                    ' "parent":"' + padre + '" ,' +
                    ' "text":"' + this.Tipo + ": " + this.Nombre + '"' +
                    ' }';
        }
        if (this.JsonHijo != null) {
            cont +=
                ',' + this.JsonHijo.ReturnJson("" + this.Tipo + this.Id);
        }
        return cont;
    };
    Nodo_Instruccion.prototype.getLine = function () {
        return this.Fila;
    };
    return Nodo_Instruccion;
}());
exports.Nodo_Instruccion = Nodo_Instruccion;
