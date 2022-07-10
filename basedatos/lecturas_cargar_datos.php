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
            <th class="table-secondary th_15">Opinión</th>
        </tr>
    </thead>    

<?php 

$lector = trim($_POST['param1']);
$libro = trim($_POST['param2']);
$autor = trim($_POST['param3']);


// No se devuelve nada porque la información ha sido generada ya en javascript y la recoge automáticamente la llamada.

leerDatosLecturas($lector, $libro, $autor);

function leerDatosLecturas($lit_lector, $lit_libro, $lit_autor) { 

    require_once '../basedatos/tabla_codigos.php';  // tratamiento de todas las operaciones de las tablas de códigos                          
    
    require_once 'connect.php';
    
    if($lit_lector == ""){
        if($lit_libro == ""){
            if($lit_autor == ""){
                $sql= "SELECT cGR04_Lector, cGR04_Título, cGR04_Autor, cGR04_IdLectura, cGR04_FIniLectura, 
                              cGR04_FFinLectura, cGR04_Opinión, cGR04_TSUltCambio 
                         FROM tgr04_lecturas 
                         ORDER BY cGR04_TSUltCambio";
            } else {
                    $sql= "SELECT cGR04_Lector, cGR04_Título, cGR04_Autor, cGR04_IdLectura, cGR04_FIniLectura, 
                                  cGR04_FFinLectura, cGR04_Opinión, cGR04_TSUltCambio 
                            FROM tgr04_lecturas 
                            WHERE cGR04_Autor like '$lit_autor%'
                            ORDER BY cGR04_TSUltCambio";
                }
        } else {
            if($lit_autor == ""){
                $sql= "SELECT cGR04_Lector, cGR04_Título, cGR04_Autor, cGR04_IdLectura, cGR04_FIniLectura, 
                              cGR04_FFinLectura, cGR04_Opinión, cGR04_TSUltCambio 
                         FROM tgr04_lecturas 
                         WHERE cGR04_Título like '$lit_libro%'
                         ORDER BY cGR04_Título, cGR04_TSUltCambio";
            } else {
                    $sql= "SELECT cGR04_Lector, cGR04_Título, cGR04_Autor, cGR04_IdLectura, cGR04_FIniLectura, 
                                  cGR04_FFinLectura, cGR04_Opinión, cGR04_TSUltCambio 
                            FROM tgr04_lecturas 
                            WHERE cGR04_Título like '$lit_libro%'
                              AND cGR04_Autor like '$lit_autor%'
                            ORDER BY cGR04_Título, cGR04_Autor, cGR04_TSUltCambio";
                }
            }
            
    } else{
        if($lit_libro == ""){
            if($lit_autor == ""){
                $sql= "SELECT cGR04_Lector, cGR04_Título, cGR04_Autor, cGR04_IdLectura, cGR04_FIniLectura, 
                              cGR04_FFinLectura, cGR04_Opinión, cGR04_TSUltCambio 
                         FROM tgr04_lecturas 
                         WHERE cGR04_Lector like '$lit_lector%'
                         ORDER BY cGR04_Lector, cGR04_TSUltCambio";
            } else {
                    $sql= "SELECT cGR04_Lector, cGR04_Título, cGR04_Autor, cGR04_IdLectura, cGR04_FIniLectura, 
                                  cGR04_FFinLectura, cGR04_Opinión, cGR04_TSUltCambio 
                            FROM tgr04_lecturas 
                            WHERE cGR04_Lector like '$lit_lector%'
                              AND cGR04_Autor like '$lit_autor%'
                            ORDER BY cGR04_Lector, cGR04_Autor, cGR04_TSUltCambio";
                }
        } else {
            if($lit_autor == ""){
                $sql= "SELECT cGR04_Lector, cGR04_Título, cGR04_Autor, cGR04_IdLectura, cGR04_FIniLectura, 
                              cGR04_FFinLectura, cGR04_Opinión, cGR04_TSUltCambio 
                         FROM tgr04_lecturas 
                         WHERE cGR04_Lector like '$lit_lector%'
                           AND cGR04_Título like '$lit_libro%'
                         ORDER BY cGR04_Lector, cGR04_Título, cGR04_TSUltCambio";
            } else {
                    $sql= "SELECT cGR04_Lector, cGR04_Título, cGR04_Autor, cGR04_IdLectura, cGR04_FIniLectura, 
                                  cGR04_FFinLectura, cGR04_Opinión, cGR04_TSUltCambio 
                            FROM tgr04_lecturas 
                            WHERE cGR04_Lector like '$lit_lector%'
                              AND cGR04_Título like '$lit_libro%'
                              AND cGR04_Autor like '$lit_autor%'
                            ORDER BY cGR04_Título, cGR04_Autor, cGR04_TSUltCambio";
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
    // Obtener literales de las claves de los códigos 
        // Idioma
        $funcion_obtener_descripcion = 2;
        $tabla = "Idioma";
        $datos_entrada = $fila['cGR04_IdLectura'];
        $ind_lectura= "";
        $pais_nac_lit= "";   

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

        $datos_pantalla = "Lectura" . "#&" . $fila["cGR04_Lector"] . "#&" . $fila["cGR04_Título"] 
            . "#&" . $fila["cGR04_Autor"]  . "#&" . $idioma_lit . "#&" . $fila["cGR04_FIniLectura"]
            . "#&" . $fila["cGR04_FFinLectura"] . "#&" . $fila["cGR04_Opinión"] . "#&" . $fila["cGR02_TSUltCambio"];     
?>    
            
        <tr class="align-items-center fs-5">;
            
            <td class='td_editar'> 
                <button type="button"  class='d-inline-flex btn btn-info btn-outline-success  mb-0 p-0 text-light 
                                fs-4' data-bs-toggle="modal"  data-bs-target="#autorEdicion" 
                        onclick="autorRecuperarDatosPantalla('<?php echo $datos_pantalla ?>')"> 
                    
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
            
        $datos_pantalla = "Lectura" . "#&" . $fila["cGR04_Lector"] . "#&" . $fila["cGR04_Título"]  
            . "#&" . $idioma_lit . "#&" . $fila["cGR04_FIniLectura"]. "#&" . $fila["cGR04_FFinLectura"]
            . "#&" . $fila["cGR04_Opinión"] . "#&" . $fila["cGR02_TSUltCambio"];  
            <td> <?php echo $fila['cGR04_Lector'] ?> </td>";
            <td> <?php echo $fila['cGR04_Título'] ?> </td>";
            <td> <?php echo $fila['cGR04_Autor'] ?> </td>";
            <td> <?php echo $idioma_lit ?> </td>";
            <td class='td_centrar'> <?php echo $fecha_inilectura_DD_MM_SSAA ?> </td>";       
            <td class='td_centrar'> <?php echo $fecha_finlectura_DD_MM_SSAA ?> </td>";
            <td> <?php echo $lit_opinion  ?> </td>";        
            
        </tr>
    
    <?php } ?>
    
    </tbody>
</table>    

<?php     
    }  
    
return [$listas];

}  

?>
</div>
