<?php 
        
$tabla = $_POST['param1'];
$clave = $_POST['param2'];
echo ($tabla + "   " + $clave);

leerListaCódigos($tabla, $clave);

function leerListaCódigos($tabla, $clave) { 

	require_once 'connect.php';

	$sql=	"SELECT '1', cGR00_Tabla, cGR00_Clave, cGR00_Descripcion FROM tgr00_tcodigos
                WHERE cGR00_Tabla = '$tabla'
				  AND cGR00_Descripcion LIKE '$clave%'
			UNION
				SELECT '2', cGR00_Tabla, cGR00_Clave, cGR00_Descripcion FROM tgr00_tcodigos
					WHERE cGR00_Tabla = '$tabla'
					  AND cGR00_Descripcion LIKE '%$clave%' 
				  	  AND cGR00_Descripcion NOT LIKE '$clave%'
			order by 1,3,2";						
	
	$resultados= $dbcon->query($sql);

    if ($resultados->num_rows == 0)  {
		$listas="";
    } else{ 
		$listas = '<option value="" disabled selected hidden></option>';
        while($fila = $resultados->fetch_assoc()) {	
            $listas .= "<option value='$fila[cGR00_Descripcion]'>$fila[cGR00_Descripcion]</option>";
        } 
	}	
	echo $listas;
}   
?>