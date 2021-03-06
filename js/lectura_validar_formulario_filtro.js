/* Validación de campos de formularios: Lectura / Filtro */
const formularioF = document.getElementById('formularioF');
const inputsF = document.querySelectorAll('#formularioF');

const id_ApartadoF = document.getElementById('idApartadoF').value;
const id_OperF = document.getElementById('idOperF').value;

const expresionesF = {
    finilFI:  /^[0-9]{1,4}$/,                      // números
    finilFS:  /^[0-9]{1,4}$/,                      // números
    ffinlFI:  /^[0-9]{1,4}$/,                      // números
    ffinlFS:  /^[0-9]{1,4}$/                       // números
}

function validarformularioF(evento) {
    
    switch (evento.target.name) {  

        case "finilFI":
            if (expresionesF.finilFI.test(evento.target.value)) {
                /* Validación de caracteres correcta */
                error_lit="<p></p>";
                validar_campo_resultadoF("ok", evento.target.name, error_lit);

            } else {
                error_lit= "<p class='formulario__input-error mt-0'>Error. Caracteres inválidos </p>";
                validar_campo_resultadoF("nok", evento.target.name, error_lit);
                }
        break; 

        case "finilFS":
            if (expresionesF.finilFS.test(evento.target.value)) {
                /* Validación de caracteres correcta */
                error_lit="<p></p>";
                validar_campo_resultadoF("ok", evento.target.name, error_lit);

            } else {
                error_lit= "<p class='formulario__input-error mt-0'>Error. Caracteres inválidos </p>";
                validar_campo_resultadoF("nok", evento.target.name, error_lit);
                }
        break; 

        case "ffinlFI":
            if (expresionesF.ffinlFI.test(evento.target.value)) {
                /* Validación de caracteres correcta */
                error_lit="<p></p>";
                validar_campo_resultadoF("ok", evento.target.name, error_lit);

            } else {
                error_lit= "<p class='formulario__input-error mt-0'>Error. Caracteres inválidos </p>";
                validar_campo_resultadoF("nok", evento.target.name, error_lit);
                }
        break; 

        case "ffinlFS":
            if (expresionesF.ffinlFS.test(evento.target.value)) {
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

        case "finilFI":    // Fecha de lectura. Límite inferior
            if (expresionesF.finilFI.test(evento.target.value)) {          
                funcion = 3 // Validar fecha
                ssaa = document.getElementById(evento.target.name).value
                mm = document.getElementById('finilFImm').value
                dd = document.getElementById('finilFIdd').value
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

        case "finilFS":    // Fecha de lectura. Límite inferior
            if (expresionesF.finilFS.test(evento.target.value)) {           
                funcion = 3 // Validar fecha
                ssaa = document.getElementById(evento.target.name).value
                mm = document.getElementById('finilFSmm').value
                dd = document.getElementById('finilFSdd').value
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

        case "ffinlFI":    // Fecha de lectura. Límite inferior
            if (expresionesF.ffinlFI.test(evento.target.value)) {           
                funcion = 3 // Validar fecha
                ssaa = document.getElementById(evento.target.name).value
                mm = document.getElementById('ffinlFImm').value
                dd = document.getElementById('ffinlFIdd').value
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

        case "ffinlFS":    // Fecha de fallecimiento. Límite superior
            if (expresionesF.ffinlFS.test(evento.target.value)) {           
                funcion = 3 // Validar fecha
                ssaa = document.getElementById(evento.target.name).value
                mm = document.getElementById('ffinlFSmm').value
                dd = document.getElementById('ffinlFSdd').value
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
function validarCompararFinilF () {
    
    fecha_inicial_id = "finilFI";
    fecha_final_id= "finilFS";

    ssaa = document.getElementById(`${fecha_inicial_id}`).value;
    mm = document.getElementById('finilFImm').value
    dd = document.getElementById('finilFIdd').value
    fecha_inicial = ssaa + "-" + mm + "-" + dd

    ssaa = document.getElementById(`${fecha_final_id}`).value;
    mm = document.getElementById('finilFSmm').value
    dd = document.getElementById('finilFSdd').value
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
                    $error_texto = "Error. Fecha de comienzo de lectura inicial (" + res[8] + ") no puede ser mayor que la superior (" + res[9] + ")"
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
function validarCompararFfinlF () {
    
    fecha_inicial_id = "ffinlFI";
    fecha_final_id= "ffinlFS";

    ssaa = document.getElementById(`${fecha_inicial_id}`).value;
    mm = document.getElementById('ffinlFImm').value
    dd = document.getElementById('ffinlFIdd').value
    fecha_inicial = ssaa + "-" + mm + "-" + dd

    ssaa = document.getElementById(`${fecha_final_id}`).value;
    mm = document.getElementById('ffinlFSmm').value
    dd = document.getElementById('ffinlFSdd').value
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
                    $error_texto = "Error. Fecha de fin de lectura inicial (" + res[8] + ") no puede ser mayor que la superior (" + res[9] + ")"
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

