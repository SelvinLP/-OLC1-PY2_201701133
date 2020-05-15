//Evento
window.addEventListener('load', inicio, false);
//Funciones
function inicio() {
    document.getElementById('archivo').addEventListener('change', cargar, false); 
}

function cargar(ev) {   
    var arch=new FileReader();
    //Cargar Archivos
    arch.addEventListener('load',leer,false);
    arch.readAsText(ev.target.files[0]);
}

function leer(ev) {
  Limpiar();
  //Agregamos
  document.getElementById('CampoTexto').value=ev.target.result;
}

function Limpiar(){
  //Limpiamos
  document.getElementById('CampoTexto').value="";
}
document.getElementById("Nuevo_archivo").onclick=function(){
  Limpiar();
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
  var texto = document.getElementById('CampoTexto').value;

  var url='http://localhost:3080/Analizar';

  $.post(url,{contenido:texto},function(data,status){
  });
} 
document.getElementById("boton_L").onclick=function(){
  Analizar();
}
