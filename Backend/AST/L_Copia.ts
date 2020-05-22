import { Nodo_Instruccion } from "./Instrucciones/Nodo_Instruccion";
class L_Copia extends Array<Nodo_Instruccion>{
    constructor(){
        super();
    }
    public static add(nuevoC:Nodo_Instruccion){
        this.prototype.push(nuevoC);
    }

    public static Limpiar(){
        while(this.prototype.length>0){
            this.prototype.pop();
        }
    }
    public static RetornarLista(){
        return this.prototype;
    }
}
export{L_Copia};