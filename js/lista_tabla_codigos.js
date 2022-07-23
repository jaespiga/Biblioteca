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

    // Caso: Autor / Filtro
    $("#cliterariaF").keyup(function(){  
        var clave_tabla = document.getElementById('tabla_clit_cambio').getAttribute('data-clave'); 
        //hacemos focus al campo de búsqueda
        $("#cliterariaF").focus();                            
        //obtenemos el texto introducido en el campo de búsqueda
        clave_clave = $("#cliterariaF").val();
        $.ajax({
            type: "POST",
            url: "basedatos/tabla_codigos_cargar.php",
            data: {param1: clave_tabla,
                    param2: clave_clave},
            dataType: "html"
            })
            .done(function(lista_select){
                if ($.trim(lista_select)) {
                    $("#lista_clitF").empty();
                    $("#lista_clitF").html(lista_select);                 
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
                    text: 'Hubo un error al cargar las editoriales',
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
                    text: 'Hubo un error al cargar las editoriales',
                    footer: '<a href="">Revise  datos de entrada y base de datos/tabla: biblioteca.db / tgr00_codigos</a>'
                })              
            })      
    }) 
    
    // Caso: Libro / Filtro
    $("#editorialF").keyup(function(){  
        var clave_tabla = document.getElementById('tabla_edit_cambio').getAttribute('data-clave'); 
        //hacemos focus al campo de búsqueda
        $("#editorialF").focus();                            
        //obtenemos el texto introducido en el campo de búsqueda
        clave_clave = $("#editorialF").val();
        $.ajax({
            type: "POST",
            url: "basedatos/tabla_codigos_cargar.php",
            data: {param1: clave_tabla,
                    param2: clave_clave},
            dataType: "html"
            })
            .done(function(lista_select){
                if ($.trim(lista_select)) {
                    $("#lista_editF").empty();
                    $("#lista_editF").html(lista_select);                 
                } 
            })
            .fail(function(){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Hubo un error al cargar las editoriales',
                    footer: '<a href="">Revise  datos de entrada y base de datos/tabla: biblioteca.db / tgr00_codigos</a>'
                })              
            })      
    }) 
    
    // Géneros literarios
    // Caso: Libro / Alta
    $("#genlit").keyup(function(){ 
        var clave_tabla = document.getElementById('tabla_genlit_cambio').getAttribute('data-clave'); 
        //hacemos focus al campo de búsqueda
        $("#genlit").focus();                            
        //obtenemos el texto introducido en el campo de búsqueda
        clave_clave = $("#genlit").val();

        $.ajax({
            type: "POST",
            url: "basedatos/tabla_codigos_cargar.php",
            data: {param1: clave_tabla,
                   param2: clave_clave},
            dataType: "html"
            })
            .done(function(lista_select){
                if ($.trim(lista_select)) {
                    $("#lista_genlit").empty();
                    $("#lista_genlit").html(lista_select);                       
                } 
            })
            .fail(function(){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Hubo un error al cargar los géneros literarios',
                    footer: '<a href="">Revise  datos de entrada y base de datos/tabla: biblioteca.db / tgr00_codigos</a>'
                })              
            })      
    })
    
    // Caso: Libro / Edición
    $("#genlitE").keyup(function(){  
        var clave_tabla = document.getElementById('tabla_genlit_cambio').getAttribute('data-clave'); 
        //hacemos focus al campo de búsqueda
        $("#genlitE").focus();                            
        //obtenemos el texto introducido en el campo de búsqueda
        clave_clave = $("#genlitE").val();
        $.ajax({
            type: "POST",
            url: "basedatos/tabla_codigos_cargar.php",
            data: {param1: clave_tabla,
                    param2: clave_clave},
            dataType: "html"
            })
            .done(function(lista_select){
                if ($.trim(lista_select)) {
                    $("#lista_genlitE").empty();
                    $("#lista_genlitE").html(lista_select);                 
                } 
            })
            .fail(function(){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Hubo un error al cargar los géneros literarios',
                    footer: '<a href="">Revise  datos de entrada y base de datos/tabla: biblioteca.db / tgr00_codigos</a>'
                })              
            })      
    }) 

    // Caso: Libro / Filtro
    $("#genlitF").keyup(function(){  
        var clave_tabla = document.getElementById('tabla_genlit_cambio').getAttribute('data-clave'); 
        //hacemos focus al campo de búsqueda
        $("#genlitF").focus();                            
        //obtenemos el texto introducido en el campo de búsqueda
        clave_clave = $("#genlitF").val();
        $.ajax({
            type: "POST",
            url: "basedatos/tabla_codigos_cargar.php",
            data: {param1: clave_tabla,
                    param2: clave_clave},
            dataType: "html"
            })
            .done(function(lista_select){
                if ($.trim(lista_select)) {
                    $("#lista_genlitF").empty();
                    $("#lista_genlitF").html(lista_select);                 
                } 
            })
            .fail(function(){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Hubo un error al cargar los géneros literarios',
                    footer: '<a href="">Revise  datos de entrada y base de datos/tabla: biblioteca.db / tgr00_codigos</a>'
                })              
            })      
    }) 

    // Idioma en que se escribió el libro
    // Caso: Libro / Alta
    $("#idioma").keyup(function(){ 
        var clave_tabla = document.getElementById('tabla_idioma_cambio').getAttribute('data-clave'); 
        //hacemos focus al campo de búsqueda
        $("#idioma").focus();                            
        //obtenemos el texto introducido en el campo de búsqueda
        clave_clave = $("#idioma").val();

        $.ajax({
            type: "POST",
            url: "basedatos/tabla_codigos_cargar.php",
            data: {param1: clave_tabla,
                   param2: clave_clave},
            dataType: "html"
            })
            .done(function(lista_select){
                if ($.trim(lista_select)) {
                    $("#lista_idioma").empty();
                    $("#lista_idioma").html(lista_select);                       
                } 
            })
            .fail(function(){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Hubo un error al cargar los idiomas',
                    footer: '<a href="">Revise  datos de entrada y base de datos/tabla: biblioteca.db / tgr00_codigos</a>'
                })              
            })      
    }) 
    
    // Caso: Libro / Edición
    $("#idiomaE").keyup(function(){  
        var clave_tabla = document.getElementById('tabla_idioma_cambio').getAttribute('data-clave'); 
        //hacemos focus al campo de búsqueda
        $("#idiomaE").focus();                            
        //obtenemos el texto introducido en el campo de búsqueda
        clave_clave = $("#idiomaE").val();
        $.ajax({
            type: "POST",
            url: "basedatos/tabla_codigos_cargar.php",
            data: {param1: clave_tabla,
                    param2: clave_clave},
            dataType: "html"
            })
            .done(function(lista_select){
                if ($.trim(lista_select)) {
                    $("#lista_idiomaE").empty();
                    $("#lista_idiomaE").html(lista_select);                 
                } 
            })
            .fail(function(){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Hubo un error al cargar los idiomas',
                    footer: '<a href="">Revise  datos de entrada y base de datos/tabla: biblioteca.db / tgr00_codigos</a>'
                })              
            })      
    }) 

    // Caso: Libro / Filtro
    $("#idiomaF").keyup(function(){  
        var clave_tabla = document.getElementById('tabla_idioma_cambio').getAttribute('data-clave'); 
        //hacemos focus al campo de búsqueda
        $("#idiomaF").focus();                            
        //obtenemos el texto introducido en el campo de búsqueda
        clave_clave = $("#idiomaF").val();
        $.ajax({
            type: "POST",
            url: "basedatos/tabla_codigos_cargar.php",
            data: {param1: clave_tabla,
                    param2: clave_clave},
            dataType: "html"
            })
            .done(function(lista_select){
                if ($.trim(lista_select)) {
                    $("#lista_idiomaF").empty();
                    $("#lista_idiomaF").html(lista_select);                 
                } 
            })
            .fail(function(){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Hubo un error al cargar los idiomas',
                    footer: '<a href="">Revise  datos de entrada y base de datos/tabla: biblioteca.db / tgr00_codigos</a>'
                })              
            })      
    }) 

    // Idioma en el que se lee el libro
    // Caso: Libro / Alta
    $("#idioma_lectura").keyup(function(){ 
        var clave_tabla = document.getElementById('tabla_idioma_lectura_cambio').getAttribute('data-clave'); 
        //hacemos focus al campo de búsqueda
        $("#idioma_lectura").focus();                            
        //obtenemos el texto introducido en el campo de búsqueda
        clave_clave = $("#idioma_lectura").val();

        $.ajax({
            type: "POST",
            url: "basedatos/tabla_codigos_cargar.php",
            data: {param1: clave_tabla,
                   param2: clave_clave},
            dataType: "html"
            })
            .done(function(lista_select){
                if ($.trim(lista_select)) {
                    $("#lista_idioma_lectura").empty();
                    $("#lista_idioma_lectura").html(lista_select);                       
                } 
            })
            .fail(function(){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Hubo un error al cargar los idiomas',
                    footer: '<a href="">Revise  datos de entrada y base de datos/tabla: biblioteca.db / tgr00_codigos</a>'
                })              
            })      
    })

    // Caso: Libro / Edición
    $("#idiomaE_lectura").keyup(function(){  
        var clave_tabla = document.getElementById('tabla_idioma_lectura_cambio').getAttribute('data-clave'); 
        //hacemos focus al campo de búsqueda
        $("#idiomaE_lectura").focus();                            
        //obtenemos el texto introducido en el campo de búsqueda
        clave_clave = $("#idiomaE_lectura").val();
        $.ajax({
            type: "POST",
            url: "basedatos/tabla_codigos_cargar.php",
            data: {param1: clave_tabla,
                    param2: clave_clave},
            dataType: "html"
            })
            .done(function(lista_select){
                if ($.trim(lista_select)) {
                    $("#lista_idiomaE_lectura").empty();
                    $("#lista_idiomaE_lectura").html(lista_select);                 
                } 
            })
            .fail(function(){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Hubo un error al cargar los idiomas',
                    footer: '<a href="">Revise  datos de entrada y base de datos/tabla: biblioteca.db / tgr00_codigos</a>'
                })              
            })      
    }) 

    // Caso: Libro / Filtro
    $("#idiomaF_lectura").keyup(function(){  
        var clave_tabla = document.getElementById('tabla_idioma_lectura_cambio').getAttribute('data-clave'); 
        //hacemos focus al campo de búsqueda
        $("#idiomaF_lectura").focus();                            
        //obtenemos el texto introducido en el campo de búsqueda
        clave_clave = $("#idiomaF_lectura").val();
        $.ajax({
            type: "POST",
            url: "basedatos/tabla_codigos_cargar.php",
            data: {param1: clave_tabla,
                    param2: clave_clave},
            dataType: "html"
            })
            .done(function(lista_select){
                if ($.trim(lista_select)) {
                    $("#lista_idiomaF_lectura").empty();
                    $("#lista_idiomaF_lectura").html(lista_select);                 
                } 
            })
            .fail(function(){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Hubo un error al cargar los idiomas',
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

    // Caso: Autor / Filtro                                                                                          
    $("#nacionalidadF").keyup(function(){ 
        var clave_tabla = document.getElementById('tabla_nacionalidad_cambio').getAttribute('data-clave');   
        //hacemos focus al campo de búsqueda
        $("#nacionalidadF").focus();                            
        //obtenemos el texto introducido en el campo de búsqueda
        clave_clave = $("#nacionalidadF").val();

        $.ajax({
            type: "POST",
            url: "basedatos/tabla_codigos_cargar.php",
            data: {param1: clave_tabla,
                   param2: clave_clave},
            dataType: "html"
            })
            .done(function(lista_select){
                if ($.trim(lista_select)) {
                        $("#lista_nacionalidadesF").empty();
                        $("#lista_nacionalidadesF").html(lista_select);
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

    // Caso: Autor / Filtro                                                                                             
    //País de nacimiento
    $("#pnacF").keyup(function(){ 
        var clave_tabla = document.getElementById('tabla_paises_cambio').getAttribute('data-clave'); 
     
        //hacemos focus al campo de búsqueda
        $("#pnacF").focus();                            
        //obtenemos el texto introducido en el campo de búsqueda
        clave_clave = $("#pnacF").val();

        $.ajax({
            type: "POST",
            url: "basedatos/tabla_codigos_cargar.php",
            data: {param1: clave_tabla,
                   param2: clave_clave},
            dataType: "html"
            })
            .done(function(lista_select){
                if ($.trim(lista_select)) {
                
                        $("#lista_paises1F").empty();
                        $("#lista_paises1F").html(lista_select);
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
    $("#pfalF").keyup(function(){
        var clave_tabla = document.getElementById('tabla_paises_cambio').getAttribute('data-clave');   
        //hacemos focus al campo de búsqueda
        $("#pfalF").focus();                            
        //obtenemos el texto introducido en el campo de búsqueda
        clave_clave = $("#pfalF").val();

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
                        $("#lista_paises2F").empty();
                        $("#lista_paises2F").html(lista_select);
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

    // Situación del libro
    // Caso: Libro / Alta
    $("#sitlib").keyup(function(){ 
        var clave_tabla = document.getElementById('tabla_sitlib_cambio').getAttribute('data-clave'); 
        //hacemos focus al campo de búsqueda
        $("#sitlib").focus();                            
        //obtenemos el texto introducido en el campo de búsqueda
        clave_clave = $("#sitlib").val();

        $.ajax({
            type: "POST",
            url: "basedatos/tabla_codigos_cargar.php",
            data: {param1: clave_tabla,
                   param2: clave_clave},
            dataType: "html"
            })
            .done(function(lista_select){
                if ($.trim(lista_select)) {
                    $("#lista_sitlib").empty();
                    $("#lista_sitlib").html(lista_select);                       
                } 
            })
            .fail(function(){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Hubo un error al cargar la situación del libro',
                    footer: '<a href="">Revise  datos de entrada y base de datos/tabla: biblioteca.db / tgr00_codigos</a>'
                })              
            })      
    })
    
    // Caso: Libro / Edición
    $("#sitlibE").keyup(function(){  
        var clave_tabla = document.getElementById('tabla_sitlib_cambio').getAttribute('data-clave'); 
        //hacemos focus al campo de búsqueda
        $("#sitlibE").focus();                            
        //obtenemos el texto introducido en el campo de búsqueda
        clave_clave = $("#sitlibE").val();
        $.ajax({
            type: "POST",
            url: "basedatos/tabla_codigos_cargar.php",
            data: {param1: clave_tabla,
                    param2: clave_clave},
            dataType: "html"
            })
            .done(function(lista_select){
                if ($.trim(lista_select)) {
                    $("#lista_sitlibE").empty();
                    $("#lista_sitlibE").html(lista_select);                 
                } 
            })
            .fail(function(){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Hubo un error al cargar la situación del libro',
                    footer: '<a href="">Revise  datos de entrada y base de datos/tabla: biblioteca.db / tgr00_codigos</a>'
                })              
            })      
    }) 
    
    // Caso: Libro / Filtro
    $("#sitlibF").keyup(function(){  
        var clave_tabla = document.getElementById('tabla_sitlib_cambio').getAttribute('data-clave'); 
        //hacemos focus al campo de búsqueda
        $("#sitlibF").focus();                            
        //obtenemos el texto introducido en el campo de búsqueda
        clave_clave = $("#sitlibF").val();
        $.ajax({
            type: "POST",
            url: "basedatos/tabla_codigos_cargar.php",
            data: {param1: clave_tabla,
                    param2: clave_clave},
            dataType: "html"
            })
            .done(function(lista_select){
                if ($.trim(lista_select)) {
                    $("#lista_sitlibF").empty();
                    $("#lista_sitlibF").html(lista_select);                 
                } 
            })
            .fail(function(){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Hubo un error al cargar la situación del libro',
                    footer: '<a href="">Revise  datos de entrada y base de datos/tabla: biblioteca.db / tgr00_codigos</a>'
                })              
            })      
    }) 

    // Soportes de publicación
    // Caso: Libro / Alta
    $("#soplib").keyup(function(){ 
        var clave_tabla = document.getElementById('tabla_soplib_cambio').getAttribute('data-clave'); 
        //hacemos focus al campo de búsqueda
        $("#soplib").focus();                            
        //obtenemos el texto introducido en el campo de búsqueda
        clave_clave = $("#soplib").val();

        $.ajax({
            type: "POST",
            url: "basedatos/tabla_codigos_cargar.php",
            data: {param1: clave_tabla,
                   param2: clave_clave},
            dataType: "html"
            })
            .done(function(lista_select){
                if ($.trim(lista_select)) {
                    $("#lista_soplib").empty();
                    $("#lista_soplib").html(lista_select);                       
                } 
            })
            .fail(function(){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Hubo un error al cargar los soportes de publicación del libro',
                    footer: '<a href="">Revise  datos de entrada y base de datos/tabla: biblioteca.db / tgr00_codigos</a>'
                })              
            })      
    })
    
    // Caso: Libro / Edición
    $("#soplibE").keyup(function(){  
        var clave_tabla = document.getElementById('tabla_soplib_cambio').getAttribute('data-clave'); 
        //hacemos focus al campo de búsqueda
        $("#soplibE").focus();                            
        //obtenemos el texto introducido en el campo de búsqueda
        clave_clave = $("#soplibE").val();
        $.ajax({
            type: "POST",
            url: "basedatos/tabla_codigos_cargar.php",
            data: {param1: clave_tabla,
                    param2: clave_clave},
            dataType: "html"
            })
            .done(function(lista_select){
                if ($.trim(lista_select)) {
                    $("#lista_soplibE").empty();
                    $("#lista_soplibE").html(lista_select);                 
                } 
            })
            .fail(function(){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Hubo un error al cargar los soportes de publicación del libro',
                    footer: '<a href="">Revise  datos de entrada y base de datos/tabla: biblioteca.db / tgr00_codigos</a>'
                })              
            })      
    }) 
   
    // Caso: Libro / Filtro
    $("#soplibF").keyup(function(){  
        var clave_tabla = document.getElementById('tabla_soplib_cambio').getAttribute('data-clave'); 
        //hacemos focus al campo de búsqueda
        $("#soplibF").focus();                            
        //obtenemos el texto introducido en el campo de búsqueda
        clave_clave = $("#soplibF").val();
        $.ajax({
            type: "POST",
            url: "basedatos/tabla_codigos_cargar.php",
            data: {param1: clave_tabla,
                    param2: clave_clave},
            dataType: "html"
            })
            .done(function(lista_select){
                if ($.trim(lista_select)) {
                    $("#lista_soplibF").empty();
                    $("#lista_soplibF").html(lista_select);                 
                } 
            })
            .fail(function(){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Hubo un error al cargar los soportes de publicación del libro',
                    footer: '<a href="">Revise  datos de entrada y base de datos/tabla: biblioteca.db / tgr00_codigos</a>'
                })              
            })      
    }) 

})