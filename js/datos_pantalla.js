$(document).ready(function(){     /* Ejecutar cuando la página esté cargada */
//Coloca aqui el id de tu select, esta función te detecta cuando haces un cambio en tu selección
    $("#lista_usuarios").change(function () {
        $("#lista_usuarios").each(function () {
            usuario = $(this).val();

            $.ajax({                        
               type: "POST",                 
               url: "basedatos/datos_pantalla.php",                    
               data: {param1: usuario} 
            })    
                .done(function(datos_usuario){
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
                })
                .fail(function(){
                    alert('Hubo un error al obtener los datos del usuario');                
                })            
        })
    })
})
