/* Validación de campos de formularios */
const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario');

const id_Apartado = document.getElementById('idApartado').value;
const id_Oper = document.getElementById('idOper').value;

const expresiones = {
    clave: /^[a-zA-ZÀ-ÿ0-9\s\,\_\-]{1,100}$/,    // letras, acentos, números, espacios, guión bajo, guión
    fnac:  /^[0-9]{1,4}$/,                      // números
    ffal:  /^[0-9]{1,4}$/                       // números
}

function validarFormulario(evento) {
    
    switch (evento.target.name) {  
        case "clave":
        
            if (expresiones.clave.test(evento.target.value)) {
                /* Validación de caracteres correcta */
                error_lit="<p></p>";
                validar_campo_resultado("ok", evento.target.name, error_lit);

            } else {
                error_lit= "<p class='formulario__input-error mt-0'>Error. Caracteres inválidos </p>";
                validar_campo_resultado("nok", evento.target.name, error_lit);
                }
        break; 

        case "fnac":
            if (expresiones.fnac.test(evento.target.value)) {
                /* Validación de caracteres correcta */
                error_lit="<p></p>";
                validar_campo_resultado("ok", evento.target.name, error_lit);

            } else {
                error_lit= "<p class='formulario__input-error mt-0'>Error. Caracteres inválidos </p>";
                validar_campo_resultado("nok", evento.target.name, error_lit);
                }
        break; 

        case "ffal":
            if (expresiones.ffal.test(evento.target.value)) {
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
        case "clave":
            if (expresiones.clave.test(evento.target.value)) {
                $.ajax({
                    type: 'POST',
                    url: 'basedatos/leer_datos.php',
                    data: {param1: evento.target.value,
                        param2: id_Apartado
                        }
                })
                .done(function(autor_datos){
                    res=autor_datos.split("#&");
                    
                    if (id_Oper == "alta") {
                        if (evento.target.value !== "" 
                            && res[0].trim() == evento.target.value) {
                            $error_texto = "Error. " + id_Apartado + " ya existe. </p>'"
                            error_lit='<p class="formulario__grupo-incorrecto">' + $error_texto+'</p>'
                            validar_campo_resultado("nok", evento.target.name, error_lit); 
                        } else {
                                error_lit="<p></p>"
                                validar_campo_resultado("ok", evento.target.name, error_lit);       
                            }
                    } else {
                        if (res[0].trim() == "") {
                            $error_texto = "Error. " + id_Apartado + " no existe. </p>'"
                            error_lit='<p class="formulario__grupo-incorrecto">' + $error_texto+'</p>'
                            validar_campo_resultado("nok", evento.target.name, error_lit);
                        } else {
                                error_lit="<p></p>"
                                validar_campo_resultado("ok", evento.target.name, error_lit);       
                            }
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
        break; 

        case "fnac":  
            if (expresiones.fnac.test(evento.target.value)) {
                funcion = 1
                ssaa = document.getElementById('fnac').value
                mm = document.getElementById('fnacmm').value
                dd = document.getElementById('fnacdd').value
                fecha = ssaa + "-" + mm + "-" + dd
                annos_referencia = -15  // Años a sumar/restar a la fecha del día
                meses_referencia = 1    // Meses a sumar/restar a la fecha del día
                dias_referencia = 1     // Días a sumar/restar a la fecha del día
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
                            if (res[3] == 1) {   // Fecha superior a fecha límite máxima
                                $error_texto = "Error. Fecha no puede ser superior a " + res[5]
                                error_lit='<p class="formulario__grupo-incorrecto">' + $error_texto+'</p>'
                                validar_campo_resultado("nok", evento.target.name, error_lit); 
                            } else {
                                    error_lit="<p></p>"
                                    validar_campo_resultado("ok", evento.target.name, error_lit);  
                                }
                        } else {
                                error_lit='<p class="formulario__grupo-incorrecto">' + mensaje +'</p>'
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
                    error_lit= "<p class='formulario__input-error mt-0'>Error. Caracteres inválidos </p>";
                    validar_campo_resultado("nok", evento.target.name, error_lit);
                }
        break; 

        case "ffal": 
            if (expresiones.ffal.test(evento.target.value)) {
                funcion = 1
                ssaa = document.getElementById('ffal').value
                mm = document.getElementById('ffalmm').value
                dd = document.getElementById('ffaldd').value
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
                            if (res[3] == 1) {   // Fecha superior a fecha límite máxima
                                $error_texto = "Error. Fecha no puede ser superior a " + res[5]
                                error_lit='<p class="formulario__grupo-incorrecto">' + $error_texto+'</p>'
                                validar_campo_resultado("nok", evento.target.name, error_lit); 
                            } else {
                                    error_lit="<p></p>"
                                    validar_campo_resultado("ok", evento.target.name, error_lit);  
                                }
                        } else {
                                error_lit='<p class="formulario__grupo-incorrecto">' + mensaje +'</p>'
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
                    error_lit= "<p class='formulario__input-error mt-0'>Error. Caracteres inválidos </p>";
                    validar_campo_resultado("nok", evento.target.name, error_lit);
                }
        break; 

        default:
                
        break;
    }  
    return  
}

function validarCompararFechas () {
    
    fecha_inicial_id = "fnac";
    fecha_final_id= "ffal";
    fecha_inicial = document.getElementById(`${fecha_inicial_id}`).value;
    fecha_final = document.getElementById(`${fecha_final_id}`).value;
    
    if (fecha_inicial !== "" 
    && fecha_final !== ""){
        if (fecha_final <= fecha_inicial) {
            $error_texto = "Error. Fecha de nacimiento (" + fecha_inicial + ") no puede ser igual o superior a la fecha de fallecimiento (" + fecha_final + ")";
            error_lit1='<p class="formulario__grupo-incorrecto">' + $error_texto+'</p>';   
            validar_campo_resultado("nok", fecha_inicial_id, error_lit1);      
        } else {
            error_lit="<p></p>"
            validar_campo_resultado("ok", fecha_inicial_id, error_lit); 
        }
    } else {
        error_lit="<p></p>"
        validar_campo_resultado("ok", fecha_inicial_id, error_lit); 
        }
        return
}


/* función para resaltar resultados del análisis de un campo del formulario */
function validar_campo_resultado (resultado_validacion, campo, error_mensaje) {
    
    $(`#${campo}_error`).html(error_mensaje);   
    if (resultado_validacion == "ok") {
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto'); 
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo'); 
        campos['campo'] = true;      
    } else {
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto'); 
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo'); 
        campos['campo'] = false;       
        }  
        return                                              
}

/* Analizar las entradas del formulario que queramos validar  */ 
inputs.forEach((input, button)=> {
    input.addEventListener('focusout', validarCampoValor);
    input.addEventListener('focusout', validarCompararFechas);
    input.addEventListener('keyup', validarFormulario);
});

