import { Instruccion } from "./Instrucciones";

class L_Instrucciones implements Instruccion{

    private Fila:Number;
    private Nombre:String;
    private Tipo:String;
    private JsonHijo;

    constructor(NTipo:String,NNombre:String,NFila:Number){
        this.Tipo=NTipo;
        this.Nombre=NNombre;
        this.Fila=NFila;
    }


    Agregar(NuevaInterf:Instruccion){
        if(NuevaInterf!=null){
            this.JsonHijo=NuevaInterf;
        }
    }
    ReturnJson(): String {
        var cont;
        if(this.JsonHijo!=null){
            cont='[' +this.JsonHijo.ReturnJson("#")+']'; 
        }
        return  cont;
        
    }

    getLine(): Number {
        return this.Fila;
    }

}
export {L_Instrucciones}