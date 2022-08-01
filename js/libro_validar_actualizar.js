/* Validación de campos de formulario de libro y actualizar si son correctos */
/* Alta libro */
$(document).ready(function(){     /* Ejecutar cuando la página esté cargada */
    $("#enviar_datos").click(function() {       /* Alta de autor */       
      form_campos= $('#idApartado').val() + "#&" + $('#idOper').val();
      form_campos = form_campos  +  "#&" + $('#clave').val();
      form_campos = form_campos  +  "#&" + $('#autores').val();
      form_campos = form_campos  +  "#&" + $('#editorial').val();

      fecha= $('#fpub').val() + "-" + $('#fpubmm').val() + "-" + $('#fpubdd').val();
      form_campos = form_campos  +  "#&" + fecha;

      form_campos = form_campos  +  "#&" + $('#propietario').val();

      fecha= $('#fadq').val() + "-" + $('#fadqmm').val() + "-" + $('#fadqdd').val();
      form_campos = form_campos  +  "#&" + fecha;

      form_campos = form_campos  +  "#&" + $('#genlit').val();
      form_campos = form_campos  +  "#&" + $('#idioma').val();
      form_campos = form_campos  +  "#&" + $('#soplib').val();
      form_campos = form_campos  +  "#&" + $('#sitlib').val();
      form_campos = form_campos  +  "#&" + $('#persona').val();
      
      fecha= $('#fest').val() + "-" + $('#festmm').val() + "-" + $('#festdd').val();
      form_campos = form_campos  +  "#&" + fecha;

      form_campos = form_campos  +  "#&" + $('#sinopsis').val();
      form_campos = form_campos  +  "#&" + $('#web').val();
      
      $.ajax({                        
        type: 'POST',                 
        url: 'basedatos/libro_validar_actualizar.php',
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
                    $('#libroNuevo').modal('hide');  // oculta el modal
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
          text: 'Hubo un error al validar/actualizar datos del libro',
          footer: '<a href="">Revise  datos de entrada y base de datos</a>'
        })                  
      })            
    })  

    /* Editar datos del libro */
    $("#actualizar_datos").click(function() { /* Actualizar datos del libro */ 
      form_campos= $('#idApartadoE').val() + "#&" + $('#idOperE').val();
      form_campos = form_campos  +  "#&" + $('#claveE').val();
      form_campos = form_campos  +  "#&" + $('#autoresE').val();
      form_campos = form_campos  +  "#&" + $('#editorialE').val();

      fecha= $('#fpubE').val() + "-" + $('#fpubEmm').val() + "-" + $('#fpubEdd').val();
      form_campos = form_campos  +  "#&" + fecha;

      form_campos = form_campos  +  "#&" + $('#propietarioE').val();

      fecha= $('#fadqE').val() + "-" + $('#fadqEmm').val() + "-" + $('#fadqEdd').val();
      form_campos = form_campos  +  "#&" + fecha;

      form_campos = form_campos  +  "#&" + $('#genlitE').val();
      form_campos = form_campos  +  "#&" + $('#idiomaE').val();
      form_campos = form_campos  +  "#&" + $('#soplibE').val();
      form_campos = form_campos  +  "#&" + $('#sitlibE').val();
      form_campos = form_campos  +  "#&" + $('#personaE').val();
    
      fecha= $('#festE').val() + "-" + $('#festEmm').val() + "-" + $('#festEdd').val();
      form_campos = form_campos  +  "#&" + fecha;

      form_campos = form_campos  +  "#&" + $('#sinopsisE').val();
      form_campos = form_campos  +  "#&" + $('#webE').val();
      form_campos = form_campos  +  "#&" + $('#tSUltCambioE').val();
      
      $.ajax({                        
        type: 'POST',                 
        url: 'basedatos/libro_validar_actualizar.php',
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
    
    /* Filtrar datos de los libros */
    $("#filtro_datos_libro").click(function() { 
      
      form_campos= "Lectura" + "#&" + "filtro";
      form_campos = form_campos  +  "#&" + $('#autoresF').val();
      form_campos = form_campos  +  "#&" + $('#editorialF').val();

      fecha= $('#fpubFI').val() + "-" + $('#fpubFImm').val() + "-" + $('#fpubFIdd').val();
      form_campos = form_campos  +  "#&" + fecha;

      fecha= $('#fpubFS').val() + "-" + $('#fpubFSmm').val() + "-" + $('#fpubFSdd').val();
      form_campos = form_campos  +  "#&" + fecha;

      form_campos = form_campos  +  "#&" + $('#genlitF').val();
      form_campos = form_campos  +  "#&" + $('#idiomaF').val();
      form_campos = form_campos  +  "#&" + $('#soplibF').val();
      form_campos = form_campos  +  "#&" + $('#sitlibF').val();

      fecha= $('#fadqFI').val() + "-" + $('#fadqFImm').val() + "-" + $('#fadqFIdd').val();
      form_campos = form_campos  +  "#&" + fecha;

      fecha= $('#fadqFS').val() + "-" + $('#fadqFSmm').val() + "-" + $('#fadqFSdd').val();
      form_campos = form_campos  +  "#&" + fecha;

      $.ajax({                        
        type: 'POST',                 
        url: 'basedatos/libro_validar_filtro.php',
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
            url: 'basedatos/libros_cargar_datos.php',
            data: {param1: datos_entrada}                  
          })    
          .done(function(lista_select){   
              //  list_select tiene la información de javascript (comentarios y la tabla rellena) de la rutina. 
              $('#tabla_libros').html(lista_select)   

          })
          .fail(function(){
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Hubo un error al cargar datos de libros',
              footer: '<a href="">Revise  datos de entrada y base de datos</a>'
            })                  
          })              

        } else {
              Swal.fire({
                icon: 'error',
                title: 'Validación con incidencias',
                html: '<p align="left">' + res[1] + '</p>',
                footer: '<a href="">Corrija los errores y vuelva a realizarla</a>'
              })   
            }
      })
      .fail(function(){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Hubo un error al validar/actualizar datos del libro',
          footer: '<a href="">Revise  datos de entrada y base de datos</a>'
        })                  
      })            
    })  
  })
