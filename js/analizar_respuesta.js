/* Analizar botón de respuesta pulsado en el caso del mantenimiento */ 
/* Pulsar "Sí". Valores modificados */ 
/* Pulsar "No". Restaurar valores de los campos de pantalla */ 

/* $(".tratamientoSN_Sí").click(function () { */
function función_respuestaSN_mto_Sí(datos) {
    $.ajax({                        
       type: "POST",                 
       url: "rutinas/confirmar_datos_usuario.php",                    
       data: {param1: datos} 
    })    
        .done(function(datos_usuario){
            
            document.getElementById("form_respuestaSN_mto").submit();

            resultado = datos_usuario
            res=resultado.split("#&")
            
            $('#lista_usuarios option[value="' + res[0] + '"]').prop('selected',true)
            
            if (res[1] != "") {
                $('#IndClave').prop("checked", true)
            } else {
                $('#IndClave').prop("checked", false)
                }

            document.getElementById('NUsuario').value = res[2]
            
            etiqueta="#NAutGral"+res[3]
            $(etiqueta).prop("checked", true)
            
            alert ('Actualización realizada');
            
        })
        .fail(function(){
            alert('Hubo un error al actualizar los datos del usuario');                
        })  
}
         

/* $(".tratamientoSN_No").click(function () { */
function función_respuestaSN_mto_No(usuario) {

    $.ajax({                        
       type: "POST",                 
       url: "basedatos/datos_pantalla.php",                    
       data: {param1: usuario} 
    })    
        .done(function(datos_usuario){

        	document.getElementById("form_respuestaSN_mto").submit();

            resultado = datos_usuario
            res=resultado.split("#&")
            
            $('#lista_usuarios option[value="' + res[0] + '"]').prop('selected',true)
            
            if (res[1] != "") {
                $('#IndClave').prop("checked", true)
            } else {
                $('#IndClave').prop("checked", false)
                }

            document.getElementById('NUsuario').value = res[2]
            
            etiqueta="#NAutGral"+res[3]
            $(etiqueta).prop("checked", true)
            
            alert ('Actualización no realizada');
        
        })
        .fail(function(){
            alert('Hubo un error al anular la operación');                
        })  
}

/* Analizar botón de respuesta pulsado en el caso de la baja */ 
/* Pulsar "Sí". Usuario dado de baja */ 
/* Pulsar "No". Baja de usuario cancelada */ 

/* $(".tratamientoSN_Sí").click(function () { */
function función_respuestaSN_baja_Sí(datos) {
    $.ajax({                        
       type: "POST",                 
       url: "basedatos/baja_usuario.php",                    
       data: {param1: datos} 
    })    
        .done(function(datos_usuario){

        	document.getElementById("form_respuestaSN_baja").submit();

            alert ('Baja realizada');
                       
        })
        .fail(function(){
            alert('Hubo un error al dar de baja el usuario');                
        })  
}
         

/* $(".tratamientoSN_No").click(function () { */
function función_respuestaSN_baja_No(usuario) {

    $.ajax({                        
       type: "POST",                 
       url: "basedatos/datos_pantalla.php",                    
       data: {param1: usuario} 
    })    
        .done(function(datos_usuario){

            alert ('Baja no realizada');  
            
        	document.getElementById("form_respuestaSN_baja").submit();
        })
        .fail(function(){
            alert('Hubo un error al anular la operación');                
        })  
}
         
