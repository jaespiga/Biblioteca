$(document).ready(function(){     /* Ejecutar cuando la página esté cargada */
    var clave_clave;
    
    var clave_tabla = document.getElementById('tabla_nacionalidad_cambio').getAttribute('data-clave');   
    
    // Caso: Autor / Alta                                                                                          
    //comprobamos si se pulsa una tecla
    $("#nacionalidad").keyup(function(){  
        //hacemos focus al campo de búsqueda
        $("#nacionalidad").focus();                            
        //obtenemos el texto introducido en el campo de búsqueda
        clave_clave = $("#nacionalidad").val();

        $.ajax({
            type: "POST",
            url: "basedatos/tabla_codigos_cargar.php",
            data: {param1: clave_tabla,
                   param2: clave_clave},
            dataType: "html"
            })
            .done(function(lista_select){
                if ($.trim(lista_select)) {
                
                        $("#lista_nacionalidades").empty();
                        $("#lista_nacionalidades").html(lista_select);
                } 
            })
            .fail(function(){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Hubo un error al cargar las nacionalidades',
                    footer: '<a href="">Revise  datos de entrada y base de datos/tabla: biblioteca.db / tgr00_codigos</a>'
                })              
            })      
    })
    
    // Caso: Autor / Edición                                                                                          
    //comprobamos si se pulsa una tecla
    $("#nacionalidadE").keyup(function(){  
        //hacemos focus al campo de búsqueda
        $("#nacionalidadE").focus();                            
        //obtenemos el texto introducido en el campo de búsqueda
        clave_clave = $("#nacionalidadE").val();

        $.ajax({
            type: "POST",
            url: "basedatos/tabla_codigos_cargar.php",
            data: {param1: clave_tabla,
                   param2: clave_clave},
            dataType: "html"
            })
            .done(function(lista_select){
                if ($.trim(lista_select)) {
                
                        $("#lista_nacionalidadesE").empty();
                        $("#lista_nacionalidadesE").html(lista_select);
                } 
            })
            .fail(function(){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Hubo un error al cargar las nacionalidades',
                    footer: '<a href="">Revise  datos de entrada y base de datos/tabla: biblioteca.db / tgr00_codigos</a>'
                })              
            })      
    })
})