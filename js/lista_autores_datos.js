$(document).ready(function(){     /* Ejecutar cuando la página esté cargada */
    $("#autoresDatos").click(function() {
      tecleo = $('#autores').val();
      $.ajax({                        
        type: 'POST',                 
        url: 'basedatos/autores_cargar_datos.php',
        data: {param1: tecleo}                  
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
    })  
  })
  
