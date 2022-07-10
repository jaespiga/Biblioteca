/* cargar listas de autores*/

/* Autor. Obtener la lista total de autores. */
$(document).ready(function(){     /* Ejecutar cuando la página esté cargada */
  $("#autores").each(function () {
    apartado = "Autor";
    clave = $('#autores').val();
    $.ajax({                        
      type: 'POST',                 
      url: 'basedatos/cargar_lista.php',
      data: {
          param0: apartado,
          param1: clave
      }                  
    })    
    .done(function(lista_select){
        $('#lista_autores').html(lista_select)
    })
    .fail(function(){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Hubo un error al cargar lista de autores',
        footer: '<a href="">Revise  datos de entrada y base de datos</a>'
      })                   
    })            
  })  

  /* Autor. Obtener la lista ajustada a los valores de la clave tecleados. */
  $("#autores").keyup(function(){     
    //hacemos focus al campo de búsqueda
    $("#autores").focus();
                                                     
    //obtenemos el texto introducido en el campo de búsqueda
    apartado = "Autor";
    clave = $('#autores').val();
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
                title: 'No existe ningún autor con esa combinación de caracteres.',
                text: 'Nota. Se tiene en cuenta los acentos',
                showConfirmButton: false,
                timer: 3000
            })

        } else {
                $("#lista_autores").empty();
                $("#lista_autores").html(lista_select);
        } 
    })
    .fail(function(){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Hubo un error al cargar autores',
            footer: '<a href="">Revise  datos de entrada y base de datos</a>'
        })              
    })      
  })
})