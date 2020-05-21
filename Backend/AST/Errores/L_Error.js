"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var Errores = /** @class */ (function (_super) {
    __extends(Errores, _super);
    function Errores() {
        return _super.call(this) || this;
    }
    Errores.Add = function (err) {
        this.prototype.push(err);
    };
    Errores.Verificarerror = function () {
        //Verificacion de Error
        if (this.prototype.length > 0) {
            return "Hay Errores";
        }
        else {
            return "No hay Errores";
        }
    };
    Errores.Limpiar = function () {
        //Se recorrera la lista y borrara todos los errores que se encuentran apilados
        while (this.prototype.length > 0) {
            //Borramos
            this.prototype.pop();
        }
    };
    Errores.RetornarErrores = function () {
        var cont = "";
        for (var pos = 0; pos < this.prototype.length; pos++) {
            cont += "," + pos;
        }
        return cont;
    };
    return Errores;
}(Array));
exports.Errores = Errores;
