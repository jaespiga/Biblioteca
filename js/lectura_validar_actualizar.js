/* Validación de campos de formulario de lectura y actualizar si son correctos */
/* Alta lectura */
$(document).ready(function(){     /* Ejecutar cuando la página esté cargada */
    $("#enviar_datos_lectura").click(function() {       /* Alta de autor */       
      form_campos= $('#idApartado_lectura').val() + "#&" + $('#idOper_lectura').val();
      form_campos = form_campos  +  "#&" + $('#lector').val();
      form_campos = form_campos  +  "#&" + $('#libros_lectura').val();
      form_campos = form_campos  +  "#&" + $('#autores_lectura').val();
      form_campos = form_campos  +  "#&" + $('#idioma_lectura').val();
      form_campos = form_campos  +  "#&" + $('#calificacion').val();

      fecha= $('#finil').val() + "-" + $('#finilmm').val() + "-" + $('#finildd').val();
      form_campos = form_campos  +  "#&" + fecha;

      fecha= $('#ffinl').val() + "-" + $('#ffinlmm').val() + "-" + $('#ffinldd').val();
      form_campos = form_campos  +  "#&" + fecha;

      
      form_campos = form_campos  +  "#&" + $('#opinion').val();
      
      $.ajax({                        
        type: 'POST',                 
        url: 'basedatos/lectura_validar_actualizar.php',
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
                    $('#lecturaNuevo').modal('hide');  // oculta el modal
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
          text: 'Hubo un error al validar/actualizar datos de la lectura',
          footer: '<a href="">Revise  datos de entrada y base de datos</a>'
        })                  
      })            
    })  

    /* Editar datos de la lectura */
    $("#actualizar_datos_lectura").click(function() { /* Actualizar datos de la lectura */ 
      form_campos= $('#idApartadoE_lectura').val() + "#&" + $('#idOperE_lectura').val();
      form_campos = form_campos  +  "#&" + $('#lectorE').val();
      form_campos = form_campos  +  "#&" + $('#librosE_lectura').val();
      form_campos = form_campos  +  "#&" + $('#autoresE_lectura').val();
      form_campos = form_campos  +  "#&" + $('#idiomaE_lectura').val();
      form_campos = form_campos  +  "#&" + $('#calificacionE').val();

      fecha= $('#finilE').val() + "-" + $('#finilEmm').val() + "-" + $('#finilEdd').val();
      form_campos = form_campos  +  "#&" + fecha;

      fecha= $('#ffinlE').val() + "-" + $('#ffinlEmm').val() + "-" + $('#ffinlEdd').val();
      form_campos = form_campos  +  "#&" + fecha;

      form_campos = form_campos  +  "#&" + $('#idiomaE').val();
      form_campos = form_campos  +  "#&" + $('#opinionE').val();
      form_campos = form_campos  +  "#&" + $('#tSUltCambioE').val();
      
      $.ajax({                        
        type: 'POST',                 
        url: 'basedatos/lectura_validar_actualizar.php',
        data: {param1: form_campos}                  
      })    
      .done(function(respuesta){   
        res=respuesta.split("#&")
    
        if (res[0] == 0) { // Indicador de actualización. 0- realizada, resto- no realizada
          
          if (res[1] == 0) { // Indicador de validación correcta
              Swal.fire({
                icon: 'success',
                title: "Operación efectuada",
                confirmButtonText: 'Ok'
              }).then((result) => {
                    if (result.isConfirmed) {
                        location.reload();
                    };
                  }
                );

              if ($('#idOperE').val() == "alta") {
                  $('#autorEdicion').modal('hide');  // oculta el modal
                  $('body').removeClass('modal-open');//eliminamos la clase del body para poder hacer scroll
                  $('.modal-backdrop').remove();//eliminamos el backdrop del modal
              }
          } else {

              Swal.fire({
                icon: 'success',
                title: 'Operación realizada con incidencias',
                html: '<p align="left">' + res[2] + '</p>',
                confirmButtonText: 'Ok'
              }).then((result) => {
                  if (result.isConfirmed) {
                      location.reload();
                  };
                }
              );
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