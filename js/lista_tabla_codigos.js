// carga de las listas de todas las tablas de códigos ordenado por los valores tecleados
$(document).ready(function(){     /* Ejecutar cuando la página esté cargada */  
    // Corriente literaria
    // Caso: Autor / Alta
    $("#cliteraria").keyup(function(){ 
        var clave_tabla = document.getElementById('tabla_clit_cambio').getAttribute('data-clave'); 
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
    $("#cliterariaE").keyup(function(){  
        var clave_tabla = document.getElementById('tabla_clit_cambio').getAttribute('data-clave'); 
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
    // Editorial
    // Caso: Libro / Alta
    $("#editorial").keyup(function(){ 
        var clave_tabla = document.getElementById('tabla_edit_cambio').getAttribute('data-clave'); 
        //hacemos focus al campo de búsqueda
        $("#editorial").focus();                            
        //obtenemos el texto introducido en el campo de búsqueda
        clave_clave = $("#editorial").val();

        $.ajax({
            type: "POST",
            url: "basedatos/tabla_codigos_cargar.php",
            data: {param1: clave_tabla,
                   param2: clave_clave},
            dataType: "html"
            })
            .done(function(lista_select){
                if ($.trim(lista_select)) {
                    $("#lista_edit").empty();
                    $("#lista_edit").html(lista_select);                       
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
    
    // Caso: Libro / Edición
    $("#editorialE").keyup(function(){  
        var clave_tabla = document.getElementById('tabla_edit_cambio').getAttribute('data-clave'); 
        //hacemos focus al campo de búsqueda
        $("#editorialE").focus();                            
        //obtenemos el texto introducido en el campo de búsqueda
        clave_clave = $("#editorialE").val();
        $.ajax({
            type: "POST",
            url: "basedatos/tabla_codigos_cargar.php",
            data: {param1: clave_tabla,
                    param2: clave_clave},
            dataType: "html"
            })
            .done(function(lista_select){
                if ($.trim(lista_select)) {
                    $("#lista_editE").empty();
                    $("#lista_editE").html(lista_select);                 
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
    
    // Nacionalidad
    // Caso: Autor / Alta                                                                                          
    $("#nacionalidad").keyup(function(){ 
        var clave_tabla = document.getElementById('tabla_nacionalidad_cambio').getAttribute('data-clave');   
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
    $("#nacionalidadE").keyup(function(){ 
        var clave_tabla = document.getElementById('tabla_nacionalidad_cambio').getAttribute('data-clave');   
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

    // Países
    // Caso: Autor / Alta                                                                                             
    // País de nacimiento
    $("#pnac").keyup(function(){ 
        var clave_tabla = document.getElementById('tabla_paises_cambio').getAttribute('data-clave');  
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
    //País de fallecimiento
    $("#pfal").keyup(function(){  
        var clave_tabla = document.getElementById('tabla_paises_cambio').getAttribute('data-clave'); 
    
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
    //País de nacimiento
    $("#pnacE").keyup(function(){ 
        var clave_tabla = document.getElementById('tabla_paises_cambio').getAttribute('data-clave'); 
     
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
    //País de fallecimiento
    $("#pfalE").keyup(function(){
        var clave_tabla = document.getElementById('tabla_paises_cambio').getAttribute('data-clave');   
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