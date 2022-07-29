/* Validación de campos de formulario de autor y actualizar si son correctos */
/* Validación de campos de formulario de filtro dentro de datos de autores y tratar carga datos si son correctos */
/* Alta autor */
$(document).ready(function(){     /* Ejecutar cuando la página esté cargada */
    $("#enviar_datos").click(function() {       /* Alta de autor */       
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

    /* Editar datos de autor */
    $("#actualizar_datos").click(function() { /* Actualizar datos de autor */ 
      form_campos= $('#idApartadoE').val() + "#&" + $('#idOperE').val();
      form_campos = form_campos  +  "#&" + $('#claveE').val();
      form_campos = form_campos  +  "#&" + $('#nacionalidadE').val();
      form_campos = form_campos  +  "#&" + $('#cliterariaE').val();

      fecha= $('#fnacE').val() + "-" + $('#fnacEmm').val() + "-" + $('#fnacEdd').val();
      form_campos = form_campos  +  "#&" + fecha;

      fecha= $('#ffalE').val() + "-" + $('#ffalEmm').val() + "-" + $('#ffalEdd').val();
      form_campos = form_campos  +  "#&" + fecha;

      form_campos = form_campos  +  "#&" + $('#lnacE').val();
      form_campos = form_campos  +  "#&" + $('#pnacE').val();
      form_campos = form_campos  +  "#&" + $('#lfalE').val();
      form_campos = form_campos  +  "#&" + $('#pfalE').val();
      form_campos = form_campos  +  "#&" + $('#webE').val();
      form_campos = form_campos  +  "#&" + $('#tSUltCambioE').val();
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
    
    /* Filtrar datos de los autores */
    $("#filtro_datos").click(function() { /* Actualizar datos de autor */ 
      
      form_campos= "Autor" + "#&" + "filtro";
      form_campos = form_campos  +  "#&" + $('#nacionalidadF').val();
      form_campos = form_campos  +  "#&" + $('#cliterariaF').val();
      form_campos = form_campos  +  "#&" + $('#pnacF').val();

      fecha= $('#fnacFI').val() + "-" + $('#fnacFImm').val() + "-" + $('#fnacFIdd').val();
      form_campos = form_campos  +  "#&" + fecha;

      fecha= $('#fnacFS').val() + "-" + $('#fnacFSmm').val() + "-" + $('#fnacFSdd').val();
      form_campos = form_campos  +  "#&" + fecha;

      form_campos = form_campos  +  "#&" + $('#pfalF').val();

      fecha= $('#ffalFI').val() + "-" + $('#ffalFImm').val() + "-" + $('#ffalFIdd').val();
      form_campos = form_campos  +  "#&" + fecha;

      fecha= $('#ffalFS').val() + "-" + $('#ffalFSmm').val() + "-" + $('#ffalFSdd').val();
      form_campos = form_campos  +  "#&" + fecha;

      $.ajax({                        
        type: 'POST',                 
        url: 'basedatos/autor_validar_filtro.php',
        data: {param1: form_campos}                  
      })    
      .done(function(respuesta){   
        res=respuesta.split("#&")
        nro_elementos = respuesta.split("#&").length

        if (res[0] == 0) {
          // Formatear datos de entrada a partir de la salida de la validación de datos
          datos_entrada = res[2]
          for (var indice = 3; indice < nro_elementos; indice++) {
            datos_entrada += "#&";
            datos_entrada += res[indice];
          }

          $.ajax({                        
            type: 'POST',                 
            url: 'basedatos/autores_cargar_datos.php',
            data: {param1: datos_entrada}                  
          })    
          .done(function(lista_select){   
              //  list_select tiene la información de javascript (comentarios y la tabla rellena) de la rutina. 
              $('#tabla_autores').html(lista_select)   

          })
          .fail(function(){
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Hubo un error al cargar datos de autores',
              footer: '<a href="">Revise  datos de entrada y base de datos</a>'
            })                  
          })              

        } else {
              Swal.fire({
                icon: 'error',
                title: 'Validación con incidencias',
                html: '<p align="left">' + res[3] + '</p>',
                footer: '<a href="">Corrija los errores y vuelva a realizarla</a>'
              })   
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
  