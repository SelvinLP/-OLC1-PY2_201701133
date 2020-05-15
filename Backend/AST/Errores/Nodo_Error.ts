export class Nodo_Error {

    private Tipo:string;
    private Descripcion:string;
    private Linea:number;

    constructor(tipo:string,descripcion:string,linea:number){
        this.Tipo=tipo;
        this.Descripcion=descripcion;
        this.Linea=(linea+1);
    }

    public getTipo():string{
        return this.Tipo;
    }

    public getDescripcion():string{
        return this.Descripcion;
    }

    public getLinea():number{
        return this.Linea;
    }
}