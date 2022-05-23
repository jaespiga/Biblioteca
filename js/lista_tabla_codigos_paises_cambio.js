$(document).ready(function(){     /* Ejecutar cuando la página esté cargada */
    var clave_clave;
    
    var clave_tabla = document.getElementById('tabla_paises_cambio').getAttribute('data-clave'); 
    
    // Caso: Autor / Alta                                                                                             
    //comprobamos si se pulsa una tecla
    $("#pnac").keyup(function(){  
        //hacemos focus al campo de búsqueda
        $("#pnac").focus();                            
        //obtenemos el texto introducido en el campo de búsqueda
        clave_clave = $("#pnac").val();

        $.ajax({
            type: "POST",
            url: "basedatos/tabla_codigos_cargar.php",
            data: {param1: clave_tabla,
                   param2: clave_clave},
            dataType: "html"
            })
            .done(function(lista_select){
                if ($.trim(lista_select)) {
                
                        $("#lista_paises1").empty();
                        $("#lista_paises1").html(lista_select);
                } 
            })
            .fail(function(){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Hubo un error al cargar países',
                    footer: '<a href="">Revise  datos de entrada y base de datos/tabla: biblioteca.db / tgr00_codigos</a>'
                })              
            })      
    })

    //comprobamos si se pulsa una tecla
    $("#pfal").keyup(function(){  
        //hacemos focus al campo de búsqueda
        $("#pfal").focus();                            
        //obtenemos el texto introducido en el campo de búsqueda
        clave_clave = $("#pfal").val();

        $.ajax({
            type: "POST",
            url: "basedatos/tabla_codigos_cargar.php",
            data: {param1: clave_tabla,
                   param2: clave_clave},
            dataType: "html"
            })
            .done(function(lista_select){
                if (!$.trim(lista_select)) {
                    
                    Swal.fire({
                        position: 'top',
                        icon: 'info',
                        title: 'No existe ningún país con esa combinación de caracteres.',
                        text: 'Nota. Se tiene en cuenta los acentos',
                        showConfirmButton: false,
                        timer: 3000
                    })
        
                } else {
                        $("#lista_paises2").empty();
                        $("#lista_paises2").html(lista_select);
                } 
            })
            .fail(function(){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Hubo un error al cargar países',
                    footer: '<a href="">Revise  datos de entrada y base de datos/tabla: biblioteca.db / tgr00_codigos</a>'
                })              
            })      
    })
    // Caso: Autor / Edición                                                                                             
    //comprobamos si se pulsa una tecla
    $("#pnacE").keyup(function(){  
        //hacemos focus al campo de búsqueda
        $("#pnacE").focus();                            
        //obtenemos el texto introducido en el campo de búsqueda
        clave_clave = $("#pnacE").val();

        $.ajax({
            type: "POST",
            url: "basedatos/tabla_codigos_cargar.php",
            data: {param1: clave_tabla,
                   param2: clave_clave},
            dataType: "html"
            })
            .done(function(lista_select){
                if ($.trim(lista_select)) {
                
                        $("#lista_paises1E").empty();
                        $("#lista_paises1E").html(lista_select);
                } 
            })
            .fail(function(){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Hubo un error al cargar países',
                    footer: '<a href="">Revise  datos de entrada y base de datos/tabla: biblioteca.db / tgr00_codigos</a>'
                })              
            })      
    })

    //comprobamos si se pulsa una tecla
    $("#pfalE").keyup(function(){  
        //hacemos focus al campo de búsqueda
        $("#pfalE").focus();                            
        //obtenemos el texto introducido en el campo de búsqueda
        clave_clave = $("#pfalE").val();

        $.ajax({
            type: "POST",
            url: "basedatos/tabla_codigos_cargar.php",
            data: {param1: clave_tabla,
                   param2: clave_clave},
            dataType: "html"
            })
            .done(function(lista_select){
                if (!$.trim(lista_select)) {
                    
                    Swal.fire({
                        position: 'top',
                        icon: 'info',
                        title: 'No existe ningún país con esa combinación de caracteres.',
                        text: 'Nota. Se tiene en cuenta los acentos',
                        showConfirmButton: false,
                        timer: 3000
                    })
        
                } else {
                        $("#lista_paises2E").empty();
                        $("#lista_paises2E").html(lista_select);
                } 
            })
            .fail(function(){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Hubo un error al cargar países',
                    footer: '<a href="">Revise  datos de entrada y base de datos/tabla: biblioteca.db / tgr00_codigos</a>'
                })              
            })      
    })
})