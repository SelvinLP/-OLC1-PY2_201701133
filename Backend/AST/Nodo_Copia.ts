export class Nodo_Copia {

    public Nombre:string;
    public Tipo:string;
    public Hijos:Nodo_Copia[]=[];
    public Hermano:Nodo_Copia;

    constructor(nom:string,descripcion:string){
        this.Nombre=nom;
        this.Tipo=descripcion;
    }

    public addChild(nuevoH:Nodo_Copia){
        if(nuevoH!=null){
            this.Hijos.push(nuevoH);
        }
    }
    public addHermano(nuevoH:Nodo_Copia){
        if(nuevoH!=null){
            this.Hermano=nuevoH;
        }
    }

}