<!--
	Tabla de autores con sus datos relevantes. Opciones de mantenimiento y borrado

    La tabla se genera y edita dentro de este módulo. La variable $listas está siempre vacia, pero en 
    la información que se pasa a la llamada es toda la información de javascript (comentarios y la tabla rellena) 
    + $listas. 
-->    
<?php
    require_once '../rutinas/recuperar_datos_pantalla.php';  /* Función para informar datos de la pantalla de autor */
?>
<div class="table-wrapper">
<table class="table table-hover table-condensed table-borderer border-primary align-middle">
    <thead>
        <tr class="align-items-center fs-4">
            <th class="table-secondary">Autor</th>
            <th class="table-secondary">Nacionalidad</th>
            <th class="table-secondary">Lugar nacimiento</th>
            <th class="table-secondary">País nacimiento</th>
            <th class="table-secondary">Información WEB</th>
            <th class="table-success">Editar</th>
            <th class="table-danger">Eliminar</th>
        </tr>
    </thead>    

<?php 

$buscar = trim($_POST['param1']);

// No se devuelve nada porque la información ha sido generada ya en javascript y la recoge automáticamente la llamada.

leerDatosAutores($buscar);

function leerDatosAutores($lit_autor) { 

    require_once '../basedatos/tabla_codigos.php';  // tratamiento de todas las operaciones de las tablas de códigos                          
    
    require_once 'connect.php';
    
    if($lit_autor == ""){
            $sql= "SELECT cGR02_Autor, cGR02_Foto, cGR02_FNacimiento, cGR02_FDefunción, cGR02_LNacimiento, 
                          cGR02_PNacimiento, cGR02_LFallecimiento, cGR02_PFallecimiento,
                          cGR02_Nacionalidad, cGR02_CLiteraria, cGR02_WEB, cGR02_TSUltCambio
                        FROM tgr02_autores
                        order by cGR02_Autor";
    } else{
            $sql= "SELECT cGR02_Autor, cGR02_Foto, cGR02_FNacimiento, cGR02_FDefunción, cGR02_LNacimiento, 
                          cGR02_PNacimiento, cGR02_LFallecimiento, cGR02_PFallecimiento,
                          cGR02_Nacionalidad, cGR02_CLiteraria, cGR02_WEB, cGR02_TSUltCambio
                        FROM tgr02_autores
                        WHERE cGR02_Autor like '$lit_autor%'";
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
        $cliteraria= "";   

        list($ind_error_codigo, $ind_validar_codigo, $mensaje_codigo, $campos_salida) 
                                = tabla_codigos($funcion_obtener_descripcion, $tabla, $datos_entrada);

        if ($ind_error_codigo == 0) {
            if ($ind_validar_codigo == 1)  {
                $cliteraria = "Código " +  $fila['cGR02_CLiteraria'] + " no existe.";   
            } else {
                $res_codigo = explode("#&", $campos_salida);
                $cliteraria= $res_codigo[0];  
                }
        } else {
                $cliteraria=  $mensaje_codigo;
            }
        
        $datos_pantalla = "Autor" . "#&" . $fila["cGR02_Autor"] . "#&" . $fila["cGR02_Foto"] 
            . "#&" . $fila["cGR02_FNacimiento"]. "#&" . $fila["cGR02_FDefunción"] . "#&" . $fila["cGR02_LNacimiento"]
            . "#&" . $pais_nac_lit . "#&" . $fila["cGR02_LFallecimiento"]. "#&" . $pais_fal_lit 
            . "#&" . $nacionalidad_lit . "#&" . $cliteraria . "#&" . $fila["cGR02_WEB"]
            . "#&" . $fila["cGR02_TSUltCambio"];     
?>    
            
        <tr class="align-items-center fs-5">;
            <td> <?php echo $fila['cGR02_Autor'] ?> </td>";
            <td> <?php echo $nacionalidad_lit ?> </td>";
            <td> <?php echo $fila['cGR02_LNacimiento'] ?> </td>";
            <td> <?php echo $pais_nac_lit  ?> </td>";             
            <td> <?php echo $fila['cGR02_WEB'] ?> </td>";
            <td> 
                <button type="button"  class='d-inline-flex btn btn-info btn-outline-success  mb-0 p-0 text-light 
                                fs-4' data-bs-toggle="modal"  data-bs-target="#autorEdicion"
                                 onclick="autorRecuperarDatosPantalla('<?php echo $datos_pantalla ?>')"> 
                    
                    <svg class="bi" width="30" height="30" fill="currentColor">
                        <use xlink:href="bootstrap-5.1.3\main\iconos\bootstrap-icons.svg#pencil"/>
                    </svg>   
                                        
                </button>
            </td>
            <td> 
                <button class='d-inline-flex btn btn-info btn-outline-success mb-0 p-0 
                                text-light fs-4' data-bs-target="#autorEdición"> 
                    
                    <svg class="bi" width="30" height="30" fill="currentColor">
                        <use xlink:href="bootstrap-5.1.3\main\iconos\bootstrap-icons.svg#trash"/>
                    </svg>   
                </button>
            </td>
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
