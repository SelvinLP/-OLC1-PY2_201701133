import { Nodo_AST } from "../Nodo_AST";


interface Instruccion extends Nodo_AST{
    ReturnJson(padre:String):String;
} 
export {Instruccion}