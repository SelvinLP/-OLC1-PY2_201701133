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
var L_Copia = /** @class */ (function (_super) {
    __extends(L_Copia, _super);
    function L_Copia() {
        return _super.call(this) || this;
    }
    L_Copia.add = function (nuevoC) {
        this.prototype.push(nuevoC);
    };
    L_Copia.Limpiar = function () {
        while (this.prototype.length > 0) {
            this.prototype.pop();
        }
    };
    L_Copia.RetornarLista = function () {
        return this.prototype;
    };
    return L_Copia;
}(Array));
exports.L_Copia = L_Copia;
