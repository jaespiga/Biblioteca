/* Validación de campos de formularios: Lectura / Edición */
const formularioE = document.getElementById('formularioE_lectura');
const inputsE = document.querySelectorAll('#formularioE_lectura');

const id_LibroE_lectura = 'Libro';

const expresionesE = {
    finilE:  /^[0-9]{1,4}$/,                         // números
    ffinlE:  /^[0-9]{1,4}$/,                         // números
}

function validarFormularioE(evento) {
    
    switch (evento.target.name) {  

        case "finilE":
            if (expresionesE.finilE.test(evento.target.value)) {
                /* Validación de caracteres correcta */
                error_lit="<p></p>";
                validar_campo_resultadoE("ok", evento.target.name, error_lit);

            } else {
                error_lit= "<p class='formulario__input-error mt-0'>Error. Caracteres inválidos </p>";
                validar_campo_resultadoE("nok", evento.target.name, error_lit);
                }
        break; 

        case "ffinlE":
            if (expresionesE.ffinlE.test(evento.target.value)) {
                /* Validación de caracteres correcta */
                error_lit="<p></p>";
                validar_campo_resultadoE("ok", evento.target.name, error_lit);

            } else {
                error_lit= "<p class='formulario__input-error mt-0'>Error. Caracteres inválidos </p>";
                validar_campo_resultadoE("nok", evento.target.name, error_lit);
                }
        break; 

        default:
                
        break;
    } 
    return
}
function validarCampoValor(evento){
    switch (evento.target.name) {  

        case "librosE_lectura":   // Libro
            if (evento.target.value == "") {
                $('#autoresE_lectura').val("");
                error_lit="<p></p>"
                validar_campo_resultadoE("ok", evento.target.name, error_lit);       
            } else {
                    $.ajax({
                        type: 'POST',
                        url: 'basedatos/leer_datos.php',
                        data: {param1: evento.target.value,
                                param2: id_LibroE_lectura
                            }
                    })
                    .done(function(libro_datos){
                        res=libro_datos.split("#&");                           
                        if (res[0] == 0) {              // Lectura de datos correcta
                            if (res[2].trim() == evento.target.value) {  
                                $('#autoresE_lectura').val(res[3]);                       
                                error_lit="<p></p>"
                                validar_campo_resultadoE("ok", evento.target.name, error_lit);       
                                    
                            } else {
                                    $('#autoresE_lectura').val("");
                                    $error_texto = "Error. " + id_LibroE_lectura + " no existe."
                                    error_lit='<p class="formulario__grupo-incorrecto">' + $error_texto +'</p>'
                                    validar_campo_resultadoE("nok", evento.target.name, error_lit);
                                }
                        } else {
                                $('#autoresE_lectura').val("");
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
                            text: 'Hubo un error al leer libro',
                            footer: '<a href="">Revise datos de entrada y base de datos</a>'
                        }) 
                    })

                } 
        break; 

        case "finilE":    // Fecha de inicio de lectura del libro 
            if (expresionesE.finilE.test(evento.target.value)) {           
                funcion = 1
                ssaa = document.getElementById(evento.target.name).value
                mm = document.getElementById('finilEmm').value
                dd = document.getElementById('finilEdd').value
                fecha = ssaa + "-" + mm + "-" + dd
                annos_referencia = 0  // Años a sumar/restar a la fecha del día
                meses_referencia = 0    // Meses a sumar/restar a la fecha del día
                dias_referencia = 0     // Días a sumar/restar a la fecha del día
                $.ajax({
                        type: 'POST',
                        url: 'rutinas/tratamiento_fechas_pantalla.php',
                        data: {
                            param0: funcion,
                            param1: fecha,
                            param2: annos_referencia,
                            param3: meses_referencia,
                            param4: dias_referencia   
                        }
                    })
                    .done(function(respuesta){  
                        res=respuesta.split("#&");
                        nro_elementos= res.length;

                        if (res[0] == 0) { // indicador de validación general                   
                            if (res[7] == 1) {   // Fecha superior a fecha límite máxima
                                $error_texto = "Error. Fecha no puede ser superior a " + res[9];
                                error_lit='<p class="formulario__grupo-incorrecto">' + $error_texto +'</p>';
                                validar_campo_resultadoE("nok", evento.target.name, error_lit); 
                            } else {
                                    error_lit="<p></p>";
                                    validar_campo_resultadoE("ok", evento.target.name, error_lit);  
                                }
                        } else {
                                error_lit='<p class="formulario__grupo-incorrecto">' + res[1] +'</p>';
                                validar_campo_resultadoE("nok", evento.target.name, error_lit); 
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
                    validar_campo_resultadoE("nok", evento.target.name, error_lit);
                }
        break; 
        
        case "ffinlE":    // Fecha de fin de lectura del libro 
            if (expresionesE.ffinlE.test(evento.target.value)) {           
                funcion = 1
                ssaa = document.getElementById(evento.target.name).value
                mm = document.getElementById('ffinlEmm').value
                dd = document.getElementById('ffinlEdd').value
                fecha = ssaa + "-" + mm + "-" + dd
                annos_referencia = 0  // Años a sumar/restar a la fecha del día
                meses_referencia = 0    // Meses a sumar/restar a la fecha del día
                dias_referencia = 0     // Días a sumar/restar a la fecha del día
                $.ajax({
                        type: 'POST',
                        url: 'rutinas/tratamiento_fechas_pantalla.php',
                        data: {
                            param0: funcion,
                            param1: fecha,
                            param2: annos_referencia,
                            param3: meses_referencia,
                            param4: dias_referencia   
                        }
                    })
                    .done(function(respuesta){  
                        res=respuesta.split("#&");
                        nro_elementos= res.length;

                        if (res[0] == 0) { // indicador de validación general                   
                            if (res[7] == 1) {   // Fecha superior a fecha límite máxima
                                $error_texto = "Error. Fecha no puede ser superior a " + res[9];
                                error_lit='<p class="formulario__grupo-incorrecto">' + $error_texto +'</p>';
                                validar_campo_resultadoE("nok", evento.target.name, error_lit); 
                            } else {
                                    error_lit="<p></p>";
                                    validar_campo_resultadoE("ok", evento.target.name, error_lit);  
                                }
                        } else {
                                error_lit='<p class="formulario__grupo-incorrecto">' + res[1] +'</p>';
                                validar_campo_resultadoE("nok", evento.target.name, error_lit); 
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
                    validar_campo_resultadoE("nok", evento.target.name, error_lit);
                }
        break; 

        default:
                
        break;
    }  
    return  
}

/* Comparación de dos fechas. Devolver cuál es mayor y la diferencia entre ellas: 1/ en días 2/ años, meses y días */
function validarCompararFechas () {
    
    fecha_inicial_id = "finilE";
    fecha_final_id= "ffinlE";

    ssaa = document.getElementById(`${fecha_inicial_id}`).value;
    mm = document.getElementById('finilEmm').value
    dd = document.getElementById('finilEdd').value
    fecha_inicial = ssaa + "-" + mm + "-" + dd

    ssaa = document.getElementById(`${fecha_final_id}`).value;
    mm = document.getElementById('ffinlEmm').value
    dd = document.getElementById('ffinlEdd').value
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
                    $error_texto = "Error. Fecha de inicio de lectura (" + res[8] + ") no puede ser superior a fecha de fin de lectura (" + res[9] + ")"
                    error_lit='<p class="formulario__grupo-incorrecto">' + $error_texto+'</p>'
                    validar_campo_resultadoE("nok", fecha_inicial_id, error_lit); 
                } else {
                        error_lit="<p></p>"
                        validar_campo_resultadoE("ok", fecha_inicial_id, error_lit);  
                    }
            } else{
                    if (res[3] == 0) {
                                    error_lit="<p></p>"
                                    validar_campo_resultadoE("ok", fecha_inicial_id, error_lit); 
                    } else {               
                            error_lit='<p class="formulario__grupo-incorrecto">' + res[4] +'</p>'
                            validar_campo_resultadoE("nok", fecha_inicial_id, error_lit); 
                        }
                    if (res[5] == 0) {
                        error_lit="<p></p>"
                        validar_campo_resultadoE("ok", fecha_final_id, error_lit); 
                    } else {               
                            error_lit='<p class="formulario__grupo-incorrecto">' + res[6] +'</p>'
                            validar_campo_resultadoE("nok", fecha_final_id, error_lit); 
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


/* función para resaltar resultados del análisis de un campo del formularioE */
function validar_campo_resultadoE(resultado_validacion, campo, error_mensaje) {
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



/* Analizar las entradas del formularioE que queramos validar  */ 

inputsE.forEach((input, button)=> {
    input.addEventListener('focusout', validarCampoValor);
    input.addEventListener('keyup', validarFormularioE);
});

