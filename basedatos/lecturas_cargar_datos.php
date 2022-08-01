<!--
	Tabla de lecturas con sus datos relevantes. Opciones de mantenimiento y borrado

    La tabla se genera y edita dentro de este módulo. La variable $listas está siempre vacia, pero en 
    la información que se pasa a la llamada es toda la información de javascript (comentarios y la tabla rellena) 
    + $listas. 
-->    
<?php
    require_once '../rutinas/recuperar_datos_pantalla.php';  /* Función para informar datos de la pantalla de autor */
    require_once '../rutinas/fechas_tratamientos.php';  /* Función para informar datos de la pantalla de autor */
?>
<div class="table-wrapper">
<table class="table table-hover table-condensed table-borderer border-primary align-middle">
    <thead>
        <tr class="align-items-center fs-4">
            <th class="table-success th_editar th_5">Editar</th>
            <th class="table-danger th_borrar th_5">Eliminar</th>
            <th class="table-secondary th_10">Lector</th>
            <th class="table-secondary th_15">Libro</th>
            <th class="table-secondary th_15">Autor</th>
            <th class="table-secondary th_10">Idioma de lectura</th>
            <th class="table-secondary th_5">Fecha inicio de lectura</th>
            <th class="table-secondary th_5">Fecha fin de lectura</th>
            <th class="table-secondary th_15">Calificación</th>
            <th class="table-secondary th_15">Opinión</th>
        </tr>
    </thead>    

<?php 

$datos_entrada = trim($_POST['param1']);

// Obtener clave para el lector leído 

// No se devuelve nada porque la información ha sido generada ya en javascript y la recoge automáticamente la llamada.

leerDatosLecturas($datos_entrada);


