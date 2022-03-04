<?php
	if (empty($_SESSION['usuario_id'])) {
		header('Location: acceso_pagina.php');
		exit;
	}
?>