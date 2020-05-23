const { Router } = require('express');
const C_Errores=require("../../AST/Errores/L_Error");
const Gramatica=require("../../Analizador/Gramatica")
const L_Copia=require("../../AST/L_Copia");
const router = Router();
var Original;
var Copia=0;
var JsonAST;
//ReportesHTML 
var CopiaClase=[];var contclase=0;
var CopiaFuncion=[];
var CopiaVariables=[];
var CopiaVariablesEntorno=[];
//Peticiones
router.post('/Analizar', function (req, res) {
    var ContEntrada = req.body.contenido;
    C_Errores.Errores.Limpiar();
    L_Copia.L_Copia.Limpiar();Copia=0;
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
    //Limpiamos listas
    CopiaClase=[];contclase=0;
    CopiaFuncion=[];
    CopiaVariables=[];
    CopiaVariablesEntorno=[];
    //Mandamos A Comprobar la copia
    var renv=ComprobacionCopia();
    res.send(renv);
    
});

function ComprobacionCopia() {
    var Lista_Total=L_Copia.L_Copia.RetornarLista();
    for(var i=0; i<Original;i++){
        //ciclo para la clase copia
        for(var pos=(Copia-Original);pos<Copia;pos++){
            //Comprobacion de clase
            if(Lista_Total[i].Nombre==Lista_Total[pos].Nombre){
                contclase=0;
                var funciones=Lista_Total[i].JsonHijo;
                CopiaFuncion=[];
                while(funciones!=null){
                    //Comprobacion de Funcion
                    var ciclofunccopia=Lista_Total[pos].JsonHijo;
                    while(ciclofunccopia!=null){
                        CopiaVariables=[];
                        CopiaVariablesEntorno=[];
                        if(funciones.Nombre==ciclofunccopia.Nombre){ 
                            
                            //VALIDACION DE VARIABLES
                            if(funciones.JsonHijo!=null){
                                if(funciones.JsonHijo.Tipo=="Parametros"){
                                    console.log("se puede analizar parametros");
                                    var Parametros=funciones.JsonHijo.JsonHijo;
                                    while(Parametros!=null){
                                        CopiaVariables.push([Parametros.Nombre,Parametros.JsonHermano.Nombre]);
                                        if(Parametros.JsonHermano.JsonHermano!=null){
                                            Parametros=Parametros.JsonHermano.JsonHermano.JsonHijo;
                                        }else{
                                            break;
                                        }
                                    }
                                    //Comprobaoms las Instrucciones
                                    if(funciones.JsonHijo.JsonHermano!=null){
                                        var L_Instrucciones=funciones.JsonHijo.JsonHermano.JsonHijo;
                                        while(L_Instrucciones!=null){
                                            if(L_Instrucciones.Nombre=="Declaracion"){
                                                CopiaVariablesEntorno.push([L_Instrucciones.JsonHijo.Nombre,L_Instrucciones.JsonHijo.JsonHermano.Nombre]);
                                            }
                                            L_Instrucciones=L_Instrucciones.JsonHermano;
                                        }
                                    }
                                }else{
                                    //Instruccions
                                    var L_Instrucciones=funciones.JsonHijo.JsonHijo;
                                    while(L_Instrucciones!=null){
                                        if(L_Instrucciones.Nombre=="Declaracion"){
                                            CopiaVariablesEntorno.push([L_Instrucciones.JsonHijo.Nombre,L_Instrucciones.JsonHijo.JsonHermano.Nombre]);
                                        }
                                        L_Instrucciones=L_Instrucciones.JsonHermano;
                                    }

                                }
                            }

                            CopiaFuncion.push([funciones.Tipo,funciones.Nombre,CopiaVariables,CopiaVariablesEntorno]);
                            //contado de funciones copia
                            contclase++;
                            break;
                        }
                        ciclofunccopia=ciclofunccopia.JsonHermano;
                    }
                    //iterador
                    funciones=funciones.JsonHermano;
                }
                //agregamos los datos obtenidos
                CopiaClase.push([Lista_Total[i].Nombre,contclase,CopiaFuncion]);
                break;
            }
        }
    }

    //Mostramos Copias
    return GenerarHTML()
}

function Variables(){

}

function GenerarHTML(){
    var texto = "<!DOCTYPE html> ";
        texto+="<html lang=\"en\">";
        texto+="<head>";
        texto+="<meta charset=\"UTF-8\">";
        texto+="<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">";
        texto+="<title>Reportes Copias</title>";
        texto+="<link rel=\"stylesheet\" href=\"https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css\" integrity=\"sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh\" crossorigin=\"anonymous\">";
        texto+="<script src=\"https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js\" integrity=\"sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6\" crossorigin=\"anonymous\"></script>";
        texto+="</head>";
        texto+="<body>";
        texto+="<H1 style=\"text-align:center\">Reporte Clase Copia</H1>";
        texto+= "<table class=\"table\"><thead class=\"thead-dark\"> \n";
        texto+="<tr> \n";
        texto+= "<th scope=\"col\">#</th> \n";
        texto+= "<th scope=\"col\">Nombre</th> \n";
        texto+= "<th scope=\"col\">Cantidad </th> \n";
        texto+= "</tr> \n";
        texto+= "</thead> \n";
        texto+= "<tbody>";
        //contenido de la tabla clase
        for(var i=0; i<CopiaClase.length;i++){
            texto+="<tr>\n";
                texto+="<td>"+i+"</td>"
                texto+="<td>"+CopiaClase[i][0]+"</td>"
                texto+="<td>"+CopiaClase[i][1]+"</td>";
            texto+="</tr>\n";
        }
        texto+= "</tbody> \n";
        texto+= "</table> \n";

        //tabla de funciones
        texto+="<hr>"
        texto+="<H1 style=\"text-align:center\">Reporte Metodos y Funciones Copia</H1>";
        texto+= "<table class=\"table\"><thead class=\"thead-dark\"> \n";
        texto+="<tr> \n";
        texto+= "<th scope=\"col\">#</th> \n";
        texto+= "<th scope=\"col\">Tipo </th> \n";
        texto+= "<th scope=\"col\">Nombre</th> \n";
        texto+= "<th scope=\"col\">Parametros</th> \n";
        texto+= "<th scope=\"col\">Clase Padre</th> \n";
        texto+= "</tr> \n";
        texto+= "</thead> \n";
        texto+= "<tbody>";
        //contenido de la tabla funciones
        var i2=0;
        for(var i=0; i<CopiaClase.length;i++){
            for(var pos=0;pos<CopiaClase[i][2].length;pos++){
                i2++;
                texto+="<tr>\n";
                    texto+="<td>"+i2+"</td>"
                    texto+="<td>"+CopiaClase[i][2][pos][0]+"</td>"
                    texto+="<td>"+CopiaClase[i][2][pos][1]+"</td>";
                    texto+="<td>"
                    for(var posv=0;posv<CopiaClase[i][2][pos][2].length;posv++){
                        texto+=CopiaClase[i][2][pos][2][posv][0]+": "+CopiaClase[i][2][pos][2][posv][1]+";  ";
                    }
                    texto+="</td>";
                    texto+="<td>"+CopiaClase[i][0]+"</td>";
                texto+="</tr>\n";
            }
        }
        texto+= "</tbody> \n";
        texto+= "</table> \n";

        //tabla de variables
        texto+="<hr>"
        texto+="<H1 style=\"text-align:center\">Reporte Variables Copia</H1>";
        texto+= "<table class=\"table\"><thead class=\"thead-dark\"> \n";
        texto+="<tr> \n";
        texto+= "<th scope=\"col\">#</th> \n";
        texto+= "<th scope=\"col\">Tipo </th> \n";
        texto+= "<th scope=\"col\">Nombre</th> \n";
        texto+= "<th scope=\"col\">Funcion</th> \n";
        texto+= "<th scope=\"col\">Clase</th> \n";
        texto+= "</tr> \n";
        texto+= "</thead> \n";
        texto+= "<tbody>";
        //contenido de la tabla funciones
        var i3=0;
        for(var i=0; i<CopiaClase.length;i++){
            for(var pos=0;pos<CopiaClase[i][2].length;pos++){
                
                for(var posv=0;posv<CopiaClase[i][2][pos][2].length;posv++){
                    i3++;
                    texto+="<tr>\n";
                    texto+="<td>"+i3+"</td>"    
                    texto+="<td>"+CopiaClase[i][2][pos][2][posv][0]+"</td>";
                    texto+="<td>"+CopiaClase[i][2][pos][2][posv][1]+"</td>";
                    texto+="<td>"+CopiaClase[i][2][pos][1]+"</td>";
                    texto+="<td>"+CopiaClase[i][0]+"</td>";
                    texto+="</tr>\n";
                }
                for(var posv=0;posv<CopiaClase[i][2][pos][3].length;posv++){
                    i3++;
                    texto+="<tr>\n";
                    texto+="<td>"+i3+"</td>"    
                    texto+="<td>"+CopiaClase[i][2][pos][3][posv][0]+"</td>";
                    texto+="<td>"+CopiaClase[i][2][pos][3][posv][1]+"</td>";
                    texto+="<td>"+CopiaClase[i][2][pos][1]+"</td>";
                    texto+="<td>"+CopiaClase[i][0]+"</td>";
                    texto+="</tr>\n";
                }
                
            }
        }

        texto+= "</tbody> \n";
        texto+= "</table> \n"; 
        texto+="</body>";
        texto+="</html>";
        return texto;
}





module.exports = router;