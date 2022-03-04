
<?php

/* Tratamiento del alta de un autor */ 
  $sql = "SELECT cGR01_Usuario  FROM tgr01_acceso limit 1";
  $resultados= $dbcon->query($sql);
  if ($resultados->num_rows == 0)  {
    $mensaje = "Alta no efectuada. No existen usuarios. El primer usuario tiene que ser un administrador";					
  }
?>            