/* cargar listas de libros*/
/* Libro. Obtener la lista total de libros. */
$(document).ready(function(){     /* Ejecutar cuando la página esté cargada */
  $("#libros").each(function () {
    apartado = "Libro";
    clave = $('#libros').val();
    $.ajax({                        
      type: 'POST',                 
      url: 'basedatos/cargar_lista.php',
      data: {
          param0: apartado,
          param1: clave
      }                  
    })    
    .done(function(lista_select){
        $('#lista_libros').html(lista_select)
    })
    .fail(function(){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Hubo un error al cargar la lista de libros',
        footer: '<a href="">Revise  datos de entrada y base de datos</a>'
      })                   
    })            
  })  

  /* Libro. Obtener la lista ajustada a los valores de la clave tecleados. */
  $("#libros").keyup(function(){     
    //hacemos focus al campo de búsqueda
    $("#libros").focus();
                                                     
    //obtenemos el texto introducido en el campo de búsqueda
    apartado = "Libro";
    clave = $('#libros').val();
    $.ajax({                        
    type: 'POST',                 
    url: 'basedatos/cargar_lista.php',
    data: {
            param0: apartado,
            param1: clave
        }                  
    })           
    .done(function(lista_select){
        if (!$.trim(lista_select)) {
            
            Swal.fire({
                position: 'top',
                icon: 'info',
                title: 'No existe ningún libro con esa combinación de caracteres.',
                text: 'Nota. Se tiene en cuenta los acentos',
                showConfirmButton: false,
                timer: 3000
            })

        } else {
                $("#lista_libros").empty();
                $("#lista_libros").html(lista_select);
        } 
    })
    .fail(function(){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Hubo un error al cargar libros',
            footer: '<a href="">Revise  datos de entrada y base de datos</a>'
        })              
    })      
  })
})
