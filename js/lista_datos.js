$(document).ready(function(){     /* Ejecutar cuando la página esté cargada */
    $("#autoresDatos").click(function() {
      autor = $('#autores').val();
      $.ajax({                        
        type: 'POST',                 
        url: 'basedatos/autores_cargar_datos.php',
        data: {param1: autor}                  
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

    $("#librosDatos").click(function() {
      libro = $('#libros').val();
      $.ajax({                        
        type: 'POST',                 
        url: 'basedatos/libros_cargar_datos.php',
        data: {param1: libro}                  
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
    })  
  })

  $(".lecturasDatos").click(function() {
    lector = $('#lectores').val();
    libro = $('#libros').val();
    autor = $('#autores').val();
    $.ajax({                        
      type: 'POST',                 
      url: 'basedatos/lecturas_cargar_datos.php',
      data: {param1: lector,
             param2: libro,
             param3: autor
      }                  
    })    
    .done(function(lista_select){  
    //  list_select tiene la información de javascript (comentarios y la tabla rellena) de la rutina.
      $('#tabla_lecturas').html(lista_select)
    })
    .fail(function(){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Hubo un error al cargar datos de lectura',
        footer: '<a href="">Revise  datos de entrada y base de datos</a>'
      })                  
    })              
})  
