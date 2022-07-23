$(document).ready(function(){     /* Ejecutar cuando la página esté cargada */
    var clave_tabla = document.getElementById('tabla_paises').getAttribute('data-clave');
    var clave_codigo =""
    $.ajax({                        
      type: 'POST',                 
      url: 'basedatos/tabla_codigos_cargar.php',
      data: {param1: clave_tabla,
             param2: clave_codigo}    
    })    
    .done(function(lista_select){
          $('#lista_paises1').html(lista_select)
          $('#lista_paises2').html(lista_select)
          $('#lista_paises1E').html(lista_select)
          $('#lista_paises2E').html(lista_select)
          $('#lista_paises1F').html(lista_select)
          $('#lista_paises2F').html(lista_select)
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