<?php 

// Obtención de la lista de libros según los datos tecleados por pantalla	

$buscar = $_POST['tecleo'];
        
list($opciones_libros) = leerListaLibros($buscar);

echo $opciones_libros;

function leerListaLibros($lit_libro) { 

	require_once 'connect.php';

	$sql=	"SELECT '1',cGR03_Título, cGR03_Autor FROM tgr03_libros 
					WHERE cGR03_Título LIKE '$lit_libro%'
				UNION
			 SELECT '2',cGR03_Título, cGR03_Autor FROM tgr03_libros 
					WHERE cGR03_Título LIKE '%$lit_libro%' 
					  AND cGR03_Título not like '$lit_libro%'
			order by 1,2";			
	
	$resultados= $dbcon->query($sql);

    if ($resultados->num_rows == 0)  {
		$listas="";
    } else{ 
		$listas = '<option value="" disabled selected hidden></option>';
        while($fila = $resultados->fetch_assoc()) {	
            $listas .= "<option value='$fila[cGR03_Título]'>$fila[cGR03_Título]</option>";
        } 
	}	
	return [$listas]; 
}   
?>
