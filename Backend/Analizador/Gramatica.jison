
%{
    let CNodo_Instruccion=require('../AST/Instrucciones/Nodo_Instruccion');
    let CL_Instruccion=require('../AST/Instrucciones/L_Instrucciones');
    let CL_Error=require('../AST/Errores/L_Error');
    let CNodoError=require('../AST/Errores/Nodo_Error');
%}

/*------------------------------------------------PARTE LEXICA--------------------------------------------------- */
%lex

%%

//Comentarios
("//".*\r\n)|("//".*\n)|("//".*\r)  /*Comentario de una*/
"/*""/"*([^*/]|[^*]"/"|"*"[^/])*"*"*"*/"  /*Comentario multilinea*/

//Tipos de Datos
"int"|"Int"                   return 'tk_int'
"double"|"Double"             return 'tk_double'
"boolean"|"Boolean"           return 'tk_boolean'
"char"|"Char"                 return 'tk_char'
"string"|"String"             return 'tk_string'

//Palabras Reservadas
"class"             return 'tk_class'
"import"            return 'tk_import'
"if"                return 'tk_if'
"else"              return 'tk_else'
"switch"            return 'tk_switch'
"case"              return 'tk_case'
"default"           return 'tk_default'
"while"             return 'tk_while'
"do"                return 'tk_do'
"for"               return 'tk_for'
"continue"          return 'tk_continue'
"return"            return 'tk_return'
"break"             return 'tk_break'
"void"              return 'tk_void'

"system"|"System"            return 'tk_system'
"out"                        return 'tk_out'
"println"                    return 'tk_print'
"print"                      return 'tk_print'

//Relacionales
"=="    return 'tk_igual'
"!="    return 'tk_dif'
">="    return 'tk_mayIgual'
">"     return 'tk_may'
"<="    return 'tk_menIgual'
"<"     return 'tk_men' 


//Logicas
"&&"    return 'tk_and'
"||"    return 'tk_or'
"!"    return 'tk_not'

//Unarias de Incremento y Decremento
"++"    return 'tk_inc'
"--"    return 'tk_dec'


//Otros
"{"     return 'tk_llavei';
"}"     return 'tk_llaved'
";"     return 'tk_puntoycoma'
"="     return 'tk_soloigual'
"("     return 'tk_pabre'
")"     return 'tk_pcierra'
","     return 'tk_coma'
":"     return 'tk_dospuntos'
"."     return 'tk_punto'