function leerDatosLecturas($datos_entrada) { 

    require_once '../basedatos/tabla_codigos.php';  // tratamiento de todas las operaciones de las tablas de códigos                          
    
    require_once 'connect.php';

    $res = explode("#&", $datos_entrada);

    if ($res[1] == "filtro") {
        $lit_lector = $res[2];  
        $lit_libro = "";
        $lit_autor = "";
    } else {
            $lit_lector = $res[2];
            $lit_libro = $res[3];
            $lit_autor = $res[4];
        }
    
if($lit_lector !== ""){

    $funcion_obtener_clave = 1;
    $tabla = "Lector";
    $datos_entrada = $lit_lector;
    $ind_lectura= "";

    list($ind_error_codigo, $ind_validar_codigo, $mensaje_codigo, $campos_salida) 
                            = tabla_codigos($funcion_obtener_clave, $tabla, $datos_entrada);

    if ($ind_error_codigo == 0) {
        if ($ind_validar_codigo == 1)  {
            $num_lector = 0;   
        } else {
            $res_codigo = explode("#&", $campos_salida);
            $num_lector= $res_codigo[0];  
            }
    } else {
        $num_lector = 0;
        }  
} else {
        $num_lector = 0; 
    }
    
    if($lit_lector == ""){
        if($lit_libro == ""){
            if($lit_autor == ""){
                $sql= "SELECT cGR04_Lector, cGR04_Título, cGR04_Autor, cGR04_IdLectura, cGR04_FIniLectura, 
                              cGR04_FFinLectura, cGR04_Calificacion, cGR04_Opinión, cGR04_TSUltCambio 
                         FROM tgr04_lecturas 
                         ORDER BY cGR04_TSUltCambio DESC";
            } else {
                    $sql= "SELECT cGR04_Lector, cGR04_Título, cGR04_Autor, cGR04_IdLectura, cGR04_FIniLectura, 
                                  cGR04_FFinLectura, cGR04_Calificacion, cGR04_Opinión, cGR04_TSUltCambio 
                            FROM tgr04_lecturas 
                            WHERE cGR04_Autor like '$lit_autor%'
                            ORDER BY cGR04_TSUltCambio DESC";
                }
        } else {
            if($lit_autor == ""){
                $sql= "SELECT cGR04_Lector, cGR04_Título, cGR04_Autor, cGR04_IdLectura, cGR04_FIniLectura, 
                              cGR04_FFinLectura, cGR04_Calificacion, cGR04_Opinión, cGR04_TSUltCambio 
                         FROM tgr04_lecturas 
                         WHERE cGR04_Título like '$lit_libro%'
                         ORDER BY cGR04_Título ASC, cGR04_TSUltCambio DESC";
            } else {
                    $sql= "SELECT cGR04_Lector, cGR04_Título, cGR04_Autor, cGR04_IdLectura, cGR04_FIniLectura, 
                                  cGR04_FFinLectura, cGR04_Calificacion, cGR04_Opinión, cGR04_TSUltCambio 
                            FROM tgr04_lecturas 
                            WHERE cGR04_Título like '$lit_libro%'
                              AND cGR04_Autor like '$lit_autor%'
                            ORDER BY cGR04_Título ASC, cGR04_Autor ASC, cGR04_TSUltCambio DESC";
                }
            }
            
    } else{
        
        if($lit_libro == ""){
            if($lit_autor == ""){
                $sql= "SELECT cGR04_Lector, cGR04_Título, cGR04_Autor, cGR04_IdLectura, cGR04_FIniLectura, 
                              cGR04_FFinLectura, cGR04_Calificacion, cGR04_Opinión, cGR04_TSUltCambio 
                         FROM tgr04_lecturas 
                         WHERE cGR04_Lector like '$num_lector%'
                         ORDER BY cGR04_Lector ASC, cGR04_TSUltCambio DESC";
            } else {
                    $sql= "SELECT cGR04_Lector, cGR04_Título, cGR04_Autor, cGR04_IdLectura, cGR04_FIniLectura, 
                                  cGR04_FFinLectura, cGR04_Calificacion, cGR04_Opinión, cGR04_TSUltCambio 
                            FROM tgr04_lecturas 
                            WHERE cGR04_Lector like '$num_lector%'
                              AND cGR04_Autor like '$lit_autor%'
                            ORDER BY cGR04_Lector, cGR04_Autor ASC, cGR04_TSUltCambio DESC";
                }
        } else {
            if($lit_autor == ""){
                $sql= "SELECT cGR04_Lector, cGR04_Título, cGR04_Autor, cGR04_IdLectura, cGR04_FIniLectura, 
                              cGR04_FFinLectura, cGR04_Calificacion, cGR04_Opinión, cGR04_TSUltCambio 
                         FROM tgr04_lecturas 
                         WHERE cGR04_Lector like '$num_lector%'
                           AND cGR04_Título like '$lit_libro%'
                         ORDER BY cGR04_Lector ASC, cGR04_Título ASC, cGR04_TSUltCambio DESC";
            } else {
                    $sql= "SELECT cGR04_Lector, cGR04_Título, cGR04_Autor, cGR04_IdLectura, cGR04_FIniLectura, 
                                  cGR04_FFinLectura, cGR04_Calificacion, cGR04_Opinión, cGR04_TSUltCambio 
                            FROM tgr04_lecturas 
                            WHERE cGR04_Lector like '$num_lector%'
                              AND cGR04_Título like '$lit_libro%'
                              AND cGR04_Autor like '$lit_autor%'
                            ORDER BY cGR04_Título ASC, cGR04_Autor ASC, cGR04_TSUltCambio DESC";
                }
            }
    }   
    
    $resultados= $dbcon->query($sql); 

    if ($resultados->num_rows == 0)  {
        $listas = "";
    } else{
?>
        <tbody>

<?php  
        
    // Formatear la línea de pantalla
    $listas = "";  
    $datos_pantalla = "";  

    while($fila = $resultados->fetch_assoc()) { 
        $ind_tratar = 0;            // tratar el registro 0- tratar, 1- no tratar

        if ($res[1] == "filtro") {
            $fecha_minima = '0001-01-01';
            $fecha_maxima = '9999-12-31';

            if ($num_lector !== 0 
            && $num_lector !== $fila['cGR04_Lector']) {
                $ind_tratar = 1; 
            }
            if ($res[3] !== "0" 
            && $res[3] !== $fila['cGR04_IdLectura']) {
                $ind_tratar = 1; 
            }
            if ($res[4] !== "" 
            && $res[4] !== $fila['cGR04_Calificacion']) {
                $ind_tratar = 1; 
            }

            if ($res[5] !== $fecha_minima
            &&  $res[6] !== $fecha_maxima){
                if ($fila['cGR04_FIniLectura'] < $res[5] 
                || $fila['cGR04_FIniLectura'] > $res[6]) {
                        $ind_tratar = 1; 
                }
            } else {
                    if ($res[5] !== $fecha_minima
                    ||  $res[6] !== $fecha_maxima){
                        if ($res[5] == $fecha_minima) {
                            if ($fila['cGR04_FIniLectura'] > $res[6]) {
                                $ind_tratar = 1;
                            }
                        } else {
                                if ($fila['cGR04_FIniLectura'] < $res[5]) {
                                    $ind_tratar = 1;
                                }
                            }  
                    }             
                }  

                if ($res[7] !== $fecha_minima
                &&  $res[8] !== $fecha_maxima){
                    if ($fila['cGR04_FFinLectura'] < $res[7] 
                    || $fila['cGR04_FFinLectura'] > $res[8]) {
                            $ind_tratar = 1; 
                    }
                } else {
                        if ($res[7] !== $fecha_minima
                        ||  $res[8] !== $fecha_maxima) {
                            if ($res[7] == $fecha_minima) {
                                if ($fila['cGR04_FFinLectura'] > $res[8]) {
                                    $ind_tratar = 1;
                                }
                            } else {
                                    if ($fila['cGR04_FFinLectura'] < $res[7]) {
                                        $ind_tratar = 1;
                                    }
                                }       
                        } 
                    } 
        }
        
        if ($ind_tratar == 0) {
    // Obtener literales de las claves de los códigos 
        
            // Lector
            $funcion_obtener_descripcion = 2;
            $tabla = "Lector";
            $datos_entrada = $fila['cGR04_Lector'];
            $ind_lectura= "";

            list($ind_error_codigo, $ind_validar_codigo, $mensaje_codigo, $campos_salida) 
                                    = tabla_codigos($funcion_obtener_descripcion, $tabla, $datos_entrada);

            if ($ind_error_codigo == 0) {
                if ($ind_validar_codigo == 1)  {
                    $lector_lit = "Código " +  $fila['cGR04_Lector'] + " no existe.";   
                } else {
                    $res_codigo = explode("#&", $campos_salida);
                    $lector_lit= $res_codigo[0];  
                    }
            } else {
                    $lector_lit=  $mensaje_codigo;
                }  

            // Idioma
            $funcion_obtener_descripcion = 2;
            $tabla = "Idioma";
            $datos_entrada = $fila['cGR04_IdLectura'];
            $ind_lectura= "";

            list($ind_error_codigo, $ind_validar_codigo, $mensaje_codigo, $campos_salida) 
                                    = tabla_codigos($funcion_obtener_descripcion, $tabla, $datos_entrada);

            if ($ind_error_codigo == 0) {
                if ($ind_validar_codigo == 1)  {
                    $idioma_lit = "Código " +  $fila['cGR04_IdLectura'] + " no existe.";   
                } else {
                    $res_codigo = explode("#&", $campos_salida);
                    $idioma_lit= $res_codigo[0];  
                    }
            } else {
                    $idioma_lit=  $mensaje_codigo;
                }  

            // Fecha de inicio de lectura
            $funcion_validar_fecha = 1;
            list($ind_validar, $mensaje, $campos_salida) = fechas($funcion_validar_fecha, $fila['cGR04_FIniLectura']);
            if ($ind_validar == 0) {
                $fechas_elemento = explode("#&", $campos_salida);
                $fecha_inilectura_DD_MM_SSAA = $fechas_elemento[2];
            } else {
                $fecha_inilectura_DD_MM_SSAA = $mensaje;
                }   
                
            // Fecha de fin de lectura
            $funcion_validar_fecha = 1;
            list($ind_validar, $mensaje, $campos_salida) = fechas($funcion_validar_fecha, $fila['cGR04_FFinLectura']);
            if ($ind_validar == 0) {
                $fechas_elemento = explode("#&", $campos_salida);
                $fecha_finlectura_DD_MM_SSAA = $fechas_elemento[2];
            } else {
                $fecha_finlectura_DD_MM_SSAA = $mensaje;
                }     

            // Limitar la presentación de la opinión a un tamaño máximo
            if ($fila['cGR04_Opinión'] == "") {
                $lit_opinion = "";
            } else {
                    $longitud_maxima = 20;    
                    if (strlen($fila['cGR04_Opinión']) > $longitud_maxima) {
                        $lit_opinion = substr($fila['cGR04_Opinión'], 0, $longitud_maxima) . " .....";
                    } else {
                            $lit_opinion = $fila['cGR04_Opinión'];
                        }
                }

            $datos_pantalla = "Lectura" . "#&" . $lector_lit . "#&" . $fila["cGR04_Título"] 
                . "#&" . $fila["cGR04_Autor"]  . "#&" . $idioma_lit . "#&" . $fila["cGR04_FIniLectura"]
                . "#&" . $fila["cGR04_FFinLectura"] . "#&" . $fila["cGR04_Calificacion"] 
                . "#&" . $fila["cGR04_Opinión"] . "#&" . $fila["cGR04_TSUltCambio"];     
    ?>    
                
            <tr class="align-items-center fs-5">;
                
                <td class='td_editar'> 
                    <button type="button"  class='d-inline-flex btn btn-info btn-outline-success  mb-0 p-0 text-light 
                                    fs-4' data-bs-toggle="modal"  data-bs-target="#lecturaEdicion" 
                            onclick="lecturaRecuperarDatosPantalla('<?php echo $datos_pantalla ?>')"> 
                        
                        <svg class="bi" width="30" height="30" fill="currentColor">
                            <use xlink:href="bootstrap-5.1.3\main\iconos\bootstrap-icons.svg#pencil"/>
                        </svg>   
                                            
                    </button>
                </td>
                
                <td class='td_borrar'> 
                    <button type="button" id= "eliminar_datos" class='d-inline-flex btn btn-info btn-outline-success
                                    mb-0 p-0 text-light fs-4' 
                            onclick="eliminarRegistro('<?php echo $datos_pantalla ?>')"> 
                        
                        <svg class="bi" width="30" height="30" fill="currentColor">
                            <use xlink:href="bootstrap-5.1.3\main\iconos\bootstrap-icons.svg#trash"/>
                        </svg>   
                    </button>
                </td>
                
                <td> <?php echo $lector_lit ?> </td>";
                <td> <?php echo $fila['cGR04_Título'] ?> </td>";
                <td> <?php echo $fila['cGR04_Autor'] ?> </td>";
                <td> <?php echo $idioma_lit ?> </td>";
                <td class='td_centrar'> <?php echo $fecha_inilectura_DD_MM_SSAA ?> </td>";       
                <td class='td_centrar'> <?php echo $fecha_finlectura_DD_MM_SSAA ?> </td>";
                <td class='td_centrar'> <?php echo $fila['cGR04_Calificacion'] ?> </td>";
                <td> <?php echo $lit_opinion  ?> </td>";        
                
            </tr>
    
    <?php } }?>
    
    </tbody>
</table>    

<?php     
    }  
    
return [$listas];

}  

?>
</div>
