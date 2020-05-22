const { Router } = require('express');
const C_Errores=require("../../AST/Errores/L_Error");
const Gramatica=require("../../Analizador/Gramatica")
const L_Copia=require("../../AST/L_Copia");
const router = Router();
var Original;
var Copia=0;
var JsonAST;
//Peticiones
router.post('/Analizar', function (req, res) {
    var ContEntrada = req.body.contenido;
    C_Errores.Errores.Limpiar();
    L_Copia.L_Copia.Limpiar();
    JsonAST = parser(ContEntrada);
    Original=L_Copia.L_Copia.RetornarLista().length;
    //enviamos AST del arbol original
    res.send(JSON.parse(JsonAST.toString()));
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


router.post('/Copia', function (req, res) {
    var ContEntrada = req.body.contenido;
    var Resultado = parser(ContEntrada);
    Copia+=L_Copia.L_Copia.RetornarLista().length;

    console.log(Original);
    console.log(Copia)
    res.send("");
    
});

router.post('/R_Copia', function (req, res) {
    var ContEntrada = req;
    console.log("llego");
    //Mandamos A Comprobar la copia
    ComprobacionCopia();
    res.send("");
    
});

function ComprobacionCopia() {
    for(var i=0; i<Original.length;i++){
        console.log("Clase: "+Original[i].Nombre);
        if(Original[i].JsonHijo!=null){
            var ciclo=Original[i].JsonHijo.JsonHermano;
            while(ciclo!=null){
                console.log(ciclo.Tipo+": "+ciclo.Nombre)
                ciclo=ciclo.JsonHermano;
            }
        }
    }

    console.log("-------------Copia---------");
    for(var i=0; i<Original.length;i++){
        console.log("Clase: "+Original[i].Nombre);
        if(Original[i].JsonHijo!=null){
            var ciclo=Original[i].JsonHijo.JsonHermano;
            while(ciclo!=null){
                console.log(ciclo.Tipo+": "+ciclo.Nombre)
                ciclo=ciclo.JsonHermano;
            }
        }
    }
}





module.exports = router;