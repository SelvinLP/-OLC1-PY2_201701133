
/*------------------------------------------------PARTE LEXICA--------------------------------------------------- */
%lex

%options case-insensitive

%%

//Comentarios
("//".*\r\n)|("//".*\n)|("//".*\r)  /*Comentario de una*/
"/*""/"*([^*/]|[^*]"/"|"*"[^/])*"*"*"*/"  /*Comentario multilinea*/

//Tipos de Datos
"int"               return 'tk_int'
"double"            return 'tk_double'
"boolean"           return 'tk_boolean'
"char"              return 'tk_char'
"string"            return 'tk_string'

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

"system"            return 'tk_system'
"out"               return 'tk_out'
"print"             return 'tk_print'

//Relacionales
"=="    return 'tk_igual'
"!="    return 'tk_dif'
">"    return 'tk_may'
">="    return 'tk_mayIgual'
"<"    return 'tk_men' 
"<="    return 'tk_menIgual'

//Logicas
"&&"    return 'tk_and'
"||"    return 'tk_or'
"!"    return 'tk_not'

//Unarias de Incremento y Decremento
"++"    return 'tk_inc'
"--"    return 'tk_dec'

//Operaciones Aritmeticas
"+"     return 'tk_sum'
"-"     return 'tk_res'
"*"     return 'tk_mul'
"/"     return 'tk_div'
"^"     return 'tk_pot'
"%"     return 'tk_mod'

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
[0-9]+("."[0-9]+)?             return 'tk_digito'
"true"|"false"                 return 'tk_booleano'
[\"]([^\"\n]|(\\\"))*[\"]      return 'tk_cadena'
[\'][a-zA-Z][\']               return 'tk_caracter'
[a-zA-Z]+([a-zA-Z]|[0-9]|_)*   return 'tk_id'


[ \t\r\n\f]                    %{ /*se ignoran*/ %}

<<EOF>>                        %{  return 'EOF';   %}

.           L_ErrorD.Errores.Add(new N_Error.Nodo_Error("Error Lexico","Caracter Incorrecto: "+yytext,yylineno))

/lex

/*------------------------------------------------PARTE SINTACTICA--------------------------------------------------- */


%star START
%% 

START:
    INICIO EOF    {console.log("fin de cadena");}
    |error          {console.error('Este es un error sintáctico: ' + yytext + ' en la linea: ' + this.$.first_line + ', en la columna: ' + this.$.first_column);}
;

INICIO: 
    tk_import tk_id tk_puntoycoma INICIO                         {console.log("Reconocio import "+$2+" "+$3);}
    | tk_class tk_id tk_llavei SENTENCIACLASE tk_llaved INICIO       {console.log("Reconocio class "+$2+" "+$3+" "+$5);}  
    | %empty                
;

SENTENCIACLASE: 
    TIPODATO tk_id LISTAID ASIGNACIONVALOR tk_puntoycoma  {console.log("Reconocio un tipo de dato: "+ $1 +" Lista de asignacion: "+ $2+$3);}
    | tk_id ASIGNACIONVALOR tk_puntoycoma                 {console.log("Reconocio una asignacion de valor "+$1+" "+$2+$3);}
    | %empty 
;


ASIGNACIONVALOR:
    tk_soloigual EXPRESION      {console.log("Reconocio Asignacion valor "+$1);}
    | %empty
;

EXPRESION:
    tk_id MASEXPRESIONES                 {console.log("valor expresion: "+$1);}
    | tk_cadena MASEXPRESIONES           {console.log("valor expresion: "+$1);}
    | tk_digito MASEXPRESIONES           {console.log("valor expresion: "+$1);}
    | tk_boolean MASEXPRESIONES          {console.log("valor expresion: "+$1);}
    | tk_caracter MASEXPRESIONES         {console.log("valor expresion: "+$1);}
;

MASEXPRESIONES:
    tk_sum EXPRESION 
    | %empty
;

LISTAID:
    tk_coma tk_id LISTAID    {console.log("lista id: "+$2);}
    | %empty
;

TIPODATO: 
    tk_int          {}
    | tk_double     {}
    | tk_boolean    {}
    | tk_char       {}
    | tk_string     {}
;