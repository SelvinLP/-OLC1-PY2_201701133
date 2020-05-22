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
    Errores.add = function (err) {
        this.prototype.push(err);
    };
    Errores.geterror = function () {
        var texto = "<!DOCTYPE html> ";
        texto += "<html lang=\"en\">";
        texto += "<head>";
        texto += "<meta charset=\"UTF-8\">";
        texto += "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">";
        texto += "<title>Reporte Errores</title>";
        texto += "<link rel=\"stylesheet\" href=\"https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css\" integrity=\"sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh\" crossorigin=\"anonymous\">";
        texto += "<script src=\"https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js\" integrity=\"sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6\" crossorigin=\"anonymous\"></script>";
        texto += "</head>";
        texto += "<body>";
        texto += "<H1 style=\"text-align:center\">Lista de Errores</H1>";
        texto += "<table class=\"table\"><thead class=\"thead-dark\"> \n";
        texto += "<tr> \n";
        texto += "<th scope=\"col\">#</th> \n";
        texto += "<th scope=\"col\">Tipo</th> \n";
        texto += "<th scope=\"col\">Descripcion</th> \n";
        texto += "<th scope=\"col\">Fila</th> \n";
        texto += "</tr> \n";
        texto += "</thead> \n";
        texto += "<tbody>";
        //contenido de la tabla
        var No = 1;
        for (var i = 0; i < this.prototype.length; i++) {
            texto += "<tr>\n";
            texto += "<td>" + i + "</td>";
            texto += "<td>" + this.prototype[i].getTipo() + "</td><td>" +
                this.prototype[i].getDescripcion() + "</td><td>" +
                this.prototype[i].getLinea() + "</td>\n";
            texto += "</tr>\n";
        }
        texto += "</tbody> \n";
        texto += "</table> \n";
        texto += "</body>";
        texto += "</html>";
        return texto;
    };
    Errores.Limpiar = function () {
        while (this.prototype.length > 0) {
            this.prototype.pop();
        }
    };
    return Errores;
}(Array));
exports.Errores = Errores;
