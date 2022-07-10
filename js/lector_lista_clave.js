/* cargar listas de lectores*/
/* Lector. Obtener la lista total de lectores. */
$(document).ready(function(){     /* Ejecutar cuando la página esté cargada */
  $("#lectores").each(function () {
    apartado = "Lector";
    clave = $('#lectores').val();
    $.ajax({                        
      type: 'POST',                 
      url: 'basedatos/cargar_lista.php',
      data: {
          param0: apartado,
          param1: clave
      }                  
    })    
    .done(function(lista_select){
        $('#lista_lectores').html(lista_select)
    })
    .fail(function(){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Hubo un error al cargar la lista de lectores',
        footer: '<a href="">Revise  datos de entrada y base de datos</a>'
      })                   
    })            
  })  

  /* Lector. Obtener la lista ajustada a los valores de la clave tecleados. */
  $("#lectores").keyup(function(){     
    //hacemos focus al campo de búsqueda
    $("#lectores").focus();
                                                     
    //obtenemos el texto introducido en el campo de búsqueda
    apartado = "Lector";
    clave = $('#lectores').val();
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
                title: 'No existe ningún lector con esa combinación de caracteres.',
                text: 'Nota. Se tiene en cuenta los acentos',
                showConfirmButton: false,
                timer: 3000
            })

        } else {
                $("#lista_lectores").empty();
                $("#lista_lectores").html(lista_select);
        } 
    })
    .fail(function(){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Hubo un error al cargar lectores',
            footer: '<a href="">Revise  datos de entrada y base de datos</a>'
        })              
    })      
  })
})
