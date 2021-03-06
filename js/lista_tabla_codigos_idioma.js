$(document).ready(function(){     /* Ejecutar cuando la página esté cargada */
  var clave_tabla = document.getElementById('tabla_idioma').getAttribute('data-clave');
  
  $.ajax({                        
    type: 'POST',                 
    url: 'basedatos/tabla_codigos_cargar.php',
    data: {param1: clave_tabla,
           param2: ""}    
  })    
  .done(function(lista_select){
    $('#lista_idioma').html(lista_select)                 // Alta     (idioma en que lo escribió el autor)
    $('#lista_idiomaE').html(lista_select)                // Edición  (idioma en que lo escribió el autor)
    $('#lista_idiomaF').html(lista_select)                // Filtro   (idioma en que lo escribió el autor)
    $('#lista_idioma_lectura').html(lista_select)         // Alta     (idioma en que se ha leído)
    $('#lista_idiomaE_lectura').html(lista_select)        // Edición  (idioma en que se ha leído)
    $('#lista_idiomaF_lectura').html(lista_select)        // Filtro   (idioma en que se ha leído)
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