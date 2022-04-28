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
        case "clave":   // Clave de la pantalla que se está tratando: Autor / Libro / Lectura
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
                    
                    if (res[0] == 0) {              // Lectura de datos correcta
                        if (id_Oper == "alta") {
                            if (evento.target.value !== "" 
                                && res[2].trim() == evento.target.value) {
                                $error_texto = "Error. " + id_Apartado + " ya existe. </p>'"
                                error_lit='<p class="formulario__grupo-incorrecto">' + $error_texto+'</p>'
                                validar_campo_resultado("nok", evento.target.name, error_lit); 
                            } else {                                  
                                    error_lit="<p></p>"
                                    validar_campo_resultado("ok", evento.target.name, error_lit);       
                                }
                        } else {
                            if (res[2].trim() == "") {
                                $error_texto = "Error. " + id_Apartado + " no existe."
                                error_lit='<p class="formulario__grupo-incorrecto">' + $error_texto+'</p>'
                                validar_campo_resultado("nok", evento.target.name, error_lit);
                            } else {
                                    error_lit="<p></p>"
                                    validar_campo_resultado("ok", evento.target.name, error_lit);       
                                }
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
        break; 

        case "fnac":    // Fecha de nacimiento del autor 
            if (expresiones.fnac.test(evento.target.value)) {           
                funcion = 1
                ssaa = document.getElementById(evento.target.name).value
                mm = document.getElementById('fnacmm').value
                dd = document.getElementById('fnacdd').value
                fecha = ssaa + "-" + mm + "-" + dd
                annos_referencia = -15  // Años a sumar/restar a la fecha del día
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

        case "ffal":    // Fecha de fallecimiento del autor
            if (expresiones.ffal.test(evento.target.value)) {
                funcion = 1
                ssaa = document.getElementById(evento.target.name).value
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
    
    fecha_inicial_id = "fnac";
    fecha_final_id= "ffal";

    ssaa = document.getElementById(`${fecha_inicial_id}`).value;
    mm = document.getElementById('fnacmm').value
    dd = document.getElementById('fnacdd').value
    fecha_inicial = ssaa + "-" + mm + "-" + dd

    ssaa = document.getElementById(`${fecha_final_id}`).value;
    mm = document.getElementById('ffalmm').value
    dd = document.getElementById('ffaldd').value
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
                    $error_texto = "Error. Fecha de nacimiento (" + res[8] + ") no puede ser superior a fecha de fallecimiento (" + res[9] + ")"
                    error_lit='<p class="formulario__grupo-incorrecto">' + $error_texto+'</p>'
                    validar_campo_resultado("nok", fecha_inicial_id, error_lit); 
                } else {                       
                        if (res[11] < annos_minimos) {   // Edad del autor menor a un mínimo ¿es correcto?
                            Swal.fire({
                                title: 'Edad del autor con menos de ' + annos_minimos + ' años ¿es correcto?',
                                icon: 'question',
                                showCancelButton: true,
                                confirmButtonColor: '#3085d6',
                                cancelButtonColor: '#d33',
                                confirmButtonText: 'Sí',
                                cancelButtonText: 'No'
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    error_lit="<p></p>"
                                    validar_campo_resultado("ok", fecha_inicial_id, error_lit);
                                } else {
                                    $('#fnac').val("ssaa");
                                    $('#ffal').val("ssaa");
                                    $error_texto = "Error. Diferencia entre fecha de nacimiento (" + res[8] + ") y fallecimiento (" + res[9] + ")  inferior a " + annos_minimos + " años";
                                    error_lit='<p class="formulario__grupo-incorrecto">' + $error_texto+'</p>'
                                    validar_campo_resultado("nok", fecha_inicial_id, error_lit); 
                                    } 
                            })
                        } else {
                            if (res[11] > annos_maximos) {   // Edad del autor mayor a un máximo ¿es correcto? 
                                Swal.fire({
                                    title: 'Edad del autor mayor de ' + annos_maximos + ' años ¿es correcto?',
                                    icon: 'question',
                                    showCancelButton: true,
                                    confirmButtonColor: '#3085d6',
                                    cancelButtonColor: '#d33',
                                    confirmButtonText: 'Sí',
                                    cancelButtonText: 'No'
                                }).then((result) => {
                                    if (result.isConfirmed) {
                                        error_lit="<p></p>"
                                        validar_campo_resultado("ok", fecha_inicial_id, error_lit);
                                    } else {
                                        $('#fnac').val("ssaa");
                                        $('#ffal').val("ssaa");
                                        $error_texto = "Error. Diferencia entre fecha de nacimiento (" + res[8] + ") y fallecimiento (" + res[9] + ")  superior a " + annos_maximos + " años";
                                        error_lit='<p class="formulario__grupo-incorrecto">' + $error_texto+'</p>'
                                        validar_campo_resultado("nok", fecha_inicial_id, error_lit); 
                                        } 
                                })
                            } else {     
                                    error_lit="<p></p>"
                                    validar_campo_resultado("ok", fecha_inicial_id, error_lit);  
                                }
                            }       
                    }
            } else{
                    if (res[3]==0) {
                                    error_lit="<p></p>"
                                    validar_campo_resultado("ok", fecha_inicial_id, error_lit); 
                    } else {               
                            error_lit='<p class="formulario__grupo-incorrecto">' + res[4] +'</p>'
                            validar_campo_resultado("nok", fecha_inicial_id, error_lit); 
                        }
                    if (res[5]==0) {
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

inputs.forEach((input, button)=> {
    input.addEventListener('focusout', validarCampoValor);
    input.addEventListener('keyup', validarFormulario);
});

