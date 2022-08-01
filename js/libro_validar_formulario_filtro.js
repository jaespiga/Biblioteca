/* Validación de campos de formularios: Libro / Filtro */
const formularioF = document.getElementById('formularioF');
const inputsF = document.querySelectorAll('#formularioF');

const id_ApartadoF = document.getElementById('idApartadoF').value;
const id_Apartado_AutorF = "Autor";
const id_OperF = document.getElementById('idOperF').value;

const expresionesF = {
    fpubFI:  /^[0-9]{1,4}$/,                      // números
    fpubFS:  /^[0-9]{1,4}$/,                      // números
    fadqFI:  /^[0-9]{1,4}$/,                      // números
    fadqFS:  /^[0-9]{1,4}$/                       // números
}

function validarformularioF(evento) {
    
    switch (evento.target.name) {  

        case "fpubFI":
            if (expresionesF.fpubFI.test(evento.target.value)) {
                /* Validación de caracteres correcta */
                error_lit="<p></p>";
                validar_campo_resultadoF("ok", evento.target.name, error_lit);

            } else {
                error_lit= "<p class='formulario__input-error mt-0'>Error. Caracteres inválidos </p>";
                validar_campo_resultadoF("nok", evento.target.name, error_lit);
                }
        break; 

        case "fpubFS":
            if (expresionesF.fpubFS.test(evento.target.value)) {
                /* Validación de caracteres correcta */
                error_lit="<p></p>";
                validar_campo_resultadoF("ok", evento.target.name, error_lit);

            } else {
                error_lit= "<p class='formulario__input-error mt-0'>Error. Caracteres inválidos </p>";
                validar_campo_resultadoF("nok", evento.target.name, error_lit);
                }
        break; 

        case "fadqFI":
            if (expresionesF.fadqFI.test(evento.target.value)) {
                /* Validación de caracteres correcta */
                error_lit="<p></p>";
                validar_campo_resultadoF("ok", evento.target.name, error_lit);

            } else {
                error_lit= "<p class='formulario__input-error mt-0'>Error. Caracteres inválidos </p>";
                validar_campo_resultadoF("nok", evento.target.name, error_lit);
                }
        break; 

        case "fadqFS":
            if (expresionesF.fadqFS.test(evento.target.value)) {
                /* Validación de caracteres correcta */
                error_lit="<p></p>";
                validar_campo_resultadoF("ok", evento.target.name, error_lit);

            } else {
                error_lit= "<p class='formulario__input-error mt-0'>Error. Caracteres inválidos </p>";
                validar_campo_resultadoF("nok", evento.target.name, error_lit);
                }
        break; 

        default:
                
        break;
    } 
    return
}
function validarCampoValorF(evento){
    switch (evento.target.name) {  
        case "autoresF":   
            if (evento.target.value == "") {
                /* Validación de caracteres correcta */
                error_lit="<p></p>";
                validar_campo_resultado("ok", evento.target.name, error_lit);
            } else {
                    $.ajax({
                        type: 'POST',
                        url: 'basedatos/leer_datos.php',
                        data: {param1: evento.target.value,
                               param2: "id_Apartado_AutorF"
                            }
                    })
                    .done(function(autor_datos){
                        res=autor_datos.split("#&");
                        
                        if (res[0] == 0) {              // adquisición de datos correcta
                            if (evento.target.value !== "" 
                                && res[2].trim() == evento.target.value) {
                                error_lit="<p></p>"
                                validar_campo_resultado("ok", evento.target.name, error_lit);      
                            } else {   
                                $('#autoresF').val(""); 
                                $error_texto = "Error. " + evento.target.value + " no existe. Se anula. </p>'"
                                error_lit='<p class="formulario__grupo-incorrecto">' + $error_texto+'</p>'
                                validar_campo_resultado("nok", evento.target.name, error_lit);       
                                }
                            
                        } else {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'ERROR AL ACCEDER A LA BASE DE DATOS',
                                    text: res[1],
                                    footer: '<a href="">Revise datos de entrada y base de datos</a>'
                                }) 
                            }    
                    })
                    
                    .fail(function(){
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Hubo un error al leer autor',
                            footer: '<a href="">Revise datos de entrada y base de datos</a>'
                        }) 
                    })
                    
                }        
        break; 

        case "fpubFI":    // Fecha de publicación. Límite inferior
            if (expresionesF.fpubFI.test(evento.target.value)) {          
                funcion = 3 // Validar fecha
                ssaa = document.getElementById(evento.target.name).value
                mm = document.getElementById('fpubFImm').value
                dd = document.getElementById('fpubFIdd').value
                fecha = ssaa + "-" + mm + "-" + dd
                
                $.ajax({
                        type: 'POST',
                        url: 'rutinas/tratamiento_fechas_pantalla.php',
                        data: {
                            param0: funcion,
                            param1: fecha
                        }
                    })
                    .done(function(respuesta){ 
                        res=respuesta.split("#&");
                        nro_elementos= res.length;

                        if (res[0] == 0) { // indicador de validación general                   
                            error_lit="<p></p>";
                            validar_campo_resultadoF("ok", evento.target.name, error_lit);  
                        } else {
                                error_lit='<p class="formulario__grupo-incorrecto">' + res[1] +'</p>';
                                validar_campo_resultadoF("nok", evento.target.name, error_lit); 
                            }
                    })
                    .fail(function(){
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Hubo un error al validar la fecha',
                        }) 
                    })
            } else {
                    error_lit= "<p class='formulario__grupo-incorrecto mt-0'>Error. Caracteres inválidos </p>";
                    validar_campo_resultadoF("nok", evento.target.name, error_lit);
                }
        break; 

        case "fpubFS":    // Fecha de publicación. Límite superior
            if (expresionesF.fpubFS.test(evento.target.value)) {           
                funcion = 3 // Validar fecha
                ssaa = document.getElementById(evento.target.name).value
                mm = document.getElementById('fpubFSmm').value
                dd = document.getElementById('fpubFSdd').value
                fecha = ssaa + "-" + mm + "-" + dd
                
                $.ajax({
                        type: 'POST',
                        url: 'rutinas/tratamiento_fechas_pantalla.php',
                        data: {
                            param0: funcion,
                            param1: fecha
                        }
                    })
                    .done(function(respuesta){  
                        res=respuesta.split("#&");
                        nro_elementos= res.length;

                        if (res[0] == 0) { // indicador de validación general                   
                            error_lit="<p></p>";
                            validar_campo_resultadoF("ok", evento.target.name, error_lit);  
                        } else {
                                error_lit='<p class="formulario__grupo-incorrecto">' + res[1] +'</p>';
                                validar_campo_resultadoF("nok", evento.target.name, error_lit); 
                            }
                    })
                    .fail(function(){
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Hubo un error al validar la fecha',
                        }) 
                    })
            } else {
                    error_lit= "<p class='formulario__grupo-incorrecto mt-0'>Error. Caracteres inválidos </p>";
                    validar_campo_resultadoF("nok", evento.target.name, error_lit);
                }
        break; 

        case "fadqFI":    // Fecha de adquisición. Límite inferior
            if (expresionesF.fadqFI.test(evento.target.value)) {           
                funcion = 3 // Validar fecha
                ssaa = document.getElementById(evento.target.name).value
                mm = document.getElementById('fadqFImm').value
                dd = document.getElementById('fadqFIdd').value
                fecha = ssaa + "-" + mm + "-" + dd
                
                $.ajax({
                        type: 'POST',
                        url: 'rutinas/tratamiento_fechas_pantalla.php',
                        data: {
                            param0: funcion,
                            param1: fecha
                        }
                    })
                    .done(function(respuesta){  
                        res=respuesta.split("#&");
                        nro_elementos= res.length;

                        if (res[0] == 0) { // indicador de validación general                   
                            error_lit="<p></p>";
                            validar_campo_resultadoF("ok", evento.target.name, error_lit);  
                        } else {
                                error_lit='<p class="formulario__grupo-incorrecto">' + res[1] +'</p>';
                                validar_campo_resultadoF("nok", evento.target.name, error_lit); 
                            }
                    })
                    .fail(function(){
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Hubo un error al validar la fecha',
                        }) 
                    })
            } else {
                    error_lit= "<p class='formulario__grupo-incorrecto mt-0'>Error. Caracteres inválidos </p>";
                    validar_campo_resultadoF("nok", evento.target.name, error_lit);
                }
        break; 

        case "fadqFS":    // Fecha de adquisición. Límite superior
            if (expresionesF.fadqFS.test(evento.target.value)) {           
                funcion = 3 // Validar fecha
                ssaa = document.getElementById(evento.target.name).value
                mm = document.getElementById('fadqFSmm').value
                dd = document.getElementById('fadqFSdd').value
                fecha = ssaa + "-" + mm + "-" + dd
                
                $.ajax({
                        type: 'POST',
                        url: 'rutinas/tratamiento_fechas_pantalla.php',
                        data: {
                            param0: funcion,
                            param1: fecha
                        }
                    })
                    .done(function(respuesta){  
                        res=respuesta.split("#&");
                        nro_elementos= res.length;

                        if (res[0] == 0) { // indicador de validación general                   
                            error_lit="<p></p>";
                            validar_campo_resultadoF("ok", evento.target.name, error_lit);  
                        } else {
                                error_lit='<p class="formulario__grupo-incorrecto">' + res[1] + '</p>';
                                validar_campo_resultadoF("nok", evento.target.name, error_lit); 
                            }
                    })
                    .fail(function(){
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Hubo un error al validar la fecha',
                        }) 
                    })
            } else {
                    error_lit= "<p class='formulario__grupo-incorrecto mt-0'>Error. Caracteres inválidos </p>";
                    validar_campo_resultadoF("nok", evento.target.name, error_lit);
                }
        break; 

        default:
                
        break;
    }  
    return  
}

