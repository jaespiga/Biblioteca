/* Validación de campos de formularios: Libro / Edición */
const formularioE = document.getElementById('formularioE');
const inputsE = document.querySelectorAll('#formularioE');

const id_ApartadoE = document.getElementById('idApartadoE').value;
const id_OperE = document.getElementById('idOperE').value;
const id_AutorE = 'Autor';

const expresionesE = {
    autoresE: /^[a-zA-ZÀ-ÿ0-9\s\,\_\-]{1,100}$/,     // letras, acentos, números, espacios, guión bajo, guión
    fpubE:  /^[0-9]{1,4}$/,                          // números
    fadqE:  /^[0-9]{1,4}$/,                           // números
    festE:  /^[0-9]{1,4}$/                           // números
}

function validarFormularioE(evento) {
    
    switch (evento.target.name) {  
        case "autoresE":       

            if (evento.target.value == "") {
                /* Validación de caracteres correcta */
                error_lit="<p></p>";
                validar_campo_resultado("ok", evento.target.name, error_lit);
            } else {
                    if (expresionesE.autoresE.test(evento.target.value)) {
                        /* Validación de caracteres correcta */
                        error_lit="<p></p>";
                        validar_campo_resultado("ok", evento.target.name, error_lit);

                    } else {
                        error_lit= "<p class='formulario__input-error mt-0'>Error. Caracteres inválidos </p>";
                        validar_campo_resultado("nok", evento.target.name, error_lit);
                        }
                }
        break; 

        case "fpubE":
            if (expresionesE.fpubE.test(evento.target.value)) {
                /* Validación de caracteres correcta */
                error_lit="<p></p>";
                validar_campo_resultado("ok", evento.target.name, error_lit);

            } else {
                error_lit= "<p class='formulario__input-error mt-0'>Error. Caracteres inválidos </p>";
                validar_campo_resultado("nok", evento.target.name, error_lit);
                }
        break; 

        case "fadqE":
            if (expresionesE.fadqE.test(evento.target.value)) {
                /* Validación de caracteres correcta */
                error_lit="<p></p>";
                validar_campo_resultado("ok", evento.target.name, error_lit);

            } else {
                error_lit= "<p class='formulario__input-error mt-0'>Error. Caracteres inválidos </p>";
                validar_campo_resultado("nok", evento.target.name, error_lit);
                }
        break; 

        case "festE":
            if (expresiones.festE.test(evento.target.value)) {
                /* Validación de caracteres correcta */
                error_lit="<p></p>";
                validar_campo_resultado("ok", evento.target.name, error_lit);

            } else {
                error_lit= "<p class='formulario__input-error mt-0'>Error. Caracteres inválidos </p>";
                validar_campo_resultado("nok", evento.target.name, error_lit);
                }
        break; 

        default:
                
        break;
    } 
    return
}
function validarCampoValor(evento){
    switch (evento.target.name) {  

        case "autoresE":   // Autor
            if (evento.target.value == "") {
                error_lit="<p></p>"
                validar_campo_resultado("ok", evento.target.name, error_lit);       
            } else {
                    if (expresiones.autoresE.test(evento.target.value)) {
                        $.ajax({
                            type: 'POST',
                            url: 'basedatos/leer_datos.php',
                            data: {param1: evento.target.value,
                                   param2: id_AutorE
                                }
                        })
                        .done(function(autor_datos){
                            res=autor_datos.split("#&");                           
                            if (res[0] == 0) {              // Lectura de datos correcta
                                if (res[2].trim() == evento.target.value) {                           
                                    error_lit="<p></p>"
                                    validar_campo_resultado("ok", evento.target.name, error_lit);       
                                        
                                } else {
                                        $error_texto = "Error. " + id_AutorE + " no existe."
                                        error_lit='<p class="formulario__grupo-incorrecto">' + $error_texto +'</p>'
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

        } else {
            error_lit= "<p class='formulario__input-error mt-0'>Error. Caracteres inválidos </p>";
            validar_campo_resultado("nok", evento.target.name, error_lit);
            }
                } 
        break; 

        case "fpubE":    // Fecha de publicación del libro 
            if (expresiones.fpubE.test(evento.target.value)) {           
                funcion = 1
                ssaa = document.getElementById(evento.target.name).value
                mm = document.getElementById('fpubEmm').value
                dd = document.getElementById('fpubEdd').value
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
                                validar_campo_resultado("nok", evento.target.name, error_lit); 
                            } else {
                                    error_lit="<p></p>";
                                    validar_campo_resultado("ok", evento.target.name, error_lit);  
                                }
                        } else {
                                error_lit='<p class="formulario__grupo-incorrecto">' + res[1] +'</p>';
                                validar_campo_resultado("nok", evento.target.name, error_lit); 
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
                    validar_campo_resultado("nok", evento.target.name, error_lit);
                }
        break; 
        
        case "fadqE":    // Fecha de adquisición del libro 
            if (expresiones.fadqE.test(evento.target.value)) {           
                funcion = 1
                ssaa = document.getElementById(evento.target.name).value
                mm = document.getElementById('fadqEmm').value
                dd = document.getElementById('fadqEdd').value
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
                                validar_campo_resultado("nok", evento.target.name, error_lit); 
                            } else {
                                    error_lit="<p></p>";
                                    validar_campo_resultado("ok", evento.target.name, error_lit);  
                                }
                        } else {
                                error_lit='<p class="formulario__grupo-incorrecto">' + res[1] +'</p>';
                                validar_campo_resultado("nok", evento.target.name, error_lit); 
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
                    validar_campo_resultado("nok", evento.target.name, error_lit);
                }
        break; 

        case "festE":    // Fecha de inicio de la situación en la que se encuentra el libro
            if (expresiones.festE.test(evento.target.value)) {
                funcion = 1
                ssaa = document.getElementById(evento.target.name).value
                mm = document.getElementById('festEmm').value
                dd = document.getElementById('festEdd').value
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
                        nro_elementos= res.length
                        if (res[0]==0) { // indicador de validación general                          
                            if (res[7] == 1) {   // Fecha superior a fecha límite máxima
                                $error_texto = "Error. Fecha no puede ser superior a " + res[9]
                                error_lit='<p class="formulario__grupo-incorrecto">' + $error_texto+'</p>'
                                validar_campo_resultado("nok", evento.target.name, error_lit); 
                            } else {
                                    error_lit="<p></p>"
                                    validar_campo_resultado("ok", evento.target.name, error_lit);  
                                }
                        } else {
                                error_lit='<p class="formulario__grupo-incorrecto">' + res[1] +'</p>'
                                validar_campo_resultado("nok", evento.target.name, error_lit); 
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
                    validar_campo_resultado("nok", evento.target.name, error_lit);
                }
        break; 

        default:
                
        break;
    }  
    return  
}

/* Comparación de dos fechas. Devolver cuál es mayor y la diferencia entre ellas: 1/ en días 2/ años, meses y días */
function validarCompararFechas () {
    
    fecha_inicial_id = "fpubE";
    fecha_final_id= "fadqE";

    ssaa = document.getElementById(`${fecha_inicial_id}`).value;
    mm = document.getElementById('fpubEmm').value
    dd = document.getElementById('fpubEdd').value
    fecha_inicial = ssaa + "-" + mm + "-" + dd

    ssaa = document.getElementById(`${fecha_final_id}`).value;
    mm = document.getElementById('fadqEmm').value
    dd = document.getElementById('fadqEdd').value
    fecha_final = ssaa + "-" + mm + "-" + dd
    
    annos_minimos = 18;
    annos_maximos = 100;
    
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
                    $error_texto = "Error. Fecha de publicación (" + res[8] + ") no puede ser superior a fecha de adquisición (" + res[9] + ")"
                    error_lit='<p class="formulario__grupo-incorrecto">' + $error_texto+'</p>'
                    validar_campo_resultado("nok", fecha_inicial_id, error_lit); 
                } else {
                        error_lit="<p></p>"
                        validar_campo_resultado("ok", fecha_inicial_id, error_lit);  
                    }
            } else{
                    if (res[3] == 0) {
                                    error_lit="<p></p>"
                                    validar_campo_resultado("ok", fecha_inicial_id, error_lit); 
                    } else {               
                            error_lit='<p class="formulario__grupo-incorrecto">' + res[4] +'</p>'
                            validar_campo_resultado("nok", fecha_inicial_id, error_lit); 
                        }
                    if (res[5] == 0) {
                        error_lit="<p></p>"
                        validar_campo_resultado("ok", fecha_final_id, error_lit); 
                    } else {               
                            error_lit='<p class="formulario__grupo-incorrecto">' + res[6] +'</p>'
                            validar_campo_resultado("nok", fecha_final_id, error_lit); 
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
function validar_campo_resultado (resultado_validacion, campo, error_mensaje) {
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

inputsE.forEach((input, button)=> {
    input.addEventListener('focusout', validarCampoValor);
    input.addEventListener('keyup', validarFormularioE);
});

