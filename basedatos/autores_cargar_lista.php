<?php 

// Obtención de la lista de autores según los datos tecleados por pantalla	

$buscar = $_POST['tecleo'];
        
list($opciones_autores) = leerListaAutores($buscar);

echo $opciones_autores;

function leerListaAutores($lit_autor) { 

	require_once 'connect.php';

	$sql=	"SELECT '1',cGR02_Autor, cGR02_LNacimiento FROM tgr02_autores 
					WHERE cGR02_Autor LIKE '$lit_autor%'
				UNION
			 SELECT '2',cGR02_Autor, cGR02_LNacimiento FROM tgr02_autores 
					WHERE cGR02_Autor LIKE '%$lit_autor%' 
					  AND cGR02_Autor not like '$lit_autor%'
			order by 1,2";			
	
	$resultados= $dbcon->query($sql);

    if ($resultados->num_rows == 0)  {
		$listas="";
    } else{ 
		$listas = '<option value="" disabled selected hidden></option>';
        while($fila = $resultados->fetch_assoc()) {	
            $listas .= "<option value='$fila[cGR02_Autor]'>$fila[cGR02_Autor]</option>";
        } 
	}	
	return [$listas]; 
}   
?>
