
%{
    let CNodo_Instruccion=require('../AST/Instrucciones/Nodo_Instruccion');
    let CL_Instruccion=require('../AST/Instrucciones/L_Instrucciones');
%}

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

.                {console.error("Error Lexico No se esperaba el caracter: "+yytext+"  en la linea: "+yylineno);}


/lex

/*------------------------------------------------PARTE SINTACTICA--------------------------------------------------- */


%star START
%% 

START:
    INICIO EOF      {console.log("fin de cadena"); $$=new CL_Instruccion.L_Instrucciones("Raiz","Raiz",yylineno); $$.Agregar($1); return $$.ReturnJson();}
    |error          {console.error('Este es un error sintáctico: ' + yytext + ' en la linea: ' + this.$.first_line + ', en la columna: ' + this.$.first_column);}
;


INICIO: 
    tk_import tk_id tk_puntoycoma INICIO                               {$$ = new CNodo_Instruccion.Nodo_Instruccion("import",$2,yylineno); $$.Agregar($4);}
    | tk_class tk_id tk_llavei SENTENCIA tk_llaved INICIO              {$$ = new CNodo_Instruccion.Nodo_Instruccion("class",$2,yylineno); $$.Agregar($6); $$.AgregarHijo($4);}  
    | %empty                                                           {$$=null}
;

SENTENCIA:
    TIPODATO ASIGNACIONVALOR tk_puntoycoma SENTENCIA                                               {}
    | tk_id ASIGOLLAMADA                                                                           {}
    | tk_if tk_pabre CONDICION tk_pcierra tk_llavei SENTENCIA tk_llaved ELSE SENTENCIA             {}
    | tk_switch tk_pabre CONDICION tk_pcierra tk_llavei CASE tk_llaved SENTENCIA                   {}
    | tk_while tk_pabre CONDICION tk_pcierra tk_llavei SENTENCIA tk_llaved SENTENCIA               {}
    | tk_do tk_llavei SENTENCIA tk_llaved tk_pabre CONDICION tk_pcierra tk_puntoycoma              {}
    | tk_for tk_pabre PARAMETROFOR tk_pcierra tk_llavei SENTENCIA tk_llaved SENTENCIA              {}
    | tk_break tk_puntoycoma SENTENCIA                                                             {}
    | tk_continue tk_puntoycoma SENTENCIA                                                          {}
    | tk_return tk_puntoycoma SENTENCIA                                                            {}
    | tk_system tk_punto tk_out tk_punto tk_print tk_pabre IMPRIMIR tk_pcierra tk_puntoycoma SENTENCIA  {$$ = new CNodo_Instruccion.Nodo_Instruccion("Instruccion","imprimir",yylineno); $$.Agregar($10); $$.AgregarHijo($7);}       
    | %empty                                                                                            {$$=null}
;

/*------------------ IMPRIMIR-----------------------*/
IMPRIMIR:
    VALOR MASEXPRESIONES        {$$=$1}
    | %empty                    {$$=null}
;

/*----------------OTROS-----------------------------*/
MASEXPRESIONES:
    ARITMETICAS VALOR MASEXPRESIONES                                {}
    | ARITMETICAS tk_pabre LISTA_EXP tk_pcierra MASEXPRESIONES      {}
    | %empty                                                        {}
;

/*--------VALORES PRIMITIVOS------------------------*/
VALOR:
    tk_id                 {$$ = new CNodo_Instruccion.Nodo_Instruccion("Primitivo","id: "+$1,yylineno);}
    | tk_cadena           {$$ = new CNodo_Instruccion.Nodo_Instruccion("Primitivo","cadena",yylineno);}
    | tk_digito           {$$ = new CNodo_Instruccion.Nodo_Instruccion("Primitivo","digito: "+$1,yylineno);}
    | tk_booleano         {$$ = new CNodo_Instruccion.Nodo_Instruccion("Primitivo","booleano: "+$1,yylineno);}
    | tk_caracter         {$$ = new CNodo_Instruccion.Nodo_Instruccion("Primitivo","caracter",yylineno);}
;