//Exprsiones Regulares
[-]?[0-9]+("."[0-9]+)?             return 'tk_digito'
"true"|"false"                     return 'tk_booleano'
[\"]([^\"\n]|(\\\"))*[\"]          return 'tk_cadena'
[\'][a-zA-Z| ][\']                 return 'tk_caracter'
[a-zA-Z]+([a-zA-Z]|[0-9]|_)*       return 'tk_id'

//Operaciones Aritmeticas
"+"     return 'tk_sum'
"-"     return 'tk_res'
"*"     return 'tk_mul'
"/"     return 'tk_div'
"^"     return 'tk_pot'
"%"     return 'tk_mod'

[ \t\r\n\f]                    %{ /*se ignoran*/ %}

<<EOF>>                        %{  return 'EOF';   %}

.                               {CL_Error.Errores.add(new CNodoError.Nodo_Error("Lexico","Caracter no definido: "+yytext,yylineno))}


/lex

/*------------------------------------------------PARTE SINTACTICA--------------------------------------------------- */


%star START
%% 

START:
    INICIO EOF                                                          {console.log("fin de cadena"); $$=new CL_Instruccion.L_Instrucciones("Raiz","Raiz",yylineno); 
                                                                        var L_I = new CNodo_Instruccion.Nodo_Instruccion("Lista Instrucciones","",yylineno); L_I.AgregarHijo($1);
                                                                        $$.Agregar(L_I); return $$.ReturnJson();}
;


INICIO: 
    tk_import tk_id tk_puntoycoma INICIO                                {$$ = new CNodo_Instruccion.Nodo_Instruccion("Instruccion","",yylineno); $$.Agregar($4);
                                                                        var Ins= new CNodo_Instruccion.Nodo_Instruccion("import",$2,yylineno); $$.AgregarHijo(Ins);}
    | tk_class tk_id tk_llavei METODOS tk_llaved INICIO                 {$$ = new CNodo_Instruccion.Nodo_Instruccion("Instruccion","",yylineno); $$.Agregar($6);
                                                                        var Ins = new CNodo_Instruccion.Nodo_Instruccion("class",$2,yylineno); $$.AgregarHijo(Ins); Ins.AgregarHijo($4);}  
    | %empty                                                            {$$=null}
;

METODOS:
    tk_void tk_id tk_pabre PARAMETROFUNCION tk_pcierra tk_llavei SENTENCIA tk_llaved METODOS        {$$ = new CNodo_Instruccion.Nodo_Instruccion("Metodo",$2,yylineno); $$.AgregarHijo($4); 
                                                                                                    if($4!=null){$4.Agregar($7);}else{ $$.AgregarHijo($7);} $$.Agregar($9);
                                                                                                     }
    | TIPODATO tk_id tk_pabre PARAMETROFUNCION tk_pcierra tk_llavei SENTENCIA tk_llaved METODOS     {$$ = new CNodo_Instruccion.Nodo_Instruccion("Funcion",$2,yylineno); $$.AgregarHijo($4); 
                                                                                                    if($4!=null){$4.Agregar($7);}else{ $$.AgregarHijo($7);} $$.Agregar($9);
                                                                                                     }
    | %empty                                                                                        {$$=null;}
;


SENTENCIA:
    CUERPO_SENTENCIA                                                    {if($1!=null){$$ = new CNodo_Instruccion.Nodo_Instruccion("Lista Instruccion","",yylineno); $$.AgregarHijo($1);} }
;

CUERPO_SENTENCIA:
    TIPODATO tk_id LISTAID ASIGNACIONVALOR tk_puntoycoma CUERPO_SENTENCIA                                           {$$ = new CNodo_Instruccion.Nodo_Instruccion("Instruccion","Declaracion",yylineno); $$.AgregarHijo($1); 
                                                                                                                    var tem=new CNodo_Instruccion.Nodo_Instruccion("Identificador",$2,yylineno); $1.Agregar(tem); tem.Agregar($3);
                                                                                                                    if($3!=null){$3.Agregar($4);}else{tem.Agregar($4);} $$.Agregar($6);}
    | tk_id ASIGOLLAMADA CUERPO_SENTENCIA                                                                           {$$=$2; $$.Agregar($3);}
    | tk_if tk_pabre CONDICION tk_pcierra tk_llavei SENTENCIA tk_llaved ELSE CUERPO_SENTENCIA                       {$$ = new CNodo_Instruccion.Nodo_Instruccion("Instruccion","if",yylineno); $$.AgregarHijo($3); $3.Agregar($6); $6.Agregar($8); $$.Agregar($9); }
    | tk_switch tk_pabre CONDICION tk_pcierra tk_llavei CASE tk_llaved CUERPO_SENTENCIA                             {$$ = new CNodo_Instruccion.Nodo_Instruccion("Instruccion","switch",yylineno); $$.AgregarHijo($3); $3.Agregar($6); $$.Agregar($8);}
    | tk_while tk_pabre CONDICION tk_pcierra tk_llavei SENTENCIA tk_llaved CUERPO_SENTENCIA                         {$$ = new CNodo_Instruccion.Nodo_Instruccion("Instruccion","while",yylineno); $$.AgregarHijo($3); $3.Agregar($6); $$.Agregar($8);}
    | tk_do tk_llavei SENTENCIA tk_llaved tk_while tk_pabre CONDICION tk_pcierra tk_puntoycoma CUERPO_SENTENCIA     {$$ = new CNodo_Instruccion.Nodo_Instruccion("Instruccion","do while",yylineno); $$.AgregarHijo($3);
                                                                                                                    if($3!=null){$3.Agregar($7);}else{$$.AgregarHijo($7);} $$.Agregar($10);}
    | tk_for tk_pabre PARAMETROFOR tk_pcierra tk_llavei SENTENCIA tk_llaved CUERPO_SENTENCIA                        {$$ = new CNodo_Instruccion.Nodo_Instruccion("Instruccion","for",yylineno); $$.AgregarHijo($3); $3.Agregar($6); $$.Agregar($8);}
    | tk_break tk_puntoycoma CUERPO_SENTENCIA                                                                       {$$ = new CNodo_Instruccion.Nodo_Instruccion("Expresion","break",yylineno); $$.Agregar($3);}
    | tk_continue tk_puntoycoma CUERPO_SENTENCIA                                                                    {$$ = new CNodo_Instruccion.Nodo_Instruccion("Expresion","continue",yylineno); $$.Agregar($3);}
    | tk_return RETURNVALOR tk_puntoycoma CUERPO_SENTENCIA                                                          {$$ = new CNodo_Instruccion.Nodo_Instruccion("Expresion","return",yylineno); $$.AgregarHijo($2); $$.Agregar($4);}
    | tk_system tk_punto tk_out tk_punto tk_print tk_pabre IMPRIMIR tk_pcierra tk_puntoycoma CUERPO_SENTENCIA       {$$ = new CNodo_Instruccion.Nodo_Instruccion("Instruccion","imprimir",yylineno); $$.Agregar($10); $$.AgregarHijo($7);}     
    | %empty                                                                                                        {$$=null}
;

ASIGOLLAMADA:
    tk_pabre LISTA_EXP tk_pcierra tk_puntoycoma                                              {$$ = new CNodo_Instruccion.Nodo_Instruccion("Expresion","Llamar Funcion",yylineno); $$.AgregarHijo($2);} 
    | tk_soloigual VALOR MASEXPRESIONES tk_puntoycoma                                        {$$ = new CNodo_Instruccion.Nodo_Instruccion("Asignar Valor","",yylineno); $$.AgregarHijo($2); $2.Agregar($3);}
    | error ASIGOLLAMADA                                                                     { CL_Error.Errores.add(new CNodoError.Nodo_Error("Sintactico","Se esperaba: "+$1,yylineno)); $$=$2}
;

/*----------------LISTA DE PARAMETRO----------------*/
PARAMETROFUNCION:
    TIPODATO tk_id VARIASDECLA    {$$ = new CNodo_Instruccion.Nodo_Instruccion("Parametros","",yylineno); $$.AgregarHijo($1); 
                                    var nw=new CNodo_Instruccion.Nodo_Instruccion("Identificador",$2,yylineno); $1.Agregar(nw); nw.Agregar($3); }
    | %empty                        {$$=null;}
;

VARIASDECLA:
    tk_coma TIPODATO tk_id VARIASDECLA      {$$ = new CNodo_Instruccion.Nodo_Instruccion("Mas Declaraciones","",yylineno); $$.AgregarHijo($2);
                                            var nw=new CNodo_Instruccion.Nodo_Instruccion("Identificador",$3,yylineno); $2.Agregar(nw); nw.Agregar($4);}
    | %empty                                {$$=null;}
;

/*----------------LISTA DE EXPRESIONES--------------*/

LISTA_EXP:
    VALOR LISTA_EXPRESIONES                             {$$ = new CNodo_Instruccion.Nodo_Instruccion("Lista Expresiones","",yylineno); $$.AgregarHijo($1); $1.Agregar($2); }   
    | %empty                                            {$$=null}
;
LISTA_EXPRESIONES:
    tk_coma VALOR LISTA_EXPRESIONES                     {$$=$2; $$.Agregar($3);}
    | %empty                                            {$$=null}
;

/*----------------RETORNO DE VALORES----------------*/
RETURNVALOR:
    VALOR MASEXPRESIONES    {$$=$1; $1.Agregar($2);}
    | %empty                {$$=null;}
;

/*----------------DECLARACION DE FOR ---------------*/
PARAMETROFOR:
    TIPODATO tk_id ASIGNACIONVALOR tk_puntoycoma CONDICION tk_puntoycoma tk_id INCYDECRE                        {$$ = new CNodo_Instruccion.Nodo_Instruccion("Parametro for","",yylineno); var nid = new CNodo_Instruccion.Nodo_Instruccion("Identificador",$2,yylineno); 
                                                                                                                $$.AgregarHijo($1); $1.Agregar(nid); nid.Agregar($3); $3.Agregar($5);
                                                                                                                var nid = new CNodo_Instruccion.Nodo_Instruccion("Identificador",$7,yylineno); $5.Agregar(nid); nid.Agregar($8);}
;

/*----------------IF--------------------------------*/
ELSE:
    tk_else ELSEIF                                                              {$$ = new CNodo_Instruccion.Nodo_Instruccion("Instruccion","else",yylineno); $$.AgregarHijo($2);} 
    | %empty                                                                    {$$=null}
;
ELSEIF:
    tk_llavei SENTENCIA tk_llaved                                               {$$=$2;}
    | tk_if tk_pabre CONDICION tk_pcierra tk_llavei SENTENCIA tk_llaved ELSE    {$$ = new CNodo_Instruccion.Nodo_Instruccion("Instruccion","if",yylineno); $$.AgregarHijo($3); $3.Agregar($6); $6.Agregar($8);}
    | error ELSEIF                                                              { CL_Error.Errores.add(new CNodoError.Nodo_Error("Sintactico","Se esperaba: "+$1,yylineno)); $$=$2}
;


/*----------------SWITCH----------------------------*/
CASE:
    tk_case VALOR tk_dospuntos SENTENCIA CASE           {$$ = new CNodo_Instruccion.Nodo_Instruccion("Instruccion","case",yylineno); $$.AgregarHijo($4); $$.Agregar($5);}
    | tk_default tk_dospuntos SENTENCIA CASE            {$$ = new CNodo_Instruccion.Nodo_Instruccion("Instruccion","default",yylineno); $$.AgregarHijo($3); $$.Agregar($4);}
    | %empty                                            {$$=null}
;

/*------------------ IMPRIMIR-----------------------*/
IMPRIMIR:
    VALOR MASEXPRESIONES        {$$ = new CNodo_Instruccion.Nodo_Instruccion("Lista Expresion","",yylineno); $$.AgregarHijo($1); $1.Agregar($2);}
    | %empty                    {$$=null}
;

/*----------------CONDICION-------------------------*/
CONDICION:
    VALOR CONDICIONRELACIONAL                   {$$ = new CNodo_Instruccion.Nodo_Instruccion("Condicion","",yylineno); $$.AgregarHijo($1); $1.Agregar($2);}
;

CONDICIONRELACIONAL:
    RELACIONALES VALOR MASCONDICIONES           {$$=$1; $1.Agregar($2); $2.Agregar($3);}
    |%empty                                     {$$=null}
;

MASCONDICIONES:
    LOGICOS CONDICION                           {$$ = new CNodo_Instruccion.Nodo_Instruccion("Mas Condicion","",yylineno); $$.AgregarHijo($1); $1.Agregar($2); }
    |%empty                                     {$$=null}
;

/*----------------OTROS-----------------------------*/
MASEXPRESIONES:
    ARITMETICAS VALOR MASEXPRESIONES                                {$$ = new CNodo_Instruccion.Nodo_Instruccion("Mas Expresiones","",yylineno); $$.AgregarHijo($1); $1.Agregar($2); $$.Agregar($3);}
    | %empty                                                        {$$=null}
;

ASIGNACIONVALOR:
    tk_soloigual VALOR MASEXPRESIONES                               {$$ = new CNodo_Instruccion.Nodo_Instruccion("Asignar Valor","",yylineno); $$.AgregarHijo($2); $2.Agregar($3);}
    | %empty
;

LISTAID:
    tk_coma tk_id LISTAID       { $$=new CNodo_Instruccion.Nodo_Instruccion("Mas Identificadores","",yylineno); 
                                var lt= new CNodo_Instruccion.Nodo_Instruccion("Identificador",$2,yylineno); $$.AgregarHijo(lt); lt.Agregar($3); }
    | %empty                    {$$=null;}
;

/*--------VALORES PRIMITIVOS------------------------*/
TIPODATO: 
    tk_int                  {$$ = new CNodo_Instruccion.Nodo_Instruccion("Tipo","int",yylineno);}
    | tk_double             {$$ = new CNodo_Instruccion.Nodo_Instruccion("Tipo","double",yylineno);}
    | tk_boolean            {$$ = new CNodo_Instruccion.Nodo_Instruccion("Tipo","boolean",yylineno);}
    | tk_char               {$$ = new CNodo_Instruccion.Nodo_Instruccion("Tipo","char",yylineno);}
    | tk_string             {$$ = new CNodo_Instruccion.Nodo_Instruccion("Tipo","string",yylineno);}
;

VALOR:
    tk_id                   {$$ = new CNodo_Instruccion.Nodo_Instruccion("Expresion","",yylineno);
                            var Exp = new CNodo_Instruccion.Nodo_Instruccion("Primitivo","id: "+$1,yylineno); $$.AgregarHijo(Exp);}
    | tk_cadena             {$$ = new CNodo_Instruccion.Nodo_Instruccion("Expresion","",yylineno);
                            var Exp = new CNodo_Instruccion.Nodo_Instruccion("Primitivo","cadena",yylineno); $$.AgregarHijo(Exp);}
    | tk_digito             {$$ = new CNodo_Instruccion.Nodo_Instruccion("Expresion","",yylineno);
                            var Exp = new CNodo_Instruccion.Nodo_Instruccion("Primitivo","digito: "+$1,yylineno); $$.AgregarHijo(Exp);}
    | tk_booleano           {$$ = new CNodo_Instruccion.Nodo_Instruccion("Expresion","",yylineno);
                            var Exp = new CNodo_Instruccion.Nodo_Instruccion("Primitivo","booleano: ",yylineno); $$.AgregarHijo(Exp);}
    | tk_caracter           {$$ = new CNodo_Instruccion.Nodo_Instruccion("Expresion","",yylineno);
                            var Exp = new CNodo_Instruccion.Nodo_Instruccion("Primitivo","caracter",yylineno); $$.AgregarHijo(Exp);}
;

ARITMETICAS:
    tk_sum                  {$$ = new CNodo_Instruccion.Nodo_Instruccion("Aritmetica","+",yylineno);}
    | tk_res                {$$ = new CNodo_Instruccion.Nodo_Instruccion("Aritmetica","-",yylineno);}
    | tk_mul                {$$ = new CNodo_Instruccion.Nodo_Instruccion("Aritmetica","*",yylineno);}
    | tk_div                {$$ = new CNodo_Instruccion.Nodo_Instruccion("Aritmetica","/",yylineno);}
    | tk_pot                {$$ = new CNodo_Instruccion.Nodo_Instruccion("Aritmetica","^",yylineno);}
    | tk_mod                {$$ = new CNodo_Instruccion.Nodo_Instruccion("Aritmetica","%",yylineno);}
;

RELACIONALES:
    tk_igual                {$$ = new CNodo_Instruccion.Nodo_Instruccion("Relacional","==",yylineno);}
    | tk_dif                {$$ = new CNodo_Instruccion.Nodo_Instruccion("Relacional","!=",yylineno);}
    | tk_may                {$$ = new CNodo_Instruccion.Nodo_Instruccion("Relacional",">",yylineno);}
    | tk_mayIgual           {$$ = new CNodo_Instruccion.Nodo_Instruccion("Relacional",">=",yylineno);}
    | tk_men                {$$ = new CNodo_Instruccion.Nodo_Instruccion("Relacional","<",yylineno);}
    | tk_menIgual           {$$ = new CNodo_Instruccion.Nodo_Instruccion("Relacional","<=",yylineno);}
;

LOGICOS:
    tk_and                  {$$ = new CNodo_Instruccion.Nodo_Instruccion("Logico","and",yylineno);}
    | tk_or                 {$$ = new CNodo_Instruccion.Nodo_Instruccion("Logico","or",yylineno);}
    | tk_not                {$$ = new CNodo_Instruccion.Nodo_Instruccion("Logico","not",yylineno);}
;

INCYDECRE:
    tk_inc                  {$$ = new CNodo_Instruccion.Nodo_Instruccion("Incremento","++",yylineno);}
    | tk_dec                {$$ = new CNodo_Instruccion.Nodo_Instruccion("Decremento","--",yylineno);}
    | error INCYDECRE       { CL_Error.Errores.add(new CNodoError.Nodo_Error("Sintactico","Se esperaba: "+$1,yylineno)); $$=$2}
;
