/* Validación de campos de formulario de autor y actualizar si son correctos */
$(document).ready(function(){     /* Ejecutar cuando la página esté cargada */
    $("#enviar_datos").click(function() {
      form_campos= $('#idApartado').val() + "#&" + $('#idOper').val();
      form_campos = form_campos  +  "#&" + $('#clave').val();
      form_campos = form_campos  +  "#&" + $('#nacionalidad').val();
      form_campos = form_campos  +  "#&" + $('#cliteraria').val();

      fecha= $('#fnac').val() + "-" + $('#fnacmm').val() + "-" + $('#fnacdd').val();
      form_campos = form_campos  +  "#&" + fecha;

      fecha= $('#ffal').val() + "-" + $('#ffalmm').val() + "-" + $('#ffaldd').val();
      form_campos = form_campos  +  "#&" + fecha;

      form_campos = form_campos  +  "#&" + $('#lnac').val();
      form_campos = form_campos  +  "#&" + $('#pnac').val();
      form_campos = form_campos  +  "#&" + $('#lfal').val();
      form_campos = form_campos  +  "#&" + $('#pfal').val();
      form_campos = form_campos  +  "#&" + $('#web').val();

      $.ajax({                        
        type: 'POST',                 
        url: 'basedatos/autor_validar_actualizar.php',
        data: {param1: form_campos}                  
      })    
      .done(function(respuesta){   
        res=respuesta.split("#&")
    
        if (res[0] == 0) { // Indicador de actualización. 0- realizada, resto- no realizada
          if (res[1] == 0) { // Indicador de validación correcta
                Swal.fire({
                  icon: 'success',
                  title: "Operación efectuada"
                })  
                
                if ($('#idOper').val() == "alta") {
                    $('#autorNuevo').modal('hide');  // oculta el modal
                    $('body').removeClass('modal-open');//eliminamos la clase del body para poder hacer scroll
                    $('.modal-backdrop').remove();//eliminamos el backdrop del modal
                }
          } else {
                  Swal.fire({
                    icon: 'success',
                    title: 'Operación realizada con incidencias',
                    html: '<p align="left">' + res[2] + '</p>'
                  })   
              }      
        } else {
                if (res[0] == 1) {
                    Swal.fire({
                      icon: 'error',
                      title: 'Operación no efectuada',
                      html: '<p align="left">' + res[3] + '</p>',
                      footer: '<a href="">Corrija los errores y vuelva a realizarla</a>'
                    })   
                  } else {
                          Swal.fire({
                            icon: 'warning',
                            title: 'Código de validación desconocido: ' + res[0],
                            html: '<p align="left">' + res[3] + '</p>',
                            footer: '<a href="">Se tiene que corregir la codificación de la página Web</a>'
                          })   
                      }
            }
      })
      .fail(function(){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Hubo un error al validar/actualizar datos del autor',
          footer: '<a href="">Revise  datos de entrada y base de datos</a>'
        })                  
      })            
    })  
  })
  