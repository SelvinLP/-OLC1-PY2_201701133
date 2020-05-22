import { Nodo_Copia } from "./Nodo_Copia";
class L_Copia extends Array<Nodo_Copia>{
    constructor(){
        super();
    }
    public static add(nuevoC:Nodo_Copia){
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