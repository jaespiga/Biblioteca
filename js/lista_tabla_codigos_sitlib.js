$(document).ready(function(){     /* Ejecutar cuando la página esté cargada */
  var clave_tabla = document.getElementById('tabla_sitlib').getAttribute('data-clave');
  
  $.ajax({                        
    type: 'POST',                 
    url: 'basedatos/tabla_codigos_cargar.php',
    data: {param1: clave_tabla,
           param2: ""}    
  })    
  .done(function(lista_select){
    $('#lista_sitlib').html(lista_select)         // Alta
    $('#lista_sitlibE').html(lista_select)        // Edición
    $('#lista_sitlibF').html(lista_select)        // Filtro
  })
  .fail(function(){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Hubo un error al cargar la tabla de códigos con clave: ' + clave_tabla,
      footer: '<a href="">Revise  datos de entrada y base de datos/tabla: biblioteca.db / tgr00_codigos</a>'
    })                 
  })              
})