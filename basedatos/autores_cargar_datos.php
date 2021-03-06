<!--
	Tabla de autores con sus datos relevantes. Opciones de mantenimiento y borrado

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
            <th class="table-secondary th_10">Autor</th>
            <th class="table-secondary th_10">Nacionalidad</th>
            <th class="table-secondary th_10">Corriente literaria</th>
            <th class="table-secondary th_5">Fecha de nacimiento</th>
            <th class="table-secondary th_10">Lugar nacimiento</th>
            <th class="table-secondary th_10">País nacimiento</th>
            <th class="table-secondary th_5">Fecha de fallecimiento</th>
            <th class="table-secondary th_10">Lugar fallecimiento</th>
            <th class="table-secondary th_10">País fallecimiento</th>
            <th class="table-secondary th_10">Información WEB</th>
        </tr>
    </thead>    

<?php 

$datos_entrada = trim($_POST['param1']);

// No se devuelve nada porque la información ha sido generada ya en javascript y la recoge automáticamente la llamada.

leerDatosAutores($datos_entrada);

function leerDatosAutores($datos_entrada) { 

    require_once '../basedatos/tabla_codigos.php';  // tratamiento de todas las operaciones de las tablas de códigos                          
    
    require_once 'connect.php';

    $res = explode("#&", $datos_entrada);

    if ($res[1] == "filtro") {
        $lit_autor = "";  
    } else {
            $lit_autor = $res[2];
        }
    
    if($lit_autor == ""){
            $sql= "SELECT cGR02_Autor, cGR02_Foto, cGR02_FNacimiento, cGR02_FDefunción, cGR02_LNacimiento, 
                          cGR02_PNacimiento, cGR02_LFallecimiento, cGR02_PFallecimiento,
                          cGR02_Nacionalidad, cGR02_CLiteraria, cGR02_WEB, cGR02_TSUltCambio
                    FROM tgr02_autores
                    ORDER BY cGR02_Autor";
    } else{
            $sql= "SELECT cGR02_Autor, cGR02_Foto, cGR02_FNacimiento, cGR02_FDefunción, cGR02_LNacimiento, 
                          cGR02_PNacimiento, cGR02_LFallecimiento, cGR02_PFallecimiento,
                          cGR02_Nacionalidad, cGR02_CLiteraria, cGR02_WEB, cGR02_TSUltCambio
                    FROM tgr02_autores
                    WHERE cGR02_Autor like '$lit_autor%'
                    ORDER BY cGR02_Autor";
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

            if ($res[2] !== "0" 
            && $res[2] !== $fila['cGR02_Nacionalidad']) {
                $ind_tratar = 1; 
            }
            if ($res[3] !== "0" 
            && $res[3] !== $fila['cGR02_CLiteraria']) {
                $ind_tratar = 1; 
            }
            if ($res[4] !== "0" 
            && $res[4] !== $fila['cGR02_PNacimiento']) {
                $ind_tratar = 1; 
            }
            if ($res[7] !== "0" 
            && $res[7] !== $fila['cGR02_PFallecimiento']) {
                $ind_tratar = 1; 
            }

            if ($res[5] !== $fecha_minima
            &&  $res[6] !== $fecha_maxima){
                if ($fila['cGR02_FNacimiento'] < $res[5] 
                || $fila['cGR02_FNacimiento'] > $res[6]) {
                        $ind_tratar = 1; 
                }
            } else {
                    if ($res[5] == $fecha_minima) {
                        if ($fila['cGR02_FNacimiento'] > $res[6]) {
                            $ind_tratar = 1;
                        }
                    } else {
                            if ($fila['cGR02_FNacimiento'] < $res[5]) {
                                $ind_tratar = 1;
                            }
                        }       
                }  

                if ($res[8] !== $fecha_minima
                &&  $res[9] !== $fecha_maxima){
                    if ($fila['cGR02_FDefunción'] < $res[8] 
                    || $fila['cGR02_FDefunción'] > $res[9]) {
                            $ind_tratar = 1; 
                    }
                } else {
                        if ($res[8] == $fecha_minima) {
                            if ($fila['cGR02_FDefunción'] > $res[9]) {
                                $ind_tratar = 1;
                            }
                        } else {
                                if ($fila['cGR02_FDefunción'] < $res[8]) {
                                    $ind_tratar = 1;
                                }
                            }       
                    }  
        }
        
        if ($ind_tratar == 0) {
    // Obtener literales de las claves de los códigos 
        // Nacionalidad
            $funcion_obtener_descripcion = 2;
            $tabla = "Nacionalidad";
            $datos_entrada = $fila['cGR02_Nacionalidad'];
            $ind_lectura= "";
            $nacionalidad_lit= "";   

            list($ind_error_codigo, $ind_validar_codigo, $mensaje_codigo, $campos_salida) 
                                    = tabla_codigos($funcion_obtener_descripcion, $tabla, $datos_entrada);

            if ($ind_error_codigo == 0) {
                if ($ind_validar_codigo == 1)  {
                    $nacionalidad_lit = "Código " +  $fila['cGR02_Nacionalidad'] + " no existe.";   
                } else {
                    $res_codigo = explode("#&", $campos_salida);
                    $nacionalidad_lit= $res_codigo[0];  
                    }
            } else {
                    $nacionalidad_lit=  $mensaje_codigo;
                }
            
            // Fecha de nacimiento
            $funcion_validar_fecha = 1;
            list($ind_validar, $mensaje, $campos_salida) = fechas($funcion_validar_fecha, $fila['cGR02_FNacimiento']);
            if ($ind_validar == 0) {
                $fechas_elemento = explode("#&", $campos_salida);
                $fecha_nacimiento_DD_MM_SSAA = $fechas_elemento[2];
            } else {
                $fecha_nacimiento_DD_MM_SSAA = $mensaje;
                }   
                
            // Fecha de fallecimiento
            $funcion_validar_fecha = 1;
            list($ind_validar, $mensaje, $campos_salida) = fechas($funcion_validar_fecha, $fila['cGR02_FDefunción']);
            if ($ind_validar == 0) {
                $fechas_elemento = explode("#&", $campos_salida);
                $fecha_fallecimiento_DD_MM_SSAA = $fechas_elemento[2];
            } else {
                $fecha_fallecimiento_DD_MM_SSAA = $mensaje;
                }     

                // País de nacimiento
            $funcion_obtener_descripcion = 2;
            $tabla = "País";
            $datos_entrada = $fila['cGR02_PNacimiento'];
            $ind_lectura= "";
            $pais_nac_lit= "";   

            list($ind_error_codigo, $ind_validar_codigo, $mensaje_codigo, $campos_salida) 
                                    = tabla_codigos($funcion_obtener_descripcion, $tabla, $datos_entrada);

            if ($ind_error_codigo == 0) {
                if ($ind_validar_codigo == 1)  {
                    $pais_nac_lit = "Código " +  $fila['cGR02_PNacimiento'] + " no existe.";   
                } else {
                    $res_codigo = explode("#&", $campos_salida);
                    $pais_nac_lit= $res_codigo[0];  
                    }
            } else {
                    $pais_nac_lit=  $mensaje_codigo;
                }  

            // País de fallecimiento
            $funcion_obtener_descripcion = 2;
            $tabla = "País";
            $datos_entrada = $fila['cGR02_PFallecimiento'];
            $ind_lectura= "";
            $pais_fal_lit= "";   

            list($ind_error_codigo, $ind_validar_codigo, $mensaje_codigo, $campos_salida) 
                                    = tabla_codigos($funcion_obtener_descripcion, $tabla, $datos_entrada);

            if ($ind_error_codigo == 0) {
                if ($ind_validar_codigo == 1)  {
                    $pais_fal_lit = "Código " +  $fila['cGR02_PFallecimiento'] + " no existe.";   
                } else {
                    $res_codigo = explode("#&", $campos_salida);
                    $pais_fal_lit= $res_codigo[0];  
                    }
            } else {
                    $pais_fal_lit=  $mensaje_codigo;
                }  
            // Corriente literaria
            $funcion_obtener_descripcion = 2;
            $tabla = "CLiteraria";
            $datos_entrada = $fila['cGR02_CLiteraria'];
            $ind_lectura= "";
            $cliteraria_lit= "";   

            list($ind_error_codigo, $ind_validar_codigo, $mensaje_codigo, $campos_salida) 
                                    = tabla_codigos($funcion_obtener_descripcion, $tabla, $datos_entrada);

            if ($ind_error_codigo == 0) {
                if ($ind_validar_codigo == 1)  {
                    $cliteraria_lit = "Código " +  $fila['cGR02_CLiteraria'] + " no existe.";   
                } else {
                    $res_codigo = explode("#&", $campos_salida);
                    $cliteraria_lit = $res_codigo[0];  
                    }
            } else {
                    $cliteraria_lit =  $mensaje_codigo;
                }
            
            $datos_pantalla = "Autor" . "#&" . $fila["cGR02_Autor"] . "#&" . $fila["cGR02_Foto"] 
                . "#&" . $fila["cGR02_FNacimiento"] . "#&" . $fila["cGR02_FDefunción"] 
                . "#&" . $fila["cGR02_LNacimiento"] . "#&" . $pais_nac_lit . "#&" . $fila["cGR02_LFallecimiento"]
                . "#&" . $pais_fal_lit . "#&" . $nacionalidad_lit . "#&" . $cliteraria_lit 
                . "#&" . $fila["cGR02_WEB"] . "#&" . $fila["cGR02_TSUltCambio"];     
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
                
                <td> <?php echo $fila['cGR02_Autor'] ?> </td>";
                <td> <?php echo $nacionalidad_lit ?> </td>";
                <td> <?php echo $cliteraria_lit ?> </td>";
                <td class='td_centrar'> <?php echo $fecha_nacimiento_DD_MM_SSAA ?> </td>";
                <td> <?php echo $fila['cGR02_LNacimiento'] ?> </td>";
                <td> <?php echo $pais_nac_lit  ?> </td>";        
                <td class='td_centrar'> <?php echo $fecha_fallecimiento_DD_MM_SSAA ?> </td>";
                <td> <?php echo $fila['cGR02_LFallecimiento'] ?> </td>";
                <td> <?php echo $pais_fal_lit  ?> </td>";        
                <td> <?php echo $fila['cGR02_WEB'] ?> </td>";
                
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
