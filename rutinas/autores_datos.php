<!-- Tratamiento y campos comunes al alta y mantenimiento de autores -->
<div class="row">
          <div class="d-flex col-12">
            <div class="col-5 d-inline-flex">  
              <label for="nacionalidad" class="form-text text-primary fs-5 mt-1 text-primary">
                      Nacionalidad&nbsp;&nbsp;</label>
              <input type="text" id="nacionalidad" list="lista_nacionalidades" name="nacionalidad" 
                    autocomplete="off" class="form-control input-sm fs-5 h-75 w-100 ms-2">
              <datalist id="lista_nacionalidades"> </datalist>
            </div>

            <div class="col-7 d-inline-flex">
              <label for="cliteraria" class="form-text text-primary fs-5 mt-0 ms-5 text-primary">
                      Corriente literaria&nbsp;&nbsp;</label>
              <input type="text" id="cliteraria" list="lista_clit" name="cliteraria" 
                    autocomplete="off" class="form-control input-sm fs-5 h-75 w-75">
              <datalist id="lista_clit"> </datalist>
            </div>
          </div>      
        </div>
        
<div class="row">
  <div class="d-flex mb-2">
    <div class="formulario__grupo" id="grupo__fnac">  
      <div class="col-auto d-inline-flex"> 
        <label class="fs-5 mt-4 text-primary formulario__input-label">Fecha de nacimiento</label>
        <input type="date" name="fnac" id="fnac" 
                class="form-control input-sm bg-secondary fs-5 h-50 w-75 mt-3 ms-2 
                formulario__input">
      </div>    
      <div id="fnac_error"></div>      
    </div>
    <div class="formulario__grupo"  id="grupo__ffal"> 
      <div class="col-auto d-inline-flex ">
        <label class="fs-5 mt-4 ms-2 text-primary formulario__input-label">Fecha de defunción</label>
        <input type="date" name="ffal" id="ffal" 
               class="form-control input-sm bg-secondary fs-5 h-50 w-75 mt-3 ms-3 
                      formulario__input">
      </div>        
      <div id="ffal_error"></div>
    </div>
  </div>
</div>

<div class="row">
  <div class="d-flex col-12">
    <div class="col-8 d-inline-flex">  
      <label class="fs-5 mt-2 text-primary">Nacimiento&nbsp;&nbsp;&nbsp;&nbsp;: Lugar</label>
      <input type="text" name="lnac" id="lnac" 
          class="form-control input-sm fs-5 w-50 h-75 mt-1 ms-3">
    </div>

    <div class="col-4 d-inline-flex">
      <label for="pnac" class="form-text text-primary fs-5 mt-2 ms-5 text-primary">
              País&nbsp;&nbsp;</label>
      <input type="text" id="pnac" list="lista_paises1" name="pnac" autocomplete="off"
            class="form-control input-sm fs-5 h-75 w-75 ms-2">
      <datalist id="lista_paises1"> </datalist>
    </div>
  </div>      
</div>

<div class="row">
  <div class="d-flex col-12">
    <div class="col-8 d-inline-flex">  
      <label class="fs-5 mt-2 text-primary">Fallecimiento: Lugar</label>
      <input type="text" name="" id="lfal" 
          class="form-control input-sm fs-5 w-50 h-75 mt-1 ms-3">
    </div>

    <div class="col-4 d-inline-flex">
      <label for="pfal" class="form-text text-primary fs-5 mt-2 ms-5 text-primary">
              País&nbsp;&nbsp;</label>
      <input type="text" id="pfal" list="lista_paises2" name="pfal" autocomplete="off"
            class="form-control input-sm fs-5 h-75 w-75 ms-2">
      <datalist id="lista_paises2"> </datalist>
    </div>
  </div>      
</div>

<div class="row">
  <div class="d-flex col-12">
    <div class="col-10 d-inline-flex">
      <label for="web" class="fs-5 mt-4 text-primary">
              Consulta WEB</label>
    
      <input type="text" name="web" id="web" 
            class="form-control input-sm fs-5 h-75 w-75 mt-3 ms-3"/>
    </div>       
    
    <div class="col-2 d-inline-flex">
        <button type="button" id="buscar_web" 
              class="form-control input-sm fs-5 h-75 w-75 mt-3 border-0">
          <svg class="bi" width="30" height="30" fill="currentColor">
            <use xlink:href="bootstrap-5.1.3\main\iconos\bootstrap-icons.svg#search"/>
          </svg>
        </button>
		</div>	
  </div>      
</div>

<div class="row">
  <div class="formulario__mensaje d-flex col-12" id="formulario__mensaje">
      <p class="col-auto d-inline-flex mt-5 ms-3">
        <svg class="bi" width="30" height="30" fill="currentColor">
            <use xlink:href="bootstrap-5.1.3\main\iconos\bootstrap-icons.svg#x-circle-fill"/>
        </svg>
        <b> &nbsp;&nbsp;Formulario con errores, no se puede dar de alta. </b>
      </p>              
  </div>
</div>  

