$(document).ready(function(){     /* Ejecutar cuando la página esté cargada */
    $("#autoresDatos").click(function() {
      form_campos= "Autor" + "#&" + "general" + "#&" + $('#autores').val();
      $.ajax({                        
        type: 'POST',                 
        url: 'basedatos/autores_cargar_datos.php',
        data: {param1: form_campos}                  
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
      form_campos= "Libro" + "#&" + "general" + "#&" + $('#libros').val();
      $.ajax({                        
        type: 'POST',                 
        url: 'basedatos/libros_cargar_datos.php',
        data: {param1: form_campos}                  
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

    $(".lecturasDatos").click(function() {
    
      form_campos= "Lectura" + "#&" + "general"+ "#&" + $('#lectores').val()+ "#&" + $('#libros').val() 
                  + "#&" + $('#autores').val();
      $.ajax({                        
        type: 'POST',                 
        url: 'basedatos/lecturas_cargar_datos.php',
        data: {param1: form_campos}                  
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
})  
