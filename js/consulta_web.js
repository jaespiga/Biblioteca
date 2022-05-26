/* Buscar en WEB con el buscador de Google el texto tecleado  */ 
$(document).ready(function(){     /* Ejecutar cuando la página esté cargada */
	$("#buscar_web").click(function () {
        tecleo = $('#web').val(); 

        if (tecleo.substring(0,4) == "http" 
        ||  tecleo.substring(0,4) == "www.") {
            url = tecleo
        } else {    
                url1="http://www.google.com.co/search?hl=es&q=";
                url2="&btnG=Buscar&meta=";
                url=url1 + tecleo + url2; 
            }

        /* Sacar resultados en nueva pestaña  */ 
        window.open(url, '_blank');
	})

    $("#buscar_webE").click(function () {
        tecleo = $('#webE').val(); 

        if (tecleo.substring(0,4) == "http" 
        ||  tecleo.substring(0,4) == "www.") {
            url = tecleo
        } else {    
                url1="http://www.google.com.co/search?hl=es&q=";
                url2="&btnG=Buscar&meta=";
                url=url1 + tecleo + url2; 
            }

        /* Sacar resultados en nueva pestaña  */ 
        window.open(url, '_blank');
	})
})