/* Comparación de dos fechas. Devolver cuál es mayor y la diferencia entre ellas: 1/ en días 2/ años, meses y días */
function validarCompararFpubF () {
    
    fecha_inicial_id = "fpubFI";
    fecha_final_id= "fpubFS";

    ssaa = document.getElementById(`${fecha_inicial_id}`).value;
    mm = document.getElementById('fpubFImm').value
    dd = document.getElementById('fpubFIdd').value
    fecha_inicial = ssaa + "-" + mm + "-" + dd

    ssaa = document.getElementById(`${fecha_final_id}`).value;
    mm = document.getElementById('fpubFSmm').value
    dd = document.getElementById('fpubFSdd').value
    fecha_final = ssaa + "-" + mm + "-" + dd
    
    funcion = 2
    $.ajax({
            type: 'POST',
            url: 'rutinas/tratamiento_fechas_pantalla.php',
            data: {
                param0: funcion,
                param1: fecha_inicial,
                param2: fecha_final
            }
        })
        .done(function(respuesta){  
            res=respuesta.split("#&");
            nro_elementos= res.length;
            
            if (res[0]==0) { // indicador de validación general                          
                if (res[7] == 1) {   // Fecha superior a fecha límite máxima
                    $error_texto = "Error. Fecha de publicación inicial (" + res[8] + ") no puede ser mayor que la superior (" + res[9] + ")"
                    error_lit='<p class="formulario__grupo-incorrecto">' + $error_texto + '</p>'
                    validar_campo_resultadoF("nok", fecha_inicial_id, error_lit); 
                } else {
                        error_lit="<p></p>"
                        validar_campo_resultadoF("ok", fecha_inicial_id, error_lit); 
                    }
            } else{
                    if (res[3]==0) {
                            error_lit="<p></p>"
                            validar_campo_resultadoF("ok", fecha_inicial_id, error_lit); 
                    } else {               
                            error_lit='<p class="formulario__grupo-incorrecto">' + res[4] + '</p>'
                            validar_campo_resultadoF("nok", fecha_inicial_id, error_lit); 
                        }
                    if (res[5]==0) {
                        error_lit="<p></p>"
                        validar_campo_resultadoF("ok", fecha_final_id, error_lit); 
                    } else {               
                            error_lit='<p class="formulario__grupo-incorrecto">' + res[6] + '</p>'
                            validar_campo_resultadoF("nok", fecha_final_id, error_lit); 
                        }
                }
        })
        .fail(function(){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Hubo un error al validar la fecha',
            }) 
        }) 
        
    return
}
/* Comparación de dos fechas. Devolver cuál es mayor y la diferencia entre ellas: 1/ en días 2/ años, meses y días */
function validarCompararFadqF () {
    
    fecha_inicial_id = "fadqFI";
    fecha_final_id= "fadqFS";

    ssaa = document.getElementById(`${fecha_inicial_id}`).value;
    mm = document.getElementById('fadqFImm').value
    dd = document.getElementById('fadqFIdd').value
    fecha_inicial = ssaa + "-" + mm + "-" + dd

    ssaa = document.getElementById(`${fecha_final_id}`).value;
    mm = document.getElementById('fadqFSmm').value
    dd = document.getElementById('fadqFSdd').value
    fecha_final = ssaa + "-" + mm + "-" + dd
    
    funcion = 2
    $.ajax({
            type: 'POST',
            url: 'rutinas/tratamiento_fechas_pantalla.php',
            data: {
                param0: funcion,
                param1: fecha_inicial,
                param2: fecha_final
            }
        })
        .done(function(respuesta){  
            res=respuesta.split("#&");
            nro_elementos= res.length;
            
            if (res[0]==0) { // indicador de validación general                          
                if (res[7] == 1) {   // Fecha superior a fecha límite máxima
                    $error_texto = "Error. Fecha de adquisición inicial (" + res[8] + ") no puede ser mayor que la superior (" + res[9] + ")"
                    error_lit='<p class="formulario__grupo-incorrecto">' + $error_texto+'</p>'
                    validar_campo_resultadoF("nok", fecha_inicial_id, error_lit); 
                }  else {
                        error_lit="<p></p>"
                        validar_campo_resultadoF("ok", fecha_inicial_id, error_lit); 
                    }
            } else{
                    if (res[3]==0) {
                            error_lit="<p></p>"
                            validar_campo_resultadoF("ok", fecha_inicial_id, error_lit); 
                    } else {               
                            error_lit='<p class="formulario__grupo-incorrecto">' + res[4] +'</p>'
                            validar_campo_resultadoF("nok", fecha_inicial_id, error_lit); 
                        }
                    if (res[5]==0) {
                        error_lit="<p></p>"
                        validar_campo_resultadoF("ok", fecha_final_id, error_lit); 
                    } else {               
                            error_lit='<p class="formulario__grupo-incorrecto">' + res[6] +'</p>'
                            validar_campo_resultadoF("nok", fecha_final_id, error_lit); 
                        }
                }
        })
        .fail(function(){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Hubo un error al validar la fecha',
            }) 
        }) 
        
    return
}

/* función para resaltar resultados del análisis de un campo del formulario */
function validar_campo_resultadoF (resultado_validacion, campo, error_mensaje) {
    
    $(`#${campo}_error`).html(error_mensaje);   
    if (resultado_validacion == "ok") {
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto'); 
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');     
    } else {
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto'); 
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo'); 
        }  
    return                                              
}



/* Analizar las entradas del formulario que queramos validar  */ 

inputsF.forEach((input, button)=> {
    input.addEventListener('focusout', validarCampoValorF);
    input.addEventListener('keyup', validarformularioF);
});

