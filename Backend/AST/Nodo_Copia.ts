export class Nodo_Copia {

    private Nombre:string;
    private Tipo:string;
    private Hijos:Nodo_Copia[]=[];

    constructor(nom:string,descripcion:string){
        this.Nombre=nom;
        this.Tipo=descripcion;
    }

    public addChild(nuevoH:Nodo_Copia){
        this.Hijos.push(nuevoH);
    }
    
    public getTipo():string{
        return this.Tipo;
    }

    public getNombre():string{
        return this.Nombre;
    }

}