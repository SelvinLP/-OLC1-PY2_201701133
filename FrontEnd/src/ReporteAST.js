
var arrayCollection = [
    {"id": "animal", "parent": "#", "text": "Animales"},
    {"id": "device", "parent": "#", "text": "Devices"},
    {"id": "dog", "parent": "animal", "text": "Dogs"},
    {"id": "lion", "parent": "animal", "text": "Lions"}
];

$(function() {
    $('#html').jstree({
        'core': {
            'data': arrayCollection
        }
    });
});

//Reporte de Errores
function MostrarReporte_E(){
    var url='http://localhost:3080/Errores';
  
    $.post(url,{contenido:""},function(data,status){
      if(status.toString()=="success"){
        MostrarR(data);
     }
    });
} 
document.getElementById("R_Error").onclick=function(){
    MostrarReporte_E();
}
function MostrarR(contenido) {
    //HTML
    var nueva_ventana = window.open('../Reporte_Error.html','_blank');
    var texto=contenido;
    nueva_ventana.document.write(texto);
}