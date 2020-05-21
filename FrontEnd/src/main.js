//codemirror en campos
var editor = CodeMirror.fromTextArea(document.getElementById("CampoTexto"), {
  lineNumbers: true,
  mode: "text/x-java",
  matchBrackets: true
});
editor.setSize(550, 400);
//campo2
var editor2 = CodeMirror.fromTextArea(document.getElementById("CampoTextoPython"), {
  lineNumbers: true,
  mode: "text/x-java",
  matchBrackets: true
});
editor2.setSize(550, 400);


//Evento
window.addEventListener('load', inicio, false);
//Funciones
function inicio() {
    document.getElementById('archivo').addEventListener('change', cargar, false); 
    document.getElementById('archivoC').addEventListener('change', cargar2, false); 
}

function cargar(ev) {   
    var arch=new FileReader();
    //Cargar Archivos
    arch.addEventListener('load',leer,false);
    arch.readAsText(ev.target.files[0]);
}
function cargar2(ev) {   
  var arch=new FileReader();
  //Cargar Archivos
  arch.addEventListener('load',leer2,false);
  arch.readAsText(ev.target.files[0]);
}

function leer(ev) {
  Limpiar();
  //Agregamos
  editor.getDoc().setValue(ev.target.result);
}
function leer2(ev) {
  Limpiar();
  //Agregamos
  editor2.getDoc().setValue(ev.target.result);
}

function Limpiar(){
  //Limpiamos
  editor.getDoc().setValue('');
}
document.getElementById("Nuevo_archivo").onclick=function(){
  Limpiar();
}
function LimpiarCopia(){
  //Limpiamos
  editor2.getDoc().setValue('');
}
document.getElementById("Nuevo_archivo2").onclick=function(){
  LimpiarCopia();
}


function Guardar(){
  var NombreArchivo=prompt("Ingrese Nombre del Archivo");
  var ContenidoDeArchivo = document.getElementById('CampoTexto').value;

  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(ContenidoDeArchivo));
  element.setAttribute('download', NombreArchivo);

  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
} 
document.getElementById("Guarda").onclick=function(){
  Guardar();
}

function GuardarPy(){
  var NombreArchivo=prompt("Ingrese Nombre del Archivo");
  var ContenidoDeArchivo = document.getElementById('CampoTextoPython').value;

  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(ContenidoDeArchivo));
  element.setAttribute('download', NombreArchivo);

  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
} 
document.getElementById("Des_Py").onclick=function(){
  GuardarPy();
}
function Analizar(){
  var texto = editor.getValue();
  console.log(texto);
  var url='http://localhost:3080/Analizar';

  $.post(url,{contenido:texto},function(data,status){
    if(status.toString()=="success"){
      console.log("El resultado Convertido: "+JSON.stringify(data));
      arrayCollection=data;

    //Actualizar
    $('#html').jstree(true).settings.core.data = arrayCollection; 
    $('#html').jstree(true).refresh(); 
    alert("Se ha Analizado Correctamente");
      
  }else{
      alert("Error estado de conexion:"+status);
  }
  });
} 
document.getElementById("boton_L").onclick=function(){
  Analizar();
}


