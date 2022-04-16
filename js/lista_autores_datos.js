$(document).ready(function(){     /* Ejecutar cuando la página esté cargada */
    $("#autoresDatos").click(function() {
      alert ("autores datos");
      tecleo = $('#autores').val();
      $.ajax({                        
        type: 'POST',                 
        url: 'basedatos/autores_cargar_datos.php',
        data: {param1: tecleo}                  
      })    
      .done(function(lista_select){ 
        alert (lista_select)  
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
  
