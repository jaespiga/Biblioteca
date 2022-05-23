$(document).ready(function(){     /* Ejecutar cuando la página esté cargada */  
    var clave_clave;
    var clave_tabla = document.getElementById('tabla_clit_cambio').getAttribute('data-clave');
    
    // Caso: Autor / Alta
    //comprobamos si se pulsa una tecla
    $("#cliteraria").keyup(function(){  
        //hacemos focus al campo de búsqueda
        $("#cliteraria").focus();                            
        //obtenemos el texto introducido en el campo de búsqueda
        clave_clave = $("#cliteraria").val();

        $.ajax({
            type: "POST",
            url: "basedatos/tabla_codigos_cargar.php",
            data: {param1: clave_tabla,
                   param2: clave_clave},
            dataType: "html"
            })
            .done(function(lista_select){
                if ($.trim(lista_select)) {
                
                        $("#lista_clit").empty();
                        $("#lista_clit").html(lista_select);
                        
                } 
            })
            .fail(function(){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Hubo un error al cargar las corrientes literarias',
                    footer: '<a href="">Revise  datos de entrada y base de datos/tabla: biblioteca.db / tgr00_codigos</a>'
                })              
            })      
    })
    // Caso: Autor / Edición
    //comprobamos si se pulsa una tecla
    $("#cliterariaE").keyup(function(){  
        //hacemos focus al campo de búsqueda
        $("#cliterariaE").focus();                            
        //obtenemos el texto introducido en el campo de búsqueda
        clave_clave = $("#cliterariaE").val();
        $.ajax({
            type: "POST",
            url: "basedatos/tabla_codigos_cargar.php",
            data: {param1: clave_tabla,
                    param2: clave_clave},
            dataType: "html"
            })
            .done(function(lista_select){
                if ($.trim(lista_select)) {
                    $("#lista_clitE").empty();
                    $("#lista_clitE").html(lista_select);                 
                } 
            })
            .fail(function(){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Hubo un error al cargar las corrientes literarias',
                    footer: '<a href="">Revise  datos de entrada y base de datos/tabla: biblioteca.db / tgr00_codigos</a>'
                })              
            })      
    })
})