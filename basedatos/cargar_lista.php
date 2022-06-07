<?php 

// Obtención de la lista de autores, libros según los datos tecleados por pantalla	

$apartado = $_POST['param0']; 
$clave = $_POST['param1'];

if ($apartado = "Autor") {
	list($opciones) = leerListaAutores($clave);
} else {if ($apartado = "Libro") {
			list($opciones) = leerListaLibros($clave);
		}
	}

echo $opciones;

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

// Obtención de la lista de libros según los datos tecleados por pantalla	

function leerListaLibros($lit_libro) { 

	require_once 'connect.php';

	$sql=	"SELECT '1',cGR03_Título, cGR03_Autor FROM tgr03_libros 
					WHERE cGR03_Título LIKE '$lit_libro%'
				UNION
			 SELECT '2',cGR03_Título, cGR03_Autor FROM tgr03_libros 
					WHERE cGR03_Título LIKE '%$lit_libro%' 
					  AND cGR03_Título not like '$lit_libro%'
			order by 1,2,3";			
	
	$resultados= $dbcon->query($sql);

    if ($resultados->num_rows == 0)  {
		$listas="";
    } else{ 
		$listas = '<option value="" disabled selected hidden></option>';
        while($fila = $resultados->fetch_assoc()) {	
            $listas .= "<option value='$fila[cGR03_Título]'>$fila[cGR03_Título], '(', $fila[cGR03_Autor], ')' </option>";
        } 
	}	
	return [$listas]; 
}   
?>
