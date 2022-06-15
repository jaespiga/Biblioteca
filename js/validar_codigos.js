
/* Análisis de la existencia de códigos y posible alta de los mismos */
$(document).ready(function(){     /* Ejecutar cuando la página esté cargada */
    //Corriente literaria
    // Alta
        $("#cliteraria").change(function(){  
            funcion_codigo = 1  // Leer descripción de la tabla de códigos
            tabla = "CLiteraria";
            clave = document.getElementById('cliteraria').value
            titulo = "Corriente literaria"
                    
            $.ajax({
                type: "POST",
                url: "basedatos/tabla_codigos_ajax.php",
                data: {
                    param0: funcion_codigo,
                    param1: tabla,
                    param2: clave},
                })
                .done(function(respuesta){  
                    res=respuesta.split("#&");
                    nro_elementos= res.length
                    if (res[0] == 0) { // indicador de si el acceso a la base de datos ha sido correcto
                        if (res[1] == 1
                        && clave !== "") { // No existe el valor   
                            Swal.fire({
                                title: titulo + ' no existe. ¿Desea dar de alta?',
                                icon: 'question',
                                showCancelButton: true,
                                confirmButtonColor: '#3085d6',
                                cancelButtonColor: '#d33',
                                confirmButtonText: 'Sí',
                                cancelButtonText: 'No'
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    funcion_codigo = 3  // Dar de alta nueva fila en la tabla de códigos
                                    $.ajax({
                                        type: "POST",
                                        url: "basedatos/tabla_codigos_ajax.php",
                                        data: {
                                            param0: funcion_codigo,
                                            param1: tabla,
                                            param2: clave},
                                        })
                                        .done(function(respuesta){  
                                            res=respuesta.split("#&");
                                            nro_elementos= res.length
                                            if (res[0] == 0) { // indicador de si el acceso a la base de datos ha sido correcto
                                                Swal.fire({
                                                    icon: 'success',
                                                    title: 'Alta realizada',
                                                    text: 'Nueva fila en ' + tabla + " con código " + res[3],                                                
                                                }) 
                                                
                                                $.ajax({
                                                    type: "POST",
                                                    url: "basedatos/tabla_codigos_cargar.php",
                                                    data: {param1: tabla,
                                                        param2: clave},
                                                    dataType: "html"
                                                    })
                                                    .done(function(lista_select){
                                                        $("#lista_clit").empty();
                                                        $("#lista_clit").html(lista_select);
                                                        
                                                    })
                                                    .fail(function(){
                                                        Swal.fire({
                                                            icon: 'error',
                                                            title: 'Oops...',
                                                            text: 'Hubo un error al cargar las corrientes literarias',
                                                            footer: '<a href="">Revise  datos de entrada y base de datos/tabla: biblioteca.db / tgr00_codigos</a>'
                                                        })              
                                                    })    
                            
                                            } else {
                                                    Swal.fire({
                                                        icon: 'error',
                                                        title: 'ERROR. Alta no realizada',
                                                        text: res[2],
                                                        footer: '<a href="">Revise datos de entrada y base de datos</a>'
                                                    }) 
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
                                } else {
                                    $("#cliteraria").val("");
                                    } 
                            })
                        }
                    } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops... ERROR',
                                text: 'Hubo un error en la tabla de códigos (' + tabla + ")." + res[2],
                                footer: '<a href="">Revise  datos de entrada y base de datos/tabla: biblioteca.db / tgr00_codigos</a>'
                            })      
                        }    
                })
                .fail(function(){
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops... ERROR',
                        text: 'Hubo un error en la tabla de códigos (' + tabla + ")." + res[2],
                        footer: '<a href="">Revise  datos de entrada y base de datos/tabla: biblioteca.db / tgr00_codigos</a>'
                    })              
                })      
    }) 
    // Edición 
    $("#cliterariaE").change(function(){  
        funcion_codigo = 1  // Leer descripción de la tabla de códigos
        tabla = "CLiteraria";
        clave = document.getElementById('cliterariaE').value
        titulo = "Corriente literaria"
                
        $.ajax({
            type: "POST",
            url: "basedatos/tabla_codigos_ajax.php",
            data: {
                param0: funcion_codigo,
                param1: tabla,
                param2: clave},
            })
            .done(function(respuesta){  
                res=respuesta.split("#&");
                nro_elementos= res.length
                if (res[0] == 0) { // indicador de si el acceso a la base de datos ha sido correcto
                    if (res[1] == 1
                    && clave !== "") { // No existe el valor   
                        Swal.fire({
                            title: titulo + ' no existe. ¿Desea dar de alta?',
                            icon: 'question',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Sí',
                            cancelButtonText: 'No'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                funcion_codigo = 3  // Dar de alta nueva fila en la tabla de códigos
                                $.ajax({
                                    type: "POST",
                                    url: "basedatos/tabla_codigos_ajax.php",
                                    data: {
                                        param0: funcion_codigo,
                                        param1: tabla,
                                        param2: clave},
                                    })
                                    .done(function(respuesta){  
                                        res=respuesta.split("#&");
                                        nro_elementos= res.length
                                        if (res[0] == 0) { // indicador de si el acceso a la base de datos ha sido correcto
                                            Swal.fire({
                                                icon: 'success',
                                                title: 'Alta realizada',
                                                text: 'Nueva fila en ' + tabla + " con código " + res[3],                                                
                                            }) 
                                            
                                            $.ajax({
                                                type: "POST",
                                                url: "basedatos/tabla_codigos_cargar.php",
                                                data: {param1: tabla,
                                                    param2: clave},
                                                dataType: "html"
                                                })
                                                .done(function(lista_select){
                                                    $("#lista_clitE").empty();
                                                    $("#lista_clitE").html(lista_select);
                                                    
                                                })
                                                .fail(function(){
                                                    Swal.fire({
                                                        icon: 'error',
                                                        title: 'Oops...',
                                                        text: 'Hubo un error al cargar las corrientes literarias',
                                                        footer: '<a href="">Revise  datos de entrada y base de datos/tabla: biblioteca.db / tgr00_codigos</a>'
                                                    })              
                                                })    
                        
                                        } else {
                                                Swal.fire({
                                                    icon: 'error',
                                                    title: 'ERROR. Alta no realizada',
                                                    text: res[2],
                                                    footer: '<a href="">Revise datos de entrada y base de datos</a>'
                                                }) 
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
                            } else {
                                $("#cliterariaE").val("");
                                } 
                        })
                    }
                } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops... ERROR',
                            text: 'Hubo un error en la tabla de códigos (' + tabla + ")." + res[2],
                            footer: '<a href="">Revise  datos de entrada y base de datos/tabla: biblioteca.db / tgr00_codigos</a>'
                        })      
                    }    
            })
            .fail(function(){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops... ERROR',
                    text: 'Hubo un error en la tabla de códigos (' + tabla + ")." + res[2],
                    footer: '<a href="">Revise  datos de entrada y base de datos/tabla: biblioteca.db / tgr00_codigos</a>'
                })              
            })      
    })  

    //Editorial
    //Alta
    $("#editorial").change(function(){  
        funcion_codigo = 1  // Leer descripción de la tabla de códigos
        tabla = "Editorial";
        clave = document.getElementById('editorial').value
        titulo = "Editorial"
                
        $.ajax({
            type: "POST",
            url: "basedatos/tabla_codigos_ajax.php",
            data: {
                param0: funcion_codigo,
                param1: tabla,
                param2: clave},
            })
            .done(function(respuesta){  
                res=respuesta.split("#&");
                nro_elementos= res.length
                if (res[0] == 0) { // indicador de si el acceso a la base de datos ha sido correcto
                    if (res[1] == 1
                    && clave !== "") { // No existe el valor   
                        Swal.fire({
                            title: titulo + ' no existe. ¿Desea dar de alta?',
                            icon: 'question',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Sí',
                            cancelButtonText: 'No'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                funcion_codigo = 3  // Dar de alta nueva fila en la tabla de códigos
                                $.ajax({
                                    type: "POST",
                                    url: "basedatos/tabla_codigos_ajax.php",
                                    data: {
                                        param0: funcion_codigo,
                                        param1: tabla,
                                        param2: clave},
                                    })
                                    .done(function(respuesta){  
                                        res=respuesta.split("#&");
                                        nro_elementos= res.length
                                        if (res[0] == 0) { // indicador de si el acceso a la base de datos ha sido correcto
                                            Swal.fire({
                                                icon: 'success',
                                                title: 'Alta realizada',
                                                text: 'Nueva fila en ' + tabla + " con código " + res[3],                                                
                                            }) 
                                            
                                            $.ajax({
                                                type: "POST",
                                                url: "basedatos/tabla_codigos_cargar.php",
                                                data: {param1: tabla,
                                                    param2: clave},
                                                dataType: "html"
                                                })
                                                .done(function(lista_select){
                                                    $("#lista_edit").empty();
                                                    $("#lista_edit").html(lista_select); 
                                                })
                                                .fail(function(){
                                                    Swal.fire({
                                                        icon: 'error',
                                                        title: 'Oops...',
                                                        text: 'Hubo un error al cargar las editoriales',
                                                        footer: '<a href="">Revise  datos de entrada y base de datos/tabla: biblioteca.db / tgr00_codigos</a>'
                                                    })              
                                                })    
                                                
                                        } else {
                                                Swal.fire({
                                                    icon: 'error',
                                                    title: 'ERROR. Alta no realizada',
                                                    text: res[2],
                                                    footer: '<a href="">Revise datos de entrada y base de datos</a>'
                                                }) 
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
                            } else {
                                $("#editorial").val("");
                                } 
                        })
                    }
                } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops... ERROR',
                            text: 'Hubo un error en la tabla de códigos (' + tabla + ")." + res[2],
                            footer: '<a href="">Revise  datos de entrada y base de datos/tabla: biblioteca.db / tgr00_codigos</a>'
                        })      
                    }    
            })
            .fail(function(){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops... ERROR',
                    text: 'Hubo un error en la tabla de códigos (' + tabla + ")." + res[2],
                    footer: '<a href="">Revise  datos de entrada y base de datos/tabla: biblioteca.db / tgr00_codigos</a>'
                })              
            }) 
    })
    // Edición    
    $("#editorialE").change(function(){  
        funcion_codigo = 1  // Leer descripción de la tabla de códigos
        tabla = "Editorial";
        clave = document.getElementById('editorialE').value
        titulo = "Editorial"
                
        $.ajax({
            type: "POST",
            url: "basedatos/tabla_codigos_ajax.php",
            data: {
                param0: funcion_codigo,
                param1: tabla,
                param2: clave},
            })
            .done(function(respuesta){  
                res=respuesta.split("#&");
                nro_elementos= res.length
                if (res[0] == 0) { // indicador de si el acceso a la base de datos ha sido correcto
                    if (res[1] == 1
                    && clave !== "") { // No existe el valor   
                        Swal.fire({
                            title: titulo + ' no existe. ¿Desea dar de alta?',
                            icon: 'question',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Sí',
                            cancelButtonText: 'No'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                funcion_codigo = 3  // Dar de alta nueva fila en la tabla de códigos
                                $.ajax({
                                    type: "POST",
                                    url: "basedatos/tabla_codigos_ajax.php",
                                    data: {
                                        param0: funcion_codigo,
                                        param1: tabla,
                                        param2: clave},
                                    })
                                    .done(function(respuesta){  
                                        res=respuesta.split("#&");
                                        nro_elementos= res.length
                                        if (res[0] == 0) { // indicador de si el acceso a la base de datos ha sido correcto
                                            Swal.fire({
                                                icon: 'success',
                                                title: 'Alta realizada',
                                                text: 'Nueva fila en ' + tabla + " con código " + res[3],                                                
                                            }) 
                                            
                                            $.ajax({
                                                type: "POST",
                                                url: "basedatos/tabla_codigos_cargar.php",
                                                data: {param1: tabla,
                                                    param2: clave},
                                                dataType: "html"
                                                })
                                                .done(function(lista_select){
                                                    $("#lista_editE").empty();
                                                    $("#lista_editE").html(lista_select); 
                                                })
                                                .fail(function(){
                                                    Swal.fire({
                                                        icon: 'error',
                                                        title: 'Oops...',
                                                        text: 'Hubo un error al cargar las editoriales',
                                                        footer: '<a href="">Revise  datos de entrada y base de datos/tabla: biblioteca.db / tgr00_codigos</a>'
                                                    })              
                                                })    
                                                
                                        } else {
                                                Swal.fire({
                                                    icon: 'error',
                                                    title: 'ERROR. Alta no realizada',
                                                    text: res[2],
                                                    footer: '<a href="">Revise datos de entrada y base de datos</a>'
                                                }) 
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
                            } else {
                                $("#editorialE").val("");
                                } 
                        })
                    }
                } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops... ERROR',
                            text: 'Hubo un error en la tabla de códigos (' + tabla + ")." + res[2],
                            footer: '<a href="">Revise  datos de entrada y base de datos/tabla: biblioteca.db / tgr00_codigos</a>'
                        })      
                    }    
            })
            .fail(function(){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops... ERROR',
                    text: 'Hubo un error en la tabla de códigos (' + tabla + ")." + res[2],
                    footer: '<a href="">Revise  datos de entrada y base de datos/tabla: biblioteca.db / tgr00_codigos</a>'
                })              
            })      
    }) 
    
//Estatus de situación del libro
    //Alta
    $("#sitlib").change(function(){  
        funcion_codigo = 1  // Leer descripción de la tabla de códigos
        tabla = "SitLib";
        clave = document.getElementById('sitlib').value
        titulo = "Estatus de situación del libro"
                
        $.ajax({
            type: "POST",
            url: "basedatos/tabla_codigos_ajax.php",
            data: {
                param0: funcion_codigo,
                param1: tabla,
                param2: clave},
            })
            .done(function(respuesta){  
                res=respuesta.split("#&");
                nro_elementos= res.length
                if (res[0] == 0) { // indicador de si el acceso a la base de datos ha sido correcto
                    if (res[1] == 1
                    && clave !== "") { // No existe el valor   
                        Swal.fire({
                            title: titulo + ' no existe. ¿Desea dar de alta?',
                            icon: 'question',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Sí',
                            cancelButtonText: 'No'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                funcion_codigo = 3  // Dar de alta nueva fila en la tabla de códigos
                                $.ajax({
                                    type: "POST",
                                    url: "basedatos/tabla_codigos_ajax.php",
                                    data: {
                                        param0: funcion_codigo,
                                        param1: tabla,
                                        param2: clave},
                                    })
                                    .done(function(respuesta){  
                                        res=respuesta.split("#&");
                                        nro_elementos= res.length
                                        if (res[0] == 0) { // indicador de si el acceso a la base de datos ha sido correcto
                                            Swal.fire({
                                                icon: 'success',
                                                title: 'Alta realizada',
                                                text: 'Nueva fila en ' + tabla + " con código " + res[3],                                                
                                            }) 
                                            
                                            $.ajax({
                                                type: "POST",
                                                url: "basedatos/tabla_codigos_cargar.php",
                                                data: {param1: tabla,
                                                    param2: clave},
                                                dataType: "html"
                                                })
                                                .done(function(lista_select){
                                                    $("#lista_sitlib").empty();
                                                    $("#lista_sitlib").html(lista_select); 
                                                })
                                                .fail(function(){
                                                    Swal.fire({
                                                        icon: 'error',
                                                        title: 'Oops...',
                                                        text: 'Hubo un error al cargar los estatus de situación de los libros',
                                                        footer: '<a href="">Revise  datos de entrada y base de datos/tabla: biblioteca.db / tgr00_codigos</a>'
                                                    })              
                                                })    
                                                
                                        } else {
                                                Swal.fire({
                                                    icon: 'error',
                                                    title: 'ERROR. Alta no realizada',
                                                    text: res[2],
                                                    footer: '<a href="">Revise datos de entrada y base de datos</a>'
                                                }) 
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
                            } else {
                                $("#sitlib").val("");
                                } 
                        })
                    }
                } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops... ERROR',
                            text: 'Hubo un error en la tabla de códigos (' + tabla + ")." + res[2],
                            footer: '<a href="">Revise  datos de entrada y base de datos/tabla: biblioteca.db / tgr00_codigos</a>'
                        })      
                    }    
            })
            .fail(function(){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops... ERROR',
                    text: 'Hubo un error en la tabla de códigos (' + tabla + ")." + res[2],
                    footer: '<a href="">Revise  datos de entrada y base de datos/tabla: biblioteca.db / tgr00_codigos</a>'
                })              
            }) 
    })
    // Edición    
    $("#sitlibE").change(function(){  
        funcion_codigo = 1  // Leer descripción de la tabla de códigos
        tabla = "SitLib";
        clave = document.getElementById('sitlibE').value
        titulo = "Estatus de situación del libro"
                
        $.ajax({
            type: "POST",
            url: "basedatos/tabla_codigos_ajax.php",
            data: {
                param0: funcion_codigo,
                param1: tabla,
                param2: clave},
            })
            .done(function(respuesta){  
                res=respuesta.split("#&");
                nro_elementos= res.length
                if (res[0] == 0) { // indicador de si el acceso a la base de datos ha sido correcto
                    if (res[1] == 1
                    && clave !== "") { // No existe el valor   
                        Swal.fire({
                            title: titulo + ' no existe. ¿Desea dar de alta?',
                            icon: 'question',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Sí',
                            cancelButtonText: 'No'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                funcion_codigo = 3  // Dar de alta nueva fila en la tabla de códigos
                                $.ajax({
                                    type: "POST",
                                    url: "basedatos/tabla_codigos_ajax.php",
                                    data: {
                                        param0: funcion_codigo,
                                        param1: tabla,
                                        param2: clave},
                                    })
                                    .done(function(respuesta){  
                                        res=respuesta.split("#&");
                                        nro_elementos= res.length
                                        if (res[0] == 0) { // indicador de si el acceso a la base de datos ha sido correcto
                                            Swal.fire({
                                                icon: 'success',
                                                title: 'Alta realizada',
                                                text: 'Nueva fila en ' + tabla + " con código " + res[3],                                                
                                            }) 
                                            
                                            $.ajax({
                                                type: "POST",
                                                url: "basedatos/tabla_codigos_cargar.php",
                                                data: {param1: tabla,
                                                    param2: clave},
                                                dataType: "html"
                                                })
                                                .done(function(lista_select){
                                                    $("#lista_sitlibE").empty();
                                                    $("#lista_sitlibE").html(lista_select); 
                                                })
                                                .fail(function(){
                                                    Swal.fire({
                                                        icon: 'error',
                                                        title: 'Oops...',
                                                        text: 'Hubo un error al cargar los estatus de situación de los libros',
                                                        footer: '<a href="">Revise  datos de entrada y base de datos/tabla: biblioteca.db / tgr00_codigos</a>'
                                                    })              
                                                })    
                                                
                                        } else {
                                                Swal.fire({
                                                    icon: 'error',
                                                    title: 'ERROR. Alta no realizada',
                                                    text: res[2],
                                                    footer: '<a href="">Revise datos de entrada y base de datos</a>'
                                                }) 
                                            } 
                                    })
                                    .fail(function(){
                                        Swal.fire({
                                            icon: 'error',
                                            title: 'Oops...',
                                            text: 'Hubo un error al cargar los estatus de situación de los libros',
                                            footer: '<a href="">Revise  datos de entrada y base de datos/tabla: biblioteca.db / tgr00_codigos</a>'
                                        })              
                                    })      
                            } else {
                                $("#sitlibE").val("");
                                } 
                        })
                    }
                } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops... ERROR',
                            text: 'Hubo un error en la tabla de códigos (' + tabla + ")." + res[2],
                            footer: '<a href="">Revise  datos de entrada y base de datos/tabla: biblioteca.db / tgr00_codigos</a>'
                        })      
                    }    
            })
            .fail(function(){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops... ERROR',
                    text: 'Hubo un error en la tabla de códigos (' + tabla + ")." + res[2],
                    footer: '<a href="">Revise  datos de entrada y base de datos/tabla: biblioteca.db / tgr00_codigos</a>'
                })              
            })      
    })        
   
    //Género literario
    //Alta
    $("#genlit").change(function(){  
        funcion_codigo = 1  // Leer descripción de la tabla de códigos
        tabla = "GenLit";
        clave = document.getElementById('genlit').value
        titulo = "Género literario"
                
        $.ajax({
            type: "POST",
            url: "basedatos/tabla_codigos_ajax.php",
            data: {
                param0: funcion_codigo,
                param1: tabla,
                param2: clave},
            })
            .done(function(respuesta){  
                res=respuesta.split("#&");
                nro_elementos= res.length
                if (res[0] == 0) { // indicador de si el acceso a la base de datos ha sido correcto
                    if (res[1] == 1
                    && clave !== "") { // No existe el valor   
                        Swal.fire({
                            title: titulo + ' no existe. ¿Desea dar de alta?',
                            icon: 'question',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Sí',
                            cancelButtonText: 'No'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                funcion_codigo = 3  // Dar de alta nueva fila en la tabla de códigos
                                $.ajax({
                                    type: "POST",
                                    url: "basedatos/tabla_codigos_ajax.php",
                                    data: {
                                        param0: funcion_codigo,
                                        param1: tabla,
                                        param2: clave},
                                    })
                                    .done(function(respuesta){  
                                        res=respuesta.split("#&");
                                        nro_elementos= res.length
                                        if (res[0] == 0) { // indicador de si el acceso a la base de datos ha sido correcto
                                            Swal.fire({
                                                icon: 'success',
                                                title: 'Alta realizada',
                                                text: 'Nueva fila en ' + tabla + " con código " + res[3],                                                
                                            }) 
                                            
                                            $.ajax({
                                                type: "POST",
                                                url: "basedatos/tabla_codigos_cargar.php",
                                                data: {param1: tabla,
                                                    param2: clave},
                                                dataType: "html"
                                                })
                                                .done(function(lista_select){
                                                    $("#lista_genlit").empty();
                                                    $("#lista_genlit").html(lista_select); 
                                                })
                                                .fail(function(){
                                                    Swal.fire({
                                                        icon: 'error',
                                                        title: 'Oops...',
                                                        text: 'Hubo un error al cargar los géneros literarios',
                                                        footer: '<a href="">Revise  datos de entrada y base de datos/tabla: biblioteca.db / tgr00_codigos</a>'
                                                    })              
                                                })    
                                                
                                        } else {
                                                Swal.fire({
                                                    icon: 'error',
                                                    title: 'ERROR. Alta no realizada',
                                                    text: res[2],
                                                    footer: '<a href="">Revise datos de entrada y base de datos</a>'
                                                }) 
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
                            } else {
                                $("#genlit").val("");
                                } 
                        })
                    }
                } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops... ERROR',
                            text: 'Hubo un error en la tabla de códigos (' + tabla + ")." + res[2],
                            footer: '<a href="">Revise  datos de entrada y base de datos/tabla: biblioteca.db / tgr00_codigos</a>'
                        })      
                    }    
            })
            .fail(function(){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops... ERROR',
                    text: 'Hubo un error en la tabla de códigos (' + tabla + ")." + res[2],
                    footer: '<a href="">Revise  datos de entrada y base de datos/tabla: biblioteca.db / tgr00_codigos</a>'
                })              
            }) 
    })
    // Edición    
    $("#genlitE").change(function(){  
        funcion_codigo = 1  // Leer descripción de la tabla de códigos
        tabla = "GenLit";
        clave = document.getElementById('genlitE').value
        titulo = "Género literario"
                
        $.ajax({
            type: "POST",
            url: "basedatos/tabla_codigos_ajax.php",
            data: {
                param0: funcion_codigo,
                param1: tabla,
                param2: clave},
            })
            .done(function(respuesta){  
                res=respuesta.split("#&");
                nro_elementos= res.length
                if (res[0] == 0) { // indicador de si el acceso a la base de datos ha sido correcto
                    if (res[1] == 1
                    && clave !== "") { // No existe el valor   
                        Swal.fire({
                            title: titulo + ' no existe. ¿Desea dar de alta?',
                            icon: 'question',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Sí',
                            cancelButtonText: 'No'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                funcion_codigo = 3  // Dar de alta nueva fila en la tabla de códigos
                                $.ajax({
                                    type: "POST",
                                    url: "basedatos/tabla_codigos_ajax.php",
                                    data: {
                                        param0: funcion_codigo,
                                        param1: tabla,
                                        param2: clave},
                                    })
                                    .done(function(respuesta){  
                                        res=respuesta.split("#&");
                                        nro_elementos= res.length
                                        if (res[0] == 0) { // indicador de si el acceso a la base de datos ha sido correcto
                                            Swal.fire({
                                                icon: 'success',
                                                title: 'Alta realizada',
                                                text: 'Nueva fila en ' + tabla + " con código " + res[3],                                                
                                            }) 
                                            
                                            $.ajax({
                                                type: "POST",
                                                url: "basedatos/tabla_codigos_cargar.php",
                                                data: {param1: tabla,
                                                    param2: clave},
                                                dataType: "html"
                                                })
                                                .done(function(lista_select){
                                                    $("#lista_genlitE").empty();
                                                    $("#lista_genlitE").html(lista_select); 
                                                })
                                                .fail(function(){
                                                    Swal.fire({
                                                        icon: 'error',
                                                        title: 'Oops...',
                                                        text: 'Hubo un error al cargar los géneros literarios',
                                                        footer: '<a href="">Revise  datos de entrada y base de datos/tabla: biblioteca.db / tgr00_codigos</a>'
                                                    })              
                                                })    
                                                
                                        } else {
                                                Swal.fire({
                                                    icon: 'error',
                                                    title: 'ERROR. Alta no realizada',
                                                    text: res[2],
                                                    footer: '<a href="">Revise datos de entrada y base de datos</a>'
                                                }) 
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
                            } else {
                                $("#genlitE").val("");
                                } 
                        })
                    }
                } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops... ERROR',
                            text: 'Hubo un error en la tabla de códigos (' + tabla + ")." + res[2],
                            footer: '<a href="">Revise  datos de entrada y base de datos/tabla: biblioteca.db / tgr00_codigos</a>'
                        })      
                    }    
            })
            .fail(function(){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops... ERROR',
                    text: 'Hubo un error en la tabla de códigos (' + tabla + ")." + res[2],
                    footer: '<a href="">Revise  datos de entrada y base de datos/tabla: biblioteca.db / tgr00_codigos</a>'
                })              
            })      
    })        

//Idioma
    //Alta
    $("#idioma").change(function(){  
        funcion_codigo = 1  // Leer descripción de la tabla de códigos
        tabla = "Idioma";
        clave = document.getElementById('idioma').value
        titulo = "Idioma"
                
        $.ajax({
            type: "POST",
            url: "basedatos/tabla_codigos_ajax.php",
            data: {
                param0: funcion_codigo,
                param1: tabla,
                param2: clave},
            })
            .done(function(respuesta){  
                res=respuesta.split("#&");
                nro_elementos= res.length
                if (res[0] == 0) { // indicador de si el acceso a la base de datos ha sido correcto
                    if (res[1] == 1
                    && clave !== "") { // No existe el valor   
                        Swal.fire({
                            title: titulo + ' no existe. ¿Desea dar de alta?',
                            icon: 'question',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Sí',
                            cancelButtonText: 'No'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                funcion_codigo = 3  // Dar de alta nueva fila en la tabla de códigos
                                $.ajax({
                                    type: "POST",
                                    url: "basedatos/tabla_codigos_ajax.php",
                                    data: {
                                        param0: funcion_codigo,
                                        param1: tabla,
                                        param2: clave},
                                    })
                                    .done(function(respuesta){  
                                        res=respuesta.split("#&");
                                        nro_elementos= res.length
                                        if (res[0] == 0) { // indicador de si el acceso a la base de datos ha sido correcto
                                            Swal.fire({
                                                icon: 'success',
                                                title: 'Alta realizada',
                                                text: 'Nueva fila en ' + tabla + " con código " + res[3],                                                
                                            }) 
                                            
                                            $.ajax({
                                                type: "POST",
                                                url: "basedatos/tabla_codigos_cargar.php",
                                                data: {param1: tabla,
                                                    param2: clave},
                                                dataType: "html"
                                                })
                                                .done(function(lista_select){
                                                    $("#lista_idioma").empty();
                                                    $("#lista_idioma").html(lista_select); 
                                                })
                                                .fail(function(){
                                                    Swal.fire({
                                                        icon: 'error',
                                                        title: 'Oops...',
                                                        text: 'Hubo un error al cargar los idiomas',
                                                        footer: '<a href="">Revise  datos de entrada y base de datos/tabla: biblioteca.db / tgr00_codigos</a>'
                                                    })              
                                                })    
                                                
                                        } else {
                                                Swal.fire({
                                                    icon: 'error',
                                                    title: 'ERROR. Alta no realizada',
                                                    text: res[2],
                                                    footer: '<a href="">Revise datos de entrada y base de datos</a>'
                                                }) 
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
                            } else {
                                $("#idioma").val("");
                                } 
                        })
                    }
                } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops... ERROR',
                            text: 'Hubo un error en la tabla de códigos (' + tabla + ")." + res[2],
                            footer: '<a href="">Revise  datos de entrada y base de datos/tabla: biblioteca.db / tgr00_codigos</a>'
                        })      
                    }    
            })
            .fail(function(){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops... ERROR',
                    text: 'Hubo un error en la tabla de códigos (' + tabla + ")." + res[2],
                    footer: '<a href="">Revise  datos de entrada y base de datos/tabla: biblioteca.db / tgr00_codigos</a>'
                })              
            }) 
    })
    // Edición    
    $("#idiomaE").change(function(){  
        funcion_codigo = 1  // Leer descripción de la tabla de códigos
        tabla = "Idioma";
        clave = document.getElementById('idiomaE').value
        titulo = "Idioma"
                
        $.ajax({
            type: "POST",
            url: "basedatos/tabla_codigos_ajax.php",
            data: {
                param0: funcion_codigo,
                param1: tabla,
                param2: clave},
            })
            .done(function(respuesta){  
                res=respuesta.split("#&");
                nro_elementos= res.length
                if (res[0] == 0) { // indicador de si el acceso a la base de datos ha sido correcto
                    if (res[1] == 1
                    && clave !== "") { // No existe el valor   
                        Swal.fire({
                            title: titulo + ' no existe. ¿Desea dar de alta?',
                            icon: 'question',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Sí',
                            cancelButtonText: 'No'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                funcion_codigo = 3  // Dar de alta nueva fila en la tabla de códigos
                                $.ajax({
                                    type: "POST",
                                    url: "basedatos/tabla_codigos_ajax.php",
                                    data: {
                                        param0: funcion_codigo,
                                        param1: tabla,
                                        param2: clave},
                                    })
                                    .done(function(respuesta){  
                                        res=respuesta.split("#&");
                                        nro_elementos= res.length
                                        if (res[0] == 0) { // indicador de si el acceso a la base de datos ha sido correcto
                                            Swal.fire({
                                                icon: 'success',
                                                title: 'Alta realizada',
                                                text: 'Nueva fila en ' + tabla + " con código " + res[3],                                                
                                            }) 
                                            
                                            $.ajax({
                                                type: "POST",
                                                url: "basedatos/tabla_codigos_cargar.php",
                                                data: {param1: tabla,
                                                    param2: clave},
                                                dataType: "html"
                                                })
                                                .done(function(lista_select){
                                                    $("#lista_idiomaE").empty();
                                                    $("#lista_idiomaE").html(lista_select); 
                                                })
                                                .fail(function(){
                                                    Swal.fire({
                                                        icon: 'error',
                                                        title: 'Oops...',
                                                        text: 'Hubo un error al cargar los idiomas',
                                                        footer: '<a href="">Revise  datos de entrada y base de datos/tabla: biblioteca.db / tgr00_codigos</a>'
                                                    })              
                                                })    
                                                
                                        } else {
                                                Swal.fire({
                                                    icon: 'error',
                                                    title: 'ERROR. Alta no realizada',
                                                    text: res[2],
                                                    footer: '<a href="">Revise datos de entrada y base de datos</a>'
                                                }) 
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
                            } else {
                                $("#idiomaE").val("");
                                } 
                        })
                    }
                } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops... ERROR',
                            text: 'Hubo un error en la tabla de códigos (' + tabla + ")." + res[2],
                            footer: '<a href="">Revise  datos de entrada y base de datos/tabla: biblioteca.db / tgr00_codigos</a>'
                        })      
                    }    
            })
            .fail(function(){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops... ERROR',
                    text: 'Hubo un error en la tabla de códigos (' + tabla + ")." + res[2],
                    footer: '<a href="">Revise  datos de entrada y base de datos/tabla: biblioteca.db / tgr00_codigos</a>'
                })              
            })      
    })        

    //Nacionalidad
    //Alta
    $("#nacionalidad").change(function(){  
        funcion_codigo = 1  // Leer descripción de la tabla de códigos
        tabla = "Nacionalidad";
        clave = document.getElementById('nacionalidad').value
        titulo = "Nacionalidad"
                
        $.ajax({
            type: "POST",
            url: "basedatos/tabla_codigos_ajax.php",
            data: {
                param0: funcion_codigo,
                param1: tabla,
                param2: clave},
            })
            .done(function(respuesta){  
                res=respuesta.split("#&");
                nro_elementos= res.length
                if (res[0] == 0) { // indicador de si el acceso a la base de datos ha sido correcto
                    if (res[1] == 1
                    && clave !== "") { // No existe el valor   
                        Swal.fire({
                            title: titulo + ' no existe. ¿Desea dar de alta?',
                            icon: 'question',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Sí',
                            cancelButtonText: 'No'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                funcion_codigo = 3  // Dar de alta nueva fila en la tabla de códigos
                                $.ajax({
                                    type: "POST",
                                    url: "basedatos/tabla_codigos_ajax.php",
                                    data: {
                                        param0: funcion_codigo,
                                        param1: tabla,
                                        param2: clave},
                                    })
                                    .done(function(respuesta){  
                                        res=respuesta.split("#&");
                                        nro_elementos= res.length
                                        if (res[0] == 0) { // indicador de si el acceso a la base de datos ha sido correcto
                                            Swal.fire({
                                                icon: 'success',
                                                title: 'Alta realizada',
                                                text: 'Nueva fila en ' + tabla + " con código " + res[3],                                                
                                            }) 
                                            
                                            $.ajax({
                                                type: "POST",
                                                url: "basedatos/tabla_codigos_cargar.php",
                                                data: {param1: tabla,
                                                    param2: clave},
                                                dataType: "html"
                                                })
                                                .done(function(lista_select){
                                                    $("#lista_nacionalidades").empty();
                                                    $("#lista_nacionalidades").html(lista_select); 
                                                })
                                                .fail(function(){
                                                    Swal.fire({
                                                        icon: 'error',
                                                        title: 'Oops...',
                                                        text: 'Hubo un error al cargar las nacionalidades',
                                                        footer: '<a href="">Revise  datos de entrada y base de datos/tabla: biblioteca.db / tgr00_codigos</a>'
                                                    })              
                                                })    
                                                
                                        } else {
                                                Swal.fire({
                                                    icon: 'error',
                                                    title: 'ERROR. Alta no realizada',
                                                    text: res[2],
                                                    footer: '<a href="">Revise datos de entrada y base de datos</a>'
                                                }) 
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
                            } else {
                                $("#nacionalidad").val("");
                                } 
                        })
                    }
                } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops... ERROR',
                            text: 'Hubo un error en la tabla de códigos (' + tabla + ")." + res[2],
                            footer: '<a href="">Revise  datos de entrada y base de datos/tabla: biblioteca.db / tgr00_codigos</a>'
                        })      
                    }    
            })
            .fail(function(){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops... ERROR',
                    text: 'Hubo un error en la tabla de códigos (' + tabla + ")." + res[2],
                    footer: '<a href="">Revise  datos de entrada y base de datos/tabla: biblioteca.db / tgr00_codigos</a>'
                })              
            }) 
    })
    // Edición    
    $("#nacionalidadE").change(function(){  
        funcion_codigo = 1  // Leer descripción de la tabla de códigos
        tabla = "Nacionalidad";
        clave = document.getElementById('nacionalidadE').value
        titulo = "Nacionalidad"
                
        $.ajax({
            type: "POST",
            url: "basedatos/tabla_codigos_ajax.php",
            data: {
                param0: funcion_codigo,
                param1: tabla,
                param2: clave},
            })
            .done(function(respuesta){  
                res=respuesta.split("#&");
                nro_elementos= res.length
                if (res[0] == 0) { // indicador de si el acceso a la base de datos ha sido correcto
                    if (res[1] == 1
                    && clave !== "") { // No existe el valor   
                        Swal.fire({
                            title: titulo + ' no existe. ¿Desea dar de alta?',
                            icon: 'question',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Sí',
                            cancelButtonText: 'No'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                funcion_codigo = 3  // Dar de alta nueva fila en la tabla de códigos
                                $.ajax({
                                    type: "POST",
                                    url: "basedatos/tabla_codigos_ajax.php",
                                    data: {
                                        param0: funcion_codigo,
                                        param1: tabla,
                                        param2: clave},
                                    })
                                    .done(function(respuesta){  
                                        res=respuesta.split("#&");
                                        nro_elementos= res.length
                                        if (res[0] == 0) { // indicador de si el acceso a la base de datos ha sido correcto
                                            Swal.fire({
                                                icon: 'success',
                                                title: 'Alta realizada',
                                                text: 'Nueva fila en ' + tabla + " con código " + res[3],                                                
                                            }) 
                                            
                                            $.ajax({
                                                type: "POST",
                                                url: "basedatos/tabla_codigos_cargar.php",
                                                data: {param1: tabla,
                                                    param2: clave},
                                                dataType: "html"
                                                })
                                                .done(function(lista_select){
                                                    $("#lista_nacionalidadesE").empty();
                                                    $("#lista_nacionalidadesE").html(lista_select); 
                                                })
                                                .fail(function(){
                                                    Swal.fire({
                                                        icon: 'error',
                                                        title: 'Oops...',
                                                        text: 'Hubo un error al cargar las nacionalidades',
                                                        footer: '<a href="">Revise  datos de entrada y base de datos/tabla: biblioteca.db / tgr00_codigos</a>'
                                                    })              
                                                })    
                                                
                                        } else {
                                                Swal.fire({
                                                    icon: 'error',
                                                    title: 'ERROR. Alta no realizada',
                                                    text: res[2],
                                                    footer: '<a href="">Revise datos de entrada y base de datos</a>'
                                                }) 
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
                            } else {
                                $("#nacionalidadE").val("");
                                } 
                        })
                    }
                } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops... ERROR',
                            text: 'Hubo un error en la tabla de códigos (' + tabla + ")." + res[2],
                            footer: '<a href="">Revise  datos de entrada y base de datos/tabla: biblioteca.db / tgr00_codigos</a>'
                        })      
                    }    
            })
            .fail(function(){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops... ERROR',
                    text: 'Hubo un error en la tabla de códigos (' + tabla + ")." + res[2],
                    footer: '<a href="">Revise  datos de entrada y base de datos/tabla: biblioteca.db / tgr00_codigos</a>'
                })              
            })      
    })         
     
    //País de nacimiento
    // Alta
    $("#pnac").change(function(){  
        funcion_codigo = 1  // Leer descripción de la tabla de códigos
        tabla = "País";
        clave = document.getElementById('pnac').value
        titulo = "País de nacimiento"
                
        $.ajax({
            type: "POST",
            url: "basedatos/tabla_codigos_ajax.php",
            data: {
                param0: funcion_codigo,
                param1: tabla,
                param2: clave},
            })
            .done(function(respuesta){  
                res=respuesta.split("#&");
                nro_elementos= res.length
                if (res[0] == 0) { // indicador de si el acceso a la base de datos ha sido correcto
                    if (res[1] == 1
                    && clave !== "") { // No existe el valor   
                        Swal.fire({
                            title: titulo + ' no existe. ¿Desea dar de alta?',
                            icon: 'question',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Sí',
                            cancelButtonText: 'No'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                funcion_codigo = 3  // Dar de alta nueva fila en la tabla de códigos
                                $.ajax({
                                    type: "POST",
                                    url: "basedatos/tabla_codigos_ajax.php",
                                    data: {
                                        param0: funcion_codigo,
                                        param1: tabla,
                                        param2: clave},
                                    })
                                    .done(function(respuesta){  
                                        res=respuesta.split("#&");
                                        nro_elementos= res.length
                                        if (res[0] == 0) { // indicador de si el acceso a la base de datos ha sido correcto
                                            Swal.fire({
                                                icon: 'success',
                                                title: 'Alta realizada',
                                                text: 'Nueva fila en ' + tabla + " con código " + res[3],                                                
                                            }) 
                                            
                                            $.ajax({
                                                type: "POST",
                                                url: "basedatos/tabla_codigos_cargar.php",
                                                data: {param1: tabla,
                                                    param2: clave},
                                                dataType: "html"
                                                })
                                                .done(function(lista_select){
                                                    $("#lista_paises1").empty();
                                                    $("#lista_paises1").html(lista_select); 

                                                    $("#lista_paises2").empty();
                                                    $("#lista_paises2").html(lista_select); 
                                                })
                                                .fail(function(){
                                                    Swal.fire({
                                                        icon: 'error',
                                                        title: 'Oops...',
                                                        text: 'Hubo un error al cargar los países',
                                                        footer: '<a href="">Revise  datos de entrada y base de datos/tabla: biblioteca.db / tgr00_codigos</a>'
                                                    })              
                                                })    
                                                
                                        } else {
                                                Swal.fire({
                                                    icon: 'error',
                                                    title: 'ERROR. Alta no realizada',
                                                    text: res[2],
                                                    footer: '<a href="">Revise datos de entrada y base de datos</a>'
                                                }) 
                                            } 
                                    })
                                    .fail(function(){
                                        Swal.fire({
                                            icon: 'error',
                                            title: 'Oops...',
                                            text: 'Hubo un error al cargar los países',
                                            footer: '<a href="">Revise  datos de entrada y base de datos/tabla: biblioteca.db / tgr00_codigos</a>'
                                        })              
                                    })      
                            } else {
                                $("#pnac").val("");
                                } 
                        })
                    }
                } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops... ERROR',
                            text: 'Hubo un error en la tabla de códigos (' + tabla + ")." + res[2],
                            footer: '<a href="">Revise  datos de entrada y base de datos/tabla: biblioteca.db / tgr00_codigos</a>'
                        })      
                    }    
            })
            .fail(function(){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops... ERROR',
                    text: 'Hubo un error en la tabla de códigos (' + tabla + ")." + res[2],
                    footer: '<a href="">Revise  datos de entrada y base de datos/tabla: biblioteca.db / tgr00_codigos</a>'
                })              
            })      
    })  
    // Edición
    $("#pnacE").change(function(){  
        funcion_codigo = 1  // Leer descripción de la tabla de códigos
        tabla = "País";
        clave = document.getElementById('pnacE').value
        titulo = "País de nacimiento"
                
        $.ajax({
            type: "POST",
            url: "basedatos/tabla_codigos_ajax.php",
            data: {
                param0: funcion_codigo,
                param1: tabla,
                param2: clave},
            })
            .done(function(respuesta){  
                res=respuesta.split("#&");
                nro_elementos= res.length
                if (res[0] == 0) { // indicador de si el acceso a la base de datos ha sido correcto
                    if (res[1] == 1
                    && clave !== "") { // No existe el valor   
                        Swal.fire({
                            title: titulo + ' no existe. ¿Desea dar de alta?',
                            icon: 'question',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Sí',
                            cancelButtonText: 'No'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                funcion_codigo = 3  // Dar de alta nueva fila en la tabla de códigos
                                $.ajax({
                                    type: "POST",
                                    url: "basedatos/tabla_codigos_ajax.php",
                                    data: {
                                        param0: funcion_codigo,
                                        param1: tabla,
                                        param2: clave},
                                    })
                                    .done(function(respuesta){  
                                        res=respuesta.split("#&");
                                        nro_elementos= res.length
                                        if (res[0] == 0) { // indicador de si el acceso a la base de datos ha sido correcto
                                            Swal.fire({
                                                icon: 'success',
                                                title: 'Alta realizada',
                                                text: 'Nueva fila en ' + tabla + " con código " + res[3],                                                
                                            }) 
                                            
                                            $.ajax({
                                                type: "POST",
                                                url: "basedatos/tabla_codigos_cargar.php",
                                                data: {param1: tabla,
                                                    param2: clave},
                                                dataType: "html"
                                                })
                                                .done(function(lista_select){
                                                    $("#lista_paises1E").empty();
                                                    $("#lista_paises1E").html(lista_select); 

                                                    $("#lista_paises2E").empty();
                                                    $("#lista_paises2E").html(lista_select); 
                                                })
                                                .fail(function(){
                                                    Swal.fire({
                                                        icon: 'error',
                                                        title: 'Oops...',
                                                        text: 'Hubo un error al cargar los países',
                                                        footer: '<a href="">Revise  datos de entrada y base de datos/tabla: biblioteca.db / tgr00_codigos</a>'
                                                    })              
                                                })    
                                                
                                        } else {
                                                Swal.fire({
                                                    icon: 'error',
                                                    title: 'ERROR. Alta no realizada',
                                                    text: res[2],
                                                    footer: '<a href="">Revise datos de entrada y base de datos</a>'
                                                }) 
                                            } 
                                    })
                                    .fail(function(){
                                        Swal.fire({
                                            icon: 'error',
                                            title: 'Oops...',
                                            text: 'Hubo un error al cargar los países',
                                            footer: '<a href="">Revise  datos de entrada y base de datos/tabla: biblioteca.db / tgr00_codigos</a>'
                                        })              
                                    })      
                            } else {
                                $("#pnacE").val("");
                                } 
                        })
                    }
                } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops... ERROR',
                            text: 'Hubo un error en la tabla de códigos (' + tabla + ")." + res[2],
                            footer: '<a href="">Revise  datos de entrada y base de datos/tabla: biblioteca.db / tgr00_codigos</a>'
                        })      
                    }    
            })
            .fail(function(){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops... ERROR',
                    text: 'Hubo un error en la tabla de códigos (' + tabla + ")." + res[2],
                    footer: '<a href="">Revise  datos de entrada y base de datos/tabla: biblioteca.db / tgr00_codigos</a>'
                })              
            })      
    })  
    
    //País de fallecimiento
    // Alta
    $("#pfal").change(function(){  
        funcion_codigo = 1  // Leer descripción de la tabla de códigos
        tabla = "País";
        clave = document.getElementById('pfal').value
        titulo = "País de fallecimimiento"
                
        $.ajax({
            type: "POST",
            url: "basedatos/tabla_codigos_ajax.php",
            data: {
                param0: funcion_codigo,
                param1: tabla,
                param2: clave},
            })
            .done(function(respuesta){  
                res=respuesta.split("#&");
                nro_elementos= res.length
                if (res[0] == 0) { // indicador de si el acceso a la base de datos ha sido correcto
                    if (res[1] == 1
                    && clave !== "") { // No existe el valor   
                        Swal.fire({
                            title: titulo + ' no existe. ¿Desea dar de alta?',
                            icon: 'question',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Sí',
                            cancelButtonText: 'No'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                funcion_codigo = 3  // Dar de alta nueva fila en la tabla de códigos
                                $.ajax({
                                    type: "POST",
                                    url: "basedatos/tabla_codigos_ajax.php",
                                    data: {
                                        param0: funcion_codigo,
                                        param1: tabla,
                                        param2: clave},
                                    })
                                    .done(function(respuesta){  
                                        res=respuesta.split("#&");
                                        nro_elementos= res.length
                                        if (res[0] == 0) { // indicador de si el acceso a la base de datos ha sido correcto
                                            Swal.fire({
                                                icon: 'success',
                                                title: 'Alta realizada',
                                                text: 'Nueva fila en ' + tabla + " con código " + res[3],                                                
                                            }) 
                                            
                                            $.ajax({
                                                type: "POST",
                                                url: "basedatos/tabla_codigos_cargar.php",
                                                data: {param1: tabla,
                                                    param2: clave},
                                                dataType: "html"
                                                })
                                                .done(function(lista_select){
                                                    $("#lista_paises1").empty();
                                                    $("#lista_paises1").html(lista_select); 

                                                    $("#lista_paises2").empty();
                                                    $("#lista_paises2").html(lista_select); 
                                                })
                                                .fail(function(){
                                                    Swal.fire({
                                                        icon: 'error',
                                                        title: 'Oops...',
                                                        text: 'Hubo un error al cargar los países',
                                                        footer: '<a href="">Revise  datos de entrada y base de datos/tabla: biblioteca.db / tgr00_codigos</a>'
                                                    })              
                                                })    
                                                
                                        } else {
                                                Swal.fire({
                                                    icon: 'error',
                                                    title: 'ERROR. Alta no realizada',
                                                    text: res[2],
                                                    footer: '<a href="">Revise datos de entrada y base de datos</a>'
                                                }) 
                                            } 
                                    })
                                    .fail(function(){
                                        Swal.fire({
                                            icon: 'error',
                                            title: 'Oops...',
                                            text: 'Hubo un error al cargar los países',
                                            footer: '<a href="">Revise  datos de entrada y base de datos/tabla: biblioteca.db / tgr00_codigos</a>'
                                        })              
                                    })      
                            } else {
                                $("#pfal").val("");
                                } 
                        })
                    }
                } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops... ERROR',
                            text: 'Hubo un error en la tabla de códigos (' + tabla + ")." + res[2],
                            footer: '<a href="">Revise  datos de entrada y base de datos/tabla: biblioteca.db / tgr00_codigos</a>'
                        })      
                    }    
            })
            .fail(function(){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops... ERROR',
                    text: 'Hubo un error en la tabla de códigos (' + tabla + ")." + res[2],
                    footer: '<a href="">Revise  datos de entrada y base de datos/tabla: biblioteca.db / tgr00_codigos</a>'
                })              
            })      
    })  
    // Edición
    $("#pfalE").change(function(){  
        funcion_codigo = 1  // Leer descripción de la tabla de códigos
        tabla = "País";
        clave = document.getElementById('pfalE').value
        titulo = "País de fallecimimiento"
                
        $.ajax({
            type: "POST",
            url: "basedatos/tabla_codigos_ajax.php",
            data: {
                param0: funcion_codigo,
                param1: tabla,
                param2: clave},
            })
            .done(function(respuesta){  
                res=respuesta.split("#&");
                nro_elementos= res.length
                if (res[0] == 0) { // indicador de si el acceso a la base de datos ha sido correcto
                    if (res[1] == 1
                    && clave !== "") { // No existe el valor   
                        Swal.fire({
                            title: titulo + ' no existe. ¿Desea dar de alta?',
                            icon: 'question',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Sí',
                            cancelButtonText: 'No'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                funcion_codigo = 3  // Dar de alta nueva fila en la tabla de códigos
                                $.ajax({
                                    type: "POST",
                                    url: "basedatos/tabla_codigos_ajax.php",
                                    data: {
                                        param0: funcion_codigo,
                                        param1: tabla,
                                        param2: clave},
                                    })
                                    .done(function(respuesta){  
                                        res=respuesta.split("#&");
                                        nro_elementos= res.length
                                        if (res[0] == 0) { // indicador de si el acceso a la base de datos ha sido correcto
                                            Swal.fire({
                                                icon: 'success',
                                                title: 'Alta realizada',
                                                text: 'Nueva fila en ' + tabla + " con código " + res[3],                                                
                                            }) 
                                            
                                            $.ajax({
                                                type: "POST",
                                                url: "basedatos/tabla_codigos_cargar.php",
                                                data: {param1: tabla,
                                                    param2: clave},
                                                dataType: "html"
                                                })
                                                .done(function(lista_select){
                                                    $("#lista_paises1E").empty();
                                                    $("#lista_paises1E").html(lista_select); 

                                                    $("#lista_paises2E").empty();
                                                    $("#lista_paises2E").html(lista_select); 
                                                })
                                                .fail(function(){
                                                    Swal.fire({
                                                        icon: 'error',
                                                        title: 'Oops...',
                                                        text: 'Hubo un error al cargar los países',
                                                        footer: '<a href="">Revise  datos de entrada y base de datos/tabla: biblioteca.db / tgr00_codigos</a>'
                                                    })              
                                                })    
                                                
                                        } else {
                                                Swal.fire({
                                                    icon: 'error',
                                                    title: 'ERROR. Alta no realizada',
                                                    text: res[2],
                                                    footer: '<a href="">Revise datos de entrada y base de datos</a>'
                                                }) 
                                            } 
                                    })
                                    .fail(function(){
                                        Swal.fire({
                                            icon: 'error',
                                            title: 'Oops...',
                                            text: 'Hubo un error al cargar los países',
                                            footer: '<a href="">Revise  datos de entrada y base de datos/tabla: biblioteca.db / tgr00_codigos</a>'
                                        })              
                                    })      
                            } else {
                                $("#pfalE").val("");
                                } 
                        })
                    }
                } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops... ERROR',
                            text: 'Hubo un error en la tabla de códigos (' + tabla + ")." + res[2],
                            footer: '<a href="">Revise  datos de entrada y base de datos/tabla: biblioteca.db / tgr00_codigos</a>'
                        })      
                    }    
            })
            .fail(function(){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops... ERROR',
                    text: 'Hubo un error en la tabla de códigos (' + tabla + ")." + res[2],
                    footer: '<a href="">Revise  datos de entrada y base de datos/tabla: biblioteca.db / tgr00_codigos</a>'
                })              
            })      
    })  

    //Soporte físico en el que se encuentra el libro 
    $("#soplib").change(function(){  
        funcion_codigo = 1  // Leer descripción de la tabla de códigos
        tabla = "SopLib";
        clave = document.getElementById('soplib').value
        titulo = "Soporte físico del libro"
                
        $.ajax({
            type: "POST",
            url: "basedatos/tabla_codigos_ajax.php",
            data: {
                param0: funcion_codigo,
                param1: tabla,
                param2: clave},
            })
            .done(function(respuesta){  
                res=respuesta.split("#&");
                nro_elementos= res.length
                if (res[0] == 0) { // indicador de si el acceso a la base de datos ha sido correcto
                    if (res[1] == 1
                    && clave !== "") { // No existe el valor   
                        Swal.fire({
                            title: titulo + ' no existe. ¿Desea dar de alta?',
                            icon: 'question',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Sí',
                            cancelButtonText: 'No'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                funcion_codigo = 3  // Dar de alta nueva fila en la tabla de códigos
                                $.ajax({
                                    type: "POST",
                                    url: "basedatos/tabla_codigos_ajax.php",
                                    data: {
                                        param0: funcion_codigo,
                                        param1: tabla,
                                        param2: clave},
                                    })
                                    .done(function(respuesta){  
                                        res=respuesta.split("#&");
                                        nro_elementos= res.length
                                        if (res[0] == 0) { // indicador de si el acceso a la base de datos ha sido correcto
                                            Swal.fire({
                                                icon: 'success',
                                                title: 'Alta realizada',
                                                text: 'Nueva fila en ' + tabla + " con código " + res[3],                                                
                                            }) 
                                            
                                            $.ajax({
                                                type: "POST",
                                                url: "basedatos/tabla_codigos_cargar.php",
                                                data: {param1: tabla,
                                                    param2: clave},
                                                dataType: "html"
                                                })
                                                .done(function(lista_select){
                                                    $("#lista_soplib").empty();
                                                    $("#lista_soplib").html(lista_select); 
                                                })
                                                .fail(function(){
                                                    Swal.fire({
                                                        icon: 'error',
                                                        title: 'Oops...',
                                                        text: 'Hubo un error al cargar los soportes físicos de los libros',
                                                        footer: '<a href="">Revise  datos de entrada y base de datos/tabla: biblioteca.db / tgr00_codigos</a>'
                                                    })              
                                                })    
                                                
                                        } else {
                                                Swal.fire({
                                                    icon: 'error',
                                                    title: 'ERROR. Alta no realizada',
                                                    text: res[2],
                                                    footer: '<a href="">Revise datos de entrada y base de datos</a>'
                                                }) 
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
                            } else {
                                $("#soplib").val("");
                                } 
                        })
                    }
                } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops... ERROR',
                            text: 'Hubo un error en la tabla de códigos (' + tabla + ")." + res[2],
                            footer: '<a href="">Revise  datos de entrada y base de datos/tabla: biblioteca.db / tgr00_codigos</a>'
                        })      
                    }    
            })
            .fail(function(){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops... ERROR',
                    text: 'Hubo un error en la tabla de códigos (' + tabla + ")." + res[2],
                    footer: '<a href="">Revise  datos de entrada y base de datos/tabla: biblioteca.db / tgr00_codigos</a>'
                })              
            }) 
    })
        // Edición    
    $("#soplibE").change(function(){  
        funcion_codigo = 1  // Leer descripción de la tabla de códigos
        tabla = "SopLib";
        clave = document.getElementById('soplibE').value
        titulo = "Soporte físico del libro"
                
        $.ajax({
            type: "POST",
            url: "basedatos/tabla_codigos_ajax.php",
            data: {
                param0: funcion_codigo,
                param1: tabla,
                param2: clave},
            })
            .done(function(respuesta){  
                res=respuesta.split("#&");
                nro_elementos= res.length
                if (res[0] == 0) { // indicador de si el acceso a la base de datos ha sido correcto
                    if (res[1] == 1
                    && clave !== "") { // No existe el valor   
                        Swal.fire({
                            title: titulo + ' no existe. ¿Desea dar de alta?',
                            icon: 'question',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Sí',
                            cancelButtonText: 'No'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                funcion_codigo = 3  // Dar de alta nueva fila en la tabla de códigos
                                $.ajax({
                                    type: "POST",
                                    url: "basedatos/tabla_codigos_ajax.php",
                                    data: {
                                        param0: funcion_codigo,
                                        param1: tabla,
                                        param2: clave},
                                    })
                                    .done(function(respuesta){  
                                        res=respuesta.split("#&");
                                        nro_elementos= res.length
                                        if (res[0] == 0) { // indicador de si el acceso a la base de datos ha sido correcto
                                            Swal.fire({
                                                icon: 'success',
                                                title: 'Alta realizada',
                                                text: 'Nueva fila en ' + tabla + " con código " + res[3],                                                
                                            }) 
                                            
                                            $.ajax({
                                                type: "POST",
                                                url: "basedatos/tabla_codigos_cargar.php",
                                                data: {param1: tabla,
                                                    param2: clave},
                                                dataType: "html"
                                                })
                                                .done(function(lista_select){
                                                    $("#lista_soplibE").empty();
                                                    $("#lista_soplibE").html(lista_select); 
                                                })
                                                .fail(function(){
                                                    Swal.fire({
                                                        icon: 'error',
                                                        title: 'Oops...',
                                                        text: 'Hubo un error al cargar los soportes físicos de los libros',
                                                        footer: '<a href="">Revise  datos de entrada y base de datos/tabla: biblioteca.db / tgr00_codigos</a>'
                                                    })              
                                                })    
                                                
                                        } else {
                                                Swal.fire({
                                                    icon: 'error',
                                                    title: 'ERROR. Alta no realizada',
                                                    text: res[2],
                                                    footer: '<a href="">Revise datos de entrada y base de datos</a>'
                                                }) 
                                            } 
                                    })
                                    .fail(function(){
                                        Swal.fire({
                                            icon: 'error',
                                            title: 'Oops...',
                                            text: 'Hubo un error al cargar los soportes físicos de los libros',
                                            footer: '<a href="">Revise  datos de entrada y base de datos/tabla: biblioteca.db / tgr00_codigos</a>'
                                        })              
                                    })      
                            } else {
                                $("#soplibE").val("");
                                } 
                        })
                    }
                } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops... ERROR',
                            text: 'Hubo un error en la tabla de códigos (' + tabla + ")." + res[2],
                            footer: '<a href="">Revise  datos de entrada y base de datos/tabla: biblioteca.db / tgr00_codigos</a>'
                        })      
                    }    
            })
            .fail(function(){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops... ERROR',
                    text: 'Hubo un error en la tabla de códigos (' + tabla + ")." + res[2],
                    footer: '<a href="">Revise  datos de entrada y base de datos/tabla: biblioteca.db / tgr00_codigos</a>'
                })              
            })      
    })        

})      