$(document).ready(function(){     /* Ejecutar cuando la página esté cargada */
    var consulta;
    //hacemos focus al campo de búsqueda
    $("#autores").focus();
                                                                                                 
    //comprobamos si se pulsa una tecla
    $("#autores").keyup(function(){                              
        //obtenemos el texto introducido en el campo de búsqueda
        consulta = $("#autores").val();

        $.ajax({
            type: "POST",
            url: "basedatos/autores_cargar_lista.php",
            data: {tecleo: consulta},
            dataType: "html"
            })
            .done(function(lista_select){
                if (!$.trim(lista_select)) {
                    
                    Swal.fire({
                        position: 'top',
                        icon: 'info',
                        title: 'No existe ningún autor con esa combinación de caracteres.',
                        text: 'Nota. Se tiene en cuenta los acentos',
                        showConfirmButton: false,
                        timer: 3000
                    })
        
                } else {
                        $("#lista_autores").empty();
                        $("#lista_autores").html(lista_select);
                } 
            })
            .fail(function(){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Hubo un error al cargar autores',
                    footer: '<a href="">Revise  datos de entrada y base de datos</a>'
                })              
            })      
    })
})