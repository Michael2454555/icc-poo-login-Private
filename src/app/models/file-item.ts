export class FileItem{
    //public archivo:File;
    public nombreArchivo:string;
    public url:string;
    public estaSubiendo:boolean;
    public progress:number;

    constructor(public archivo:File){
        //this.archivo=archivo;
        this.nombreArchivo=archivo.name;
        this.estaSubiendo=false;
        this.progress=0;
    }
    
}