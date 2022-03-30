$(document).ready(function(){     /* Ejecutar cuando la página esté cargada */
    var clave_clave;
    
    var clave_tabla = document.getElementById('tabla_clit_cambio').getAttribute('data-clave');
    //comprobamos si se pulsa una tecla
    $("#cliteraria").keyup(function(){  
        //hacemos focus al campo de búsqueda
        $("#cliteraria").focus();                            
        //obtenemos el texto introducido en el campo de búsqueda
        clave_clave = $("#cliteraria").val();

        $.ajax({
            type: "POST",
            url: "basedatos/tabla_codigos_cargar.php",
            data: {param1: clave_tabla,
                   param2: clave_clave},
            dataType: "html"
            })
            .done(function(lista_select){
                if (!$.trim(lista_select)) {
                    
                    Swal.fire({
                        position: 'top',
                        icon: 'info',
                        title: 'No existe ninguna corriente literaria con esa combinación de caracteres.',
                        text: 'Nota. Se tiene en cuenta los acentos',
                        showConfirmButton: false,
                        timer: 3000
                    })
        
                } else {
                        $("#lista_clit").empty();
                        $("#lista_clit").html(lista_select);
                } 
            })
            .fail(function(){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Hubo un error al cargar las nacionalidades',
                    footer: '<a href="">Revise  datos de entrada y base de datos/tabla: biblioteca.db / tgr00_codigos</a>'
                })              
            })      
    })
})