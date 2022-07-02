<!--
	Tabla de libros con sus datos relevantes. Opciones de mantenimiento y borrado

    La tabla se genera y edita dentro de este módulo. La variable $listas está siempre vacia, pero en 
    la información que se pasa a la llamada es toda la información de javascript (comentarios y la tabla rellena) 
    + $listas. 
-->    
<?php
    require_once '../rutinas/recuperar_datos_pantalla.php';  /* Función para informar datos de la pantalla de autor */
    require_once '../rutinas/fechas_tratamientos.php';  /* Función para informar datos de la pantalla de autor */
?>
<div class="table-wrapper">
<table class="table table-hover table-condensed table-borderer border-primary">
    <thead>
        <tr class="align-items-center fs-4">
            <th class="table-success th_editar th_5">Editar</th>
            <th class="table-danger th_borrar th_5">Eliminar</th>
            <th class="table-secondary th_10">Título</th>
            <th class="table-secondary th_10">Autor</th>
            <th class="table-secondary th_5">Editorial</th>
            <th class="table-secondary th_5">Fecha de publicación</th>
            <th class="table-secondary th_5">Fecha de adquisición</th>
            <th class="table-secondary th_5">Idioma</th>
            <th class="table-secondary th_5">Soporte físico</th>
            <th class="table-secondary th_5">Género literario</th>
            <th class="table-secondary th_5">Propietario</th>
            <th class="table-secondary th_10">Sinopsis</th>
            <th class="table-secondary th_5">Situación del libro</th>
            <th class="table-secondary th_5">Quién (prestado / regalado)</th>
            <th class="table-secondary th_5">Fecha préstamo / regalo</th>
            <th class="table-secondary th_10">Información WEB</th>
        </tr>
    </thead>    

<?php 

$buscar = trim($_POST['param1']);

// No se devuelve nada porque la información ha sido generada ya en javascript y la recoge automáticamente la llamada.

leerDatosLibros($buscar);

function leerDatosLibros($lit_libro) { 

    require_once '../basedatos/tabla_codigos.php';  // tratamiento de todas las operaciones de las tablas de códigos                          
    
    require_once 'connect.php';
    
    if($lit_libro == ""){
            $sql= "SELECT cGR03_Título, cGR03_Autor, cGR03_Foto, cGR03_Editorial, cGR03_FPublicación, 
                          cGR03_FAdquisición, cGR03_Idioma, cGR03_Soporte, cGR03_Género, cGR03_Propietario, 
                          cGR03_Sinopsis, cGR03_Estado_S, cGR03_Estado_Q_U, cGR03_Estado_F, cGR03_WEB, 
                          cGR03_TSUltCambio
                    FROM tgr03_libros
                    ORDER BY cGR03_Título, cGR03_Autor";
    } else{
            $sql= "SELECT cGR03_Título, cGR03_Autor, cGR03_Foto, cGR03_Editorial, cGR03_FPublicación, 
                          cGR03_FAdquisición, cGR03_Idioma, cGR03_Soporte, cGR03_Género, cGR03_Propietario, 
                          cGR03_Sinopsis, cGR03_Estado_S, cGR03_Estado_Q_U, cGR03_Estado_F, cGR03_WEB, 
                          cGR03_TSUltCambio
                    FROM tgr03_libros
                    WHERE cGR03_Título like '$lit_libro%'";
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
        // Editorial
        $funcion_obtener_descripcion = 2;
        $tabla = "Editorial";
        $datos_entrada = $fila['cGR03_Editorial'];
        $ind_lectura= "";
        $editorial_lit= "";   

        list($ind_error_codigo, $ind_validar_codigo, $mensaje_codigo, $campos_salida) 
                                = tabla_codigos($funcion_obtener_descripcion, $tabla, $datos_entrada);

        if ($ind_error_codigo == 0) {
            if ($ind_validar_codigo == 1)  {
                $editorial_lit = "Código " +  $fila['cGR03_Editorial'] + " no existe.";   
            } else {
                $res_codigo = explode("#&", $campos_salida);
                $editorial_lit= $res_codigo[0];  
                }
        } else {
                $editorial_lit=  $mensaje_codigo;
            }
        
        // Fecha de publicación
        $funcion_validar_fecha = 1;
        list($ind_validar, $mensaje, $campos_salida) = fechas($funcion_validar_fecha, $fila['cGR03_FPublicación']);
        if ($ind_validar == 0) {
            $fechas_elemento = explode("#&", $campos_salida);
            $fecha_publicacion_DD_MM_SSAA = $fechas_elemento[2];
        } else {
            $fecha_publicacion_DD_MM_SSAA = $mensaje;
            }   
            
        // Fecha de adquisición
        $funcion_validar_fecha = 1;
        list($ind_validar, $mensaje, $campos_salida) = fechas($funcion_validar_fecha, $fila['cGR03_FAdquisición']);
        if ($ind_validar == 0) {
            $fechas_elemento = explode("#&", $campos_salida);
            $fecha_adquisicion_DD_MM_SSAA = $fechas_elemento[2];
        } else {
            $fecha_adquisicion_DD_MM_SSAA = $mensaje;
            }     

        // Idioma
        $funcion_obtener_descripcion = 2;
        $tabla = "Idioma";
        $datos_entrada = $fila['cGR03_Idioma'];
        $ind_lectura= "";
        $pais_nac_lit= "";   

        list($ind_error_codigo, $ind_validar_codigo, $mensaje_codigo, $campos_salida) 
                                = tabla_codigos($funcion_obtener_descripcion, $tabla, $datos_entrada);

        if ($ind_error_codigo == 0) {
            if ($ind_validar_codigo == 1)  {
                $idioma_lit = "Código " +  $fila['cGR03_Idioma'] + " no existe.";   
            } else {
                $res_codigo = explode("#&", $campos_salida);
                $idioma_lit= $res_codigo[0];  
                }
        } else {
                $idioma_lit=  $mensaje_codigo;
            }  

        // Soporte del libro
        $funcion_obtener_descripcion = 2;
        $tabla = "Soplib";
        $datos_entrada = $fila['cGR03_Soporte'];
        $ind_lectura= "";
        $soporte_lit= "";   

        list($ind_error_codigo, $ind_validar_codigo, $mensaje_codigo, $campos_salida) 
                                = tabla_codigos($funcion_obtener_descripcion, $tabla, $datos_entrada);

        if ($ind_error_codigo == 0) {
            if ($ind_validar_codigo == 1)  {
                $pais_fal_lit = "Código " +  $fila['cGR03_Soporte'] + " no existe.";   
            } else {
                $res_codigo = explode("#&", $campos_salida);
                $soporte_lit= $res_codigo[0];  
                }
        } else {
                $soporte_lit=  $mensaje_codigo;
            }

        // Género literario
        $funcion_obtener_descripcion = 2;
        $tabla = "GenLit";
        $datos_entrada = $fila['cGR03_Género'];
        $ind_lectura= "";
        $gliterario_lit= "";   

        list($ind_error_codigo, $ind_validar_codigo, $mensaje_codigo, $campos_salida) 
                                = tabla_codigos($funcion_obtener_descripcion, $tabla, $datos_entrada);

        if ($ind_error_codigo == 0) {
            if ($ind_validar_codigo == 1)  {
                $gliterario_lit = "Código " +  $fila['cGR03_Género'] + " no existe.";   
            } else {
                $res_codigo = explode("#&", $campos_salida);
                $gliterario_lit = $res_codigo[0];  
                }
        } else {
                $gliterario_lit =  $mensaje_codigo;
            }

        // Estado de situación del libro
        $funcion_obtener_descripcion = 2;
        $tabla = "SitLib";
        $datos_entrada = $fila['cGR03_Estado_S'];
        $ind_lectura= "";
        $sitlibro_lit= "";   

        list($ind_error_codigo, $ind_validar_codigo, $mensaje_codigo, $campos_salida) 
                                = tabla_codigos($funcion_obtener_descripcion, $tabla, $datos_entrada);

        if ($ind_error_codigo == 0) {
            if ($ind_validar_codigo == 1)  {
                $sitlibro_lit = "Código " +  $fila['cGR03_Estado_S'] + " no existe.";   
            } else {
                $res_codigo = explode("#&", $campos_salida);
                $sitlibro_lit = $res_codigo[0];  
                }
        } else {
                $sitlibro_lit =  $mensaje_codigo;
            }
            
        // Fecha de entrega/regalo
        $funcion_validar_fecha = 1;
        list($ind_validar, $mensaje, $campos_salida) = fechas($funcion_validar_fecha, $fila['cGR03_Estado_F']);
        if ($ind_validar == 0) {
            $fechas_elemento = explode("#&", $campos_salida);
            $fecha_estado_DD_MM_SSAA = $fechas_elemento[2];
        } else {
            $fecha_estado_DD_MM_SSAA = $mensaje;
            }  
        
        // Limitar la presentación de la sinopsis a un tamaño máximo
        if ($fila['cGR03_Sinopsis'] == "") {
            $lit_sinopsis = "";
        } else {
                $longitud_maxima = 20;    
                if (strlen($fila['cGR03_Sinopsis']) > $longitud_maxima) {
                    $lit_sinopsis = substr($fila['cGR03_Sinopsis'], 0, $longitud_maxima) . " .....";
                } else {
                        $lit_sinopsis = $fila['cGR03_Sinopsis'];
                    }
            }
        
        $datos_pantalla = "Libro" . "#&" . $fila["cGR03_Título"] . "#&" . $fila["cGR03_Autor"] 
            . "#&" . $fila["cGR03_Foto"] . "#&" . $editorial_lit . "#&" . $fila["cGR03_FPublicación"]
            . "#&" . $fila["cGR03_FAdquisición"]  . "#&" . $idioma_lit . "#&" . $soporte_lit 
            . "#&" . $gliterario_lit . "#&" . $fila["cGR03_Propietario"] . "#&" . $fila["cGR03_Sinopsis"] 
            . "#&" . $sitlibro_lit. "#&" . $fila["cGR03_Estado_Q_U"] . "#&" . $fila["cGR03_Estado_F"] 
            . "#&" . $fila["cGR03_WEB"]. "#&" . $fila["cGR03_TSUltCambio"];     
?>    
            
        <tr class="align-items-center fs-5">;
            
            <td class='td_editar'> 
                <button type="button"  class='d-inline-flex btn btn-info btn-outline-success  mb-0 p-0 text-light 
                                fs-4' data-bs-toggle="modal"  data-bs-target="#libroEdicion" 
                        onclick="libroRecuperarDatosPantalla('<?php echo $datos_pantalla ?>')"> 
                    
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

            <td> <?php echo $fila['cGR03_Título'] ?> </td>";
            <td> <?php echo $fila['cGR03_Autor'] ?> </td>";
            <td> <?php echo $editorial_lit ?> </td>";
            <td class='td_centrar'> <?php echo $fecha_publicacion_DD_MM_SSAA ?> </td>";
            <td class='td_centrar'> <?php echo $fecha_adquisicion_DD_MM_SSAA ?> </td>";
            <td> <?php echo $idioma_lit ?> </td>";
            <td> <?php echo $soporte_lit ?> </td>";
            <td> <?php echo $gliterario_lit ?> </td>";
            <td> <?php echo $fila['cGR03_Propietario'] ?> </td>";
            <td> <?php echo $lit_sinopsis ?> </td>";
            <td> <?php echo $sitlibro_lit  ?> </td>";        
            <td> <?php echo $fila['cGR03_Estado_Q_U'] ?> </td>";
            <td class='td_centrar'> <?php echo $fecha_estado_DD_MM_SSAA  ?> </td>";        
            <td> <?php echo $fila['cGR03_WEB'] ?> </td>";
            
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
