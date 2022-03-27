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

      $.ajax({                        
        type: 'POST',                 
        url: 'basedatos/autor_validar_actualizar.php',
        data: {param1: form_campos}                  
      })    
      .done(function(respuesta){   
        alert ("respuesta: " + respuesta)
        res=respuesta.split("#&")
        alert ("status: " + res[0])
        
        if (res[0] == "0") {
                      Swal.fire({
                        icon: 'succes',
                        title: res[1],
                      })  
                      
                      if ($('#idOper').val() == "alta") {
                          $('#autorNuevo').fadeOut();
                      } 
        } else {
                if (res[0] == "1") {
                    Swal.fire({
                      icon: 'error',
                      title: 'Operación no efectuada',
                      text: res[1],
                      footer: '<a href="">Corrija los errores y vuelva a realizarla</a>'
                    })   
                  } else {
                          if (res[0] == "2") {
                            Swal.fire({
                              icon: 'succes',
                              title: 'Operación realizada con incidencias',
                              text: res[1],
                              footer: '<a href="">Corrija los errores y vuelva a realizarla</a>'
                            })   
                          } else {
                                  Swal.fire({
                                    icon: 'warning',
                                    title: 'Código de respuesta desconocido',
                                    text: res[1],
                                    footer: '<a href="">Corrija los errores y vuelva a realizarla</a>'
                                  })   

                              }
                      }
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
  