import { Nodo_Error } from "./Nodo_Error";

class Errores extends Array<Nodo_Error>{

    constructor(){
        super();
    }

    public static Add(err:Nodo_Error){
        this.prototype.push(err);
    }

    public static Verificarerror():string{
        //Verificacion de Error
        if(this.prototype.length>0){
            return "Hay Errores";
        }else{
            return "No hay Errores";
        }
    }

    public static Limpiar(){
        //Se recorrera la lista y borrara todos los errores que se encuentran apilados
        while(this.prototype.length>0){
            //Borramos
            this.prototype.pop();
        }
    }

    public static RetornarErrores():String{
        var cont="";
        for(var pos=0;pos<this.prototype.length;pos++){
            cont+=","+pos;
        }
        return cont;
    }
}
export{Errores};