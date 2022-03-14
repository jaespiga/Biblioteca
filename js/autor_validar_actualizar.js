/* Validación de campos de formulario de autor y actualizar si son correctos */
$(document).ready(function(){     /* Ejecutar cuando la página esté cargada */
    $("#enviar_datos").click(function() {
        form_campos= $("formulario").serialize();
        Swal.fire({
            icon: 'warning',
            title: 'Campos formulario',
            text: form_campos,
          })     


      $.ajax({                        
        type: 'POST',                 
        url: 'rutinas/autor_validar_actualizar.php',
        data: {param1: form_campos}                  
      })    
      .done(function(respuesta){   
        $('#tabla_autores').html(respuesta)
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