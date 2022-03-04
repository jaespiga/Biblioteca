/* Buscar en WEB con el buscador de Google el texto tecleado  */ 
$(document).ready(function(){     /* Ejecutar cuando la página esté cargada */
	$("#buscar_web").click(function () {
        tecleo = $('#texto_web').val(); 
        url1="http://www.google.com.co/search?hl=es&q=";
        url2="&btnG=Buscar&meta=";
        url=url1 + tecleo + url2; 
        /* Sacar resultados en nueva pestaña  */ 
        window.open(url, '_blank');
	})
})

