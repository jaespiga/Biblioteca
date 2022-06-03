<!--  Funciones para borrar Autores / Libros / Lecturas -->
<script>

function eliminarRegistro(datos_pantalla) {   
    res=datos_pantalla.split("#&");
    
    Swal.fire({
        title: '¿Está seguro de eliminar el registro?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.isConfirmed) {                              
            $.ajax({
                type: "POST",
                url: "basedatos/eliminar_registro.php",
                data: {param: datos_pantalla}
            })
            .done(function(respuesta){  
                res=respuesta.split("#&");

                if (res[0] == 0) { // indicador de si el acceso a la base de datos ha sido correcto
                    Swal.fire({
                        icon: 'success',
                        title: "Baja realizada",
                        confirmButtonText: 'Ok'
                    }).then((result) => {
                            if (result.isConfirmed) {
                                location.reload();
                            };
                        }
                        );
                } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'ERROR. Baja no realizada',
                            text: res[2],
                            footer: '<a href="">Revise datos de entrada y base de datos</a>'
                        }) 
                    } 
            })
            .fail(function(){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Hubo un error al intentar eliminar el registro',
                    footer: '<a href="">Revise  datos de entrada y base de datos/tabla: biblioteca.db / tgr00_codigos</a>'
                })              
            })      
        }
    })    
    return
}
</script>