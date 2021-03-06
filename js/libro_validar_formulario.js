/* Validación de campos de formularios: Libro / Alta */
const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario');

const id_Apartado = document.getElementById('idApartado').value;
const id_Oper = document.getElementById('idOper').value;
const id_Autor = 'Autor';

const expresiones = {
    autores: /^[a-zA-ZÀ-ÿ0-9\s\,\_\-]{1,100}$/,     // letras, acentos, números, espacios, guión bajo, guión
    fpub:  /^[0-9]{1,4}$/,                          // números
    fadq:  /^[0-9]{1,4}$/,                           // números
    fest:  /^[0-9]{1,4}$/                           // números
}

function validarFormulario(evento) {
    
    switch (evento.target.name) {  
        case "autores":       

            if (evento.target.value == "") {
                /* Validación de caracteres correcta */
                error_lit="<p></p>";
                validar_campo_resultado("ok", evento.target.name, error_lit);
            } else {
                    if (expresiones.autores.test(evento.target.value)) {
                        /* Validación de caracteres correcta */
                        error_lit="<p></p>";
                        validar_campo_resultado("ok", evento.target.name, error_lit);

                    } else {
                        error_lit= "<p class='formulario__input-error mt-0'>Error. Caracteres inválidos </p>";
                        validar_campo_resultado("nok", evento.target.name, error_lit);
                        }
                }
        break; 

        case "fpub":
            if (expresiones.fpub.test(evento.target.value)) {
                /* Validación de caracteres correcta */
                error_lit="<p></p>";
                validar_campo_resultado("ok", evento.target.name, error_lit);

            } else {
                error_lit= "<p class='formulario__input-error mt-0'>Error. Caracteres inválidos </p>";
                validar_campo_resultado("nok", evento.target.name, error_lit);
                }
        break; 

        case "fadq":
            if (expresiones.fadq.test(evento.target.value)) {
                /* Validación de caracteres correcta */
                error_lit="<p></p>";
                validar_campo_resultado("ok", evento.target.name, error_lit);

            } else {
                error_lit= "<p class='formulario__input-error mt-0'>Error. Caracteres inválidos </p>";
                validar_campo_resultado("nok", evento.target.name, error_lit);
                }
        break; 

        case "fest":
            if (expresiones.fest.test(evento.target.value)) {
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

        case "autores":   // Autor
            if (evento.target.value == "") {
                error_lit="<p></p>"
                validar_campo_resultado("ok", evento.target.name, error_lit);       
            } else {
                    if (expresiones.autores.test(evento.target.value)) {
                        $.ajax({
                            type: 'POST',
                            url: 'basedatos/leer_datos.php',
                            data: {param1: evento.target.value,
                                   param2: id_Autor
                                }
                        })
                        .done(function(autor_datos){
                            res=autor_datos.split("#&");                           
                            if (res[0] == 0) {              // Lectura de datos correcta
                                if (res[2].trim() == evento.target.value) {                           
                                    error_lit="<p></p>"
                                    validar_campo_resultado("ok", evento.target.name, error_lit);       
                                        
                                } else {
                                        $error_texto = "Error. " + id_Autor + " no existe."
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

        case "fpub":    // Fecha de publicación del libro 
            if (expresiones.fpub.test(evento.target.value)) {           
                funcion = 1
                ssaa = document.getElementById(evento.target.name).value
                mm = document.getElementById('fpubmm').value
                dd = document.getElementById('fpubdd').value
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
        
        case "fadq":    // Fecha de adquisición del libro 
            if (expresiones.fadq.test(evento.target.value)) {           
                funcion = 1
                ssaa = document.getElementById(evento.target.name).value
                mm = document.getElementById('fadqmm').value
                dd = document.getElementById('fadqdd').value
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

        case "fest":    // Fecha de inicio de la situación en la que se encuentra el libro
            if (expresiones.fest.test(evento.target.value)) {
                funcion = 1
                ssaa = document.getElementById(evento.target.name).value
                mm = document.getElementById('festmm').value
                dd = document.getElementById('festdd').value
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
    
    fecha_inicial_id = "fpub";
    fecha_final_id= "fadq";

    ssaa = document.getElementById(`${fecha_inicial_id}`).value;
    mm = document.getElementById('fpubmm').value
    dd = document.getElementById('fpubdd').value
    fecha_inicial = ssaa + "-" + mm + "-" + dd

    ssaa = document.getElementById(`${fecha_final_id}`).value;
    mm = document.getElementById('fadqmm').value
    dd = document.getElementById('fadqdd').value
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

inputs.forEach((input, button)=> {
    input.addEventListener('focusout', validarCampoValor);
    input.addEventListener('keyup', validarFormulario);
});

