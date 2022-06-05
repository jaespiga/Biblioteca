
<!--  Funciones para informar los datos de las pantallas de Autores / Libros / Lecturas -->
<script>
//  Informar los datos de la pantalla de autores
function autorRecuperarDatosPantalla(datos_pantalla) {

    res=datos_pantalla.split("#&");

    $('#claveE').val(res[1]);
    $('#nacionalidadE').val(res[9]);
    $('#cliterariaE').val(res[10]);

    // Tratamiento de la fecha de nacimiento
    if (!isNaN(Date.parse(res[3]))) { 
        ele_fecha=res[3].split("-");
        $('#fnacEdd').val(ele_fecha[2]);
        $('#fnacEmm').val(ele_fecha[1]);
        $('#fnacE').val(ele_fecha[0]);
    } else {
            $('#fnacEdd').val("");
            $('#fnacEmm').val("");
            $('#fnacE').val("");
        }   

    // Tratamiento de la fecha de fallecimiento
    if (!isNaN(Date.parse(res[4]))) { 
        ele_fecha=res[4].split("-");
        $('#ffalEdd').val(ele_fecha[2]);
        $('#ffalEmm').val(ele_fecha[1]);
        $('#ffalE').val(ele_fecha[0]);
    } else {
            $('#ffalEdd').val("");
            $('#ffalEmm').val("");
            $('#ffalE').val("");
        }   
    
    $('#lnacE').val(res[5]);
    $('#pnacE').val(res[6]);
    $('#lfalE').val(res[7]);
    $('#pfalE').val(res[8]);
    $('#webE').val(res[11]);
    $('#tSUltCambioE').val(res[12]);
    

    return
}
//  Inicializar los datos de la pantalla de autores
function autorInicializarDatosPantalla() {

    $('#clave').val("");
    $('#nacionalidad').val("");
    $('#cliteraria').val("");

// Tratamiento de la fecha de nacimiento
    $('#fnacdd').val("dd");
    $('#fnacmm').val("mm");
    $('#fnac').val("ssaa");
   
// Tratamiento de la fecha de fallecimiento

    $('#ffaldd').val("dd");
    $('#ffalmm').val("mm");
    $('#ffal').val("ssaa");   

    $('#lnac').val("");
    $('#pnac').val("");
    $('#lfal').val("");
    $('#pfal').val("");
    $('#web').val("");
    return
}
//  Informar los datos de la pantalla de libros
function librorecuperarDatosPantalla(datos_pantalla) {

res=datos_pantalla.split("#&");

$('#claveE').val(res[1]);
$('#nacionalidadE').val(res[9]);
$('#cliterariaE').val(res[10]);

// Tratamiento de la fecha de nacimiento
if (!isNaN(Date.parse(res[3]))) { 
    ele_fecha=res[3].split("-");
    $('#fnacEdd').val(ele_fecha[2]);
    $('#fnacEmm').val(ele_fecha[1]);
    $('#fnacE').val(ele_fecha[0]);
} else {
        $('#fnacEdd').val("");
        $('#fnacEmm').val("");
        $('#fnacE').val("");
    }   

// Tratamiento de la fecha de fallecimiento
if (!isNaN(Date.parse(res[4]))) { 
    ele_fecha=res[4].split("-");
    $('#ffalEdd').val(ele_fecha[2]);
    $('#ffalEmm').val(ele_fecha[1]);
    $('#ffalE').val(ele_fecha[0]);
} else {
        $('#ffalEdd').val("");
        $('#ffalEmm').val("");
        $('#ffalE').val("");
    }   

$('#lnacE').val(res[5]);
$('#pnacE').val(res[6]);
$('#lfalE').val(res[7]);
$('#pfalE').val(res[8]);
$('#webE').val(res[11]);
$('#tSUltCambioE').val(res[12]);


return
}
//  Inicializar los datos de la pantalla de libros
function libroinicializarDatosPantalla() {

$('#clave').val("");
$('#nacionalidad').val("");
$('#cliteraria').val("");

// Tratamiento de la fecha de nacimiento
$('#fnacdd').val("dd");
$('#fnacmm').val("mm");
$('#fnac').val("ssaa");

// Tratamiento de la fecha de fallecimiento

$('#ffaldd').val("dd");
$('#ffalmm').val("mm");
$('#ffal').val("ssaa");   

$('#lnac').val("");
$('#pnac').val("");
$('#lfal').val("");
$('#pfal').val("");
$('#web').val("");
return
}

</script>