/* Validación de campos de formularios */
const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario');

const id_Apartado = document.getElementById('idApartado');
const id_Oper = document.getElementById('idOper');

const expresiones = {
    clave: /^[a-zA-ZÀ-ÿ0-9\s\,\_\-]{1,100}$/,     // letras, acentos, números, espacios, guión bajo, guión
}

const validarFormulario = (evento) =>{
    switch (evento.target.name) {  
        case "clave":
        
            if (expresiones.clave.test(evento.target.value)) {
                /* Validación de caracteres correcta */
                error_lit="<p></p>"
                validar_campo_resultado("ok", evento.target.name, error_lit);

            } else {
                error_lit= "<p class='formulario__input-error mt-0'>Error. Caracteres inválidos </p>"
                validar_campo_resultado("nok", evento.target.name, error_lit);
                }
        break;  
         
        default:
                
        break;
    } 
}

const validarCampoValor = (evento) =>{
    switch (evento.target.name) {  
        case "clave":
            valor_clave = evento.target.value
            $.ajax({
                type: 'POST',
                url: 'basedatos/leer_datos.php',
                data: {param1: valor_clave,
                       param2: id_Apartado }
            })
            .done(function(autor_datos){
                
                res=autor_datos.split("#&");
                
                if (id_Oper == "alta") {
                    if (evento.target.value !== "" 
                        && res[0].trim() == evento.target.value) {
                        $error_texto = "Error. " + id_Apartado + "ya existe. </p>'"
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
        break; 

        case "fnac":  
            annos_referencia = -15  // Años a sumar/restar al año en curso para no ser superado 
            $.ajax({
                    type: 'POST',
                    url: 'rutinas/validar_fecha_espanol.php',
                    data: {param1: evento.target.value,
                           param2: annos_referencia   
                    }
                })
                .done(function(respuesta){                              
                    res=respuesta.split("#&");
                    if (res[0] == "0") {
                        error_lit="<p></p>"
                        validar_campo_resultado("ok", evento.target.name, error_lit);   
                    } else {
                        if (res[0] == "1") {
                            $error_texto="Error. Fecha errónea. "
                            error_lit='<p class="formulario__grupo-incorrecto">' + $error_texto+'</p>'
                            validar_campo_resultado("nok", evento.target.name, error_lit); 
                        } else {
                            if (res[0] == "2") {
                                $error_texto = "Error. Fecha no puede ser superior a " + res[1]
                                error_lit='<p class="formulario__grupo-incorrecto">' + $error_texto+'</p>'
                                validar_campo_resultado("nok", evento.target.name, error_lit); 
                            } else {
                                error_lit='<p class="formulario__grupo-incorrecto">Error indeterminado. </p>';
                                validar_campo_resultado("nok", evento.target.name, error_lit); 
                                }
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
    
        break; 

        case "ffal": 
        
            annos_referencia = 0  // Años a sumar/restar al año en curso para no ser superado 
            $.ajax({
                    type: 'POST',
                    url: 'rutinas/validar_fecha_espanol.php',
                    data: {param1: evento.target.value,
                           param2: annos_referencia   
                    }
                })
                .done(function(respuesta){                              
                    res=respuesta.split("#&");
                    if (res[0] == "0") {
                        error_lit="<p></p>"
                        validar_campo_resultado("ok", evento.target.name, error_lit);               
                    } else {
                        if (res[0] == "1") {
                            $error_texto="Error. Fecha errónea. "
                            error_lit='<p class="formulario__grupo-incorrecto">' + $error_texto+'</p>'
                            validar_campo_resultado("nok", evento.target.name, error_lit); 
                        } else {
                            if (res[0] == "2") { 
                                $error_texto = "Error. Fecha no puede ser superior a " + res[1]
                                error_lit='<p class="formulario__grupo-incorrecto">' + $error_texto+'</p>'
                                validar_campo_resultado("nok", evento.target.name, error_lit); 
                            } else {
                                error_lit='<p class="formulario__grupo-incorrecto">Error indeterminado. </p>';
                                validar_campo_resultado("nok", evento.target.name, error_lit); 
                                }
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
    
        break; 

        default:
                
        break;
    }    
}

const validarCompararFechas = () => {
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
}


/* función para resaltar resultados del análisis de un campo del formulario */
const validar_campo_resultado = (resultado_validacion, campo, error_mensaje) => {
    
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
}

/* Analizar las entradas del formulario que queramos validar  */ 
inputs.forEach((input, button)=> {
    input.addEventListener('focusout', validarCampoValor);
    input.addEventListener('focusout', validarCompararFechas);
    input.addEventListener('keyup', validarFormulario);
});

