import { Instruccion } from "./Instrucciones";

class Nodo_Instruccion implements Instruccion{

    private Fila:Number;
    private Id:Number;
    public Nombre:String;
    public Tipo:String;
    public JsonHermano;
    public JsonHijo;

    constructor(NTipo:String,NNombre:String,NFila:Number){
        this.Tipo=NTipo;
        this.Nombre=NNombre;
        this.Fila=NFila;
        this.Id=Math.floor(Math.random() * 10000);
    }


    Agregar(NuevaInterf:Instruccion){
        if(NuevaInterf!=null){
            this.JsonHermano=NuevaInterf;
        }
    }

    AgregarHijo(NuevaInterf:Instruccion){
        if(NuevaInterf!=null){
            this.JsonHijo=NuevaInterf;
        }
    }
    
    ReturnJson(padre:string): String {
        var cont;
        if(this.JsonHermano!=null){
            cont=
            '{' +
            ' "id":"'+this.Tipo+this.Id+'" ,' +
            ' "parent":"'+padre+'" ,' +
            ' "text":"'+this.Tipo+": "+this.Nombre+'"' +
            ' },'+this.JsonHermano.ReturnJson(padre);
        }else{
            cont=
            '{ ' +
            ' "id":"'+this.Tipo+this.Id+'" ,' +
            ' "parent":"'+padre+'" ,' +
            ' "text":"'+this.Tipo+": "+this.Nombre+'"' +
            ' }'; 
        }
        if(this.JsonHijo!=null){
            cont+=
            ','+this.JsonHijo.ReturnJson(""+this.Tipo+this.Id);
        }
        return cont;
    
    }
        

    getLine(): Number {
        return this.Fila;
    }

}
export {Nodo_Instruccion}