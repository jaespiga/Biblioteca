/* Validación de campos de formulario de autor y actualizar si son correctos */
$(document).ready(function(){     /* Ejecutar cuando la página esté cargada */
    $("#enviar_datos").click(function() {
      form_campos= $('#idApartado').val() + "#&" + $('#idOper').val();
      form_campos = form_campos  +  "#&" + $('#clave').val();
      form_campos = form_campos  +  "#&" + $('#nacionalidad').val();
      form_campos = form_campos  +  "#&" + $('#cliteraria').val();
      form_campos = form_campos  +  "#&" + $('#fnac').val();
      form_campos = form_campos  +  "#&" + $('#ffal').val();
      form_campos = form_campos  +  "#&" + $('#lnac').val();
      form_campos = form_campos  +  "#&" + $('#pnac').val();
      form_campos = form_campos  +  "#&" + $('#lfal').val();
      form_campos = form_campos  +  "#&" + $('#pfal').val();
      form_campos = form_campos  +  "#&" + $('#web').val();
      
      alert ("formulario " + form_campos);
      Swal.fire({
          icon: 'warning',
          title: 'Campos formulario',
          text: "formulario: " + form_campos
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