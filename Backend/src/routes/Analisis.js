const { Router } = require('express');
const C_Errores=require("../../AST/Errores/L_Error");
const Gramatica=require("../../Analizador/Gramatica")
const L_Copia=require("../../AST/L_Copia");
const router = Router();
var Original;
var Copia;
//Peticiones
router.post('/Analizar', function (req, res) {
    var ContEntrada = req.body.contenido;
    C_Errores.Errores.Limpiar();
    var Resultado = parser(ContEntrada);
    Original=L_Copia.L_Copia.RetornarLista();
    res.send(JSON.parse(Resultado.toString()));
});

function parser(texto) {
    try {
        return Gramatica.parse(texto);
    }
    catch (e) {
        return "Error en compilacion de Entrada: " + e.toString();
    }
}

//Errores 
router.post('/Errores', function (req, res) {
    var ContenidoError=C_Errores.Errores.geterror();
    res.send(ContenidoError);
});

//Copia
router.post('/Copia', function (req, res) {
    ComprobacionCopia();
    res.send("");
});

function ComprobacionCopia() {
    for(var i=0; i<Original.length;i++){
        console.log(Original[i].getNombre());
    }
}





module.exports = router;