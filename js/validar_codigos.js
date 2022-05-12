
/* Análisis de la existencia de códigos y posible alta de los mismos */
$(document).ready(function(){     /* Ejecutar cuando la página esté cargada */
    
    //Nacionalidad
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
                            text: 'Hubo un error en la tabla de códigos (' + titulo + ")." + res[2],
                            footer: '<a href="">Revise  datos de entrada y base de datos/tabla: biblioteca.db / tgr00_codigos</a>'
                        })      
                    }    
            })
            .fail(function(){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops... ERROR',
                    text: 'Hubo un error en la tabla de códigos (' + titulo + ")." + res[2],
                    footer: '<a href="">Revise  datos de entrada y base de datos/tabla: biblioteca.db / tgr00_codigos</a>'
                })              
            })      
    })  
    
    //Corriente literaria
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
                            text: 'Hubo un error en la tabla de códigos (' + titulo + ")." + res[2],
                            footer: '<a href="">Revise  datos de entrada y base de datos/tabla: biblioteca.db / tgr00_codigos</a>'
                        })      
                    }    
            })
            .fail(function(){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops... ERROR',
                    text: 'Hubo un error en la tabla de códigos (' + titulo + ")." + res[2],
                    footer: '<a href="">Revise  datos de entrada y base de datos/tabla: biblioteca.db / tgr00_codigos</a>'
                })              
            })      
    })  
    
    //País de nacimiento
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
                            text: 'Hubo un error en la tabla de códigos (' + titulo + ")." + res[2],
                            footer: '<a href="">Revise  datos de entrada y base de datos/tabla: biblioteca.db / tgr00_codigos</a>'
                        })      
                    }    
            })
            .fail(function(){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops... ERROR',
                    text: 'Hubo un error en la tabla de códigos (' + titulo + ")." + res[2],
                    footer: '<a href="">Revise  datos de entrada y base de datos/tabla: biblioteca.db / tgr00_codigos</a>'
                })              
            })      
    })  
    
    //País de fallecimiento
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
                            text: 'Hubo un error en la tabla de códigos (' + titulo + ")." + res[2],
                            footer: '<a href="">Revise  datos de entrada y base de datos/tabla: biblioteca.db / tgr00_codigos</a>'
                        })      
                    }    
            })
            .fail(function(){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops... ERROR',
                    text: 'Hubo un error en la tabla de códigos (' + titulo + ")." + res[2],
                    footer: '<a href="">Revise  datos de entrada y base de datos/tabla: biblioteca.db / tgr00_codigos</a>'
                })              
            })      
    })  
})      