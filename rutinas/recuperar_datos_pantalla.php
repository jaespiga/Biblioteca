
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
            $('#fnacEdd').val("dd");
            $('#fnacEmm').val("mm");
            $('#fnacE').val("");
        }   

    // Tratamiento de la fecha de fallecimiento
    if (!isNaN(Date.parse(res[4]))) { 
        ele_fecha=res[4].split("-");
        $('#ffalEdd').val(ele_fecha[2]);
        $('#ffalEmm').val(ele_fecha[1]);
        $('#ffalE').val(ele_fecha[0]);
    } else {
            $('#ffalEdd').val("dd");
            $('#ffalEmm').val("mm");
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
    $('#fnac').val("");
   
// Tratamiento de la fecha de fallecimiento

    $('#ffaldd').val("dd");
    $('#ffalmm').val("mm");
    $('#ffal').val("");   

    $('#lnac').val("");
    $('#pnac').val("");
    $('#lfal').val("");
    $('#pfal').val("");
    $('#web').val("");
    return
}
//  Informar los datos de la pantalla de libros
function libroRecuperarDatosPantalla(datos_pantalla) {

res=datos_pantalla.split("#&");

$('#claveE').val(res[1]);
$('#autoresE').val(res[2]);
$('#editorialE').val(res[4]);

// Tratamiento de la fecha de publicación
if (!isNaN(Date.parse(res[5]))) { 
    ele_fecha=res[5].split("-");
    $('#fpubEdd').val(ele_fecha[2]);
    $('#fpubEmm').val(ele_fecha[1]);
    $('#fpubE').val(ele_fecha[0]);
} else {
        $('#fpubEdd').val("dd");
        $('#fpubEmm').val("mm");
        $('#fpubE').val("");
    }   
$('#propietarioE').val(res[10]);

// Tratamiento de la fecha de adquisión del libro
if (!isNaN(Date.parse(res[6]))) { 
    ele_fecha=res[6].split("-");
    $('#fadqEdd').val(ele_fecha[2]);
    $('#fadqEmm').val(ele_fecha[1]);
    $('#fadqE').val(ele_fecha[0]);
} else {
        $('#fadqEdd').val("dd");
        $('#fadqEmm').val("mm");
        $('#fadqE').val("");
    }   
$('#genlitE').val(res[9]);
$('#idiomaE').val(res[7]);
$('#soplibE').val(res[8]);
$('#sitlibE').val(res[12]);
$('#personaE').val(res[13]);

// Tratamiento de la fecha en que se ha producido la situación en que se encuentra el libro

if (!isNaN(Date.parse(res[14]))) { 
    ele_fecha=res[14].split("-");
    $('#festEdd').val(ele_fecha[2]);
    $('#festEmm').val(ele_fecha[1]);
    $('#festE').val(ele_fecha[0]);
} else {
        $('#festEdd').val("dd");
        $('#festEmm').val("mm");
        $('#festE').val("");
    }   

$('#sinopsisE').val(res[11]);
$('#webE').val(res[15]);
$('#tSUltCambioE').val(res[16]);


return
}
//  Inicializar los datos de la pantalla de libros
function libroInicializarDatosPantalla() {

$('#clave').val("");
$('#autores').val("");
$('#editorial').val("");

// Tratamiento de la fecha de publicación
$('#fpubdd').val("dd");
$('#fpubmm').val("mm");
$('#fpub').val("");

$('#propietario').val("");

// Tratamiento de la fecha de adquisición

$('#fadqdd').val("dd");
$('#fadqmm').val("mm");
$('#fadq').val("");   

$('#genlit').val("");
$('#idioma').val("");
$('#soplib').val("");
$('#sitlib').val("");
$('#persona').val("");

// Tratamiento de la fecha en que se ha producido la situación en que se encuentra el libro

$('#festdd').val("dd");
$('#festmm').val("mm");
$('#fest').val("");   

$('#sinopsis').val("");
$('#web').val("");
return
}

</script>