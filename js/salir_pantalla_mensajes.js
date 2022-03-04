
/* Instrucciones para eliminar el mensaje (fadeOut en vez de hidde hace desaparecer el mensaje suavemente) */
$('body').click(function() {
 $('#elmensaje').fadeOut();
});   
$('#elmensaje').click(function(event){
 event.stopPropagation();
});

$('body').submit(function() {
 $('#tratamientoSN_mto, #tratamientoSN_baja').fadeOut();
});   
$('#tratamientoSN_mto, #tratamientoSN_baja').click(function(event){
 event.stopPropagation();
});
