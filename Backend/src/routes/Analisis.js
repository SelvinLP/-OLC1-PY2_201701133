const { Router } = require('express');
const C_Errores=require("../../AST/Errores/L_Error");
const Gramatica=require("../../Analizador/Gramatica")
const router = Router();

//Peticiones
router.post('/Analizar', function (req, res) {
    //console.log(req.body.contenido);
    var ContEntrada = req.body.contenido;
    var Resultado = parser(ContEntrada);
    C_Errores.Errores.Limpiar();
    //res.send(Resultado.toString());
});

function parser(texto) {
    try {
        return Gramatica.parse(texto);
    }
    catch (e) {
        return "Error en compilacion de Entrada: " + e.toString();
    }
}

module.exports = router;