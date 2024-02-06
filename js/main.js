// Variables constantes
const formulario = document.getElementById('formularioVoto');
const tbnombreApellido = document.getElementById('tbNombreApellido');
const tbAlias = document.getElementById('tbAlias');
const tbRut = document.getElementById('tbRut');
const tbEmail = document.getElementById('tbEmail');
const selectRegion = document.getElementById('cbRegion');
const selectComuna = document.getElementById('cbComuna');
const selectCandidato = document.getElementById('cbCandidato');
const parrafo = document.getElementById('warnings');
const chkWeb = document.getElementById('chbWeb');
const chkTv = document.getElementById('chbTv');
const chkRrss = document.getElementById('chbRrss');
const chkAmigo = document.getElementById('chbAmigo');


// variables globales
let rutBandera = 3;  // 1 rut bueno 2 rut invalido 3 rut incompleto 
let rutValidado; // rut ya votado = true y rut aun sin votar false
let checkEntero;

tbRut.addEventListener('blur', function() {
    let valor = tbRut.value.replaceAll('.','');
    valor = valor.replace('-','');
    cuerpo = valor.slice(0,-1);
    dv = valor.slice(-1).toUpperCase();

    tbRut.value = cuerpo + '-'+ dv
    if(cuerpo.length < 7) { 
        //tbRut.setCustomValidity("RUT Incompleto"); 
        alert('Rut Incompleto o NO Valido'); 
        if(tbRut.value == '-'){
            tbRut.value = '';
            rutBandera = 3;
        }
        return;}
    
        suma = 0;
        multiplo = 2;
        for(i=1;i<=cuerpo.length;i++) {
    
            // Obtener su Producto con el Múltiplo Correspondiente
            index = multiplo * valor.charAt(cuerpo.length - i);
            
            // Sumar al Contador General
            suma = suma + index;
            
            // Consolidar Múltiplo dentro del rango [2,7]
            if(multiplo < 7) { 
                multiplo = multiplo + 1; 
            } else {
                multiplo = 2; 
            }
        }

        dvEsperado = 11 - (suma % 11);
    
        dv = (dv == 'K')?10:dv;
        dv = (dv == 11)?0:dv;
        
        if(dvEsperado != dv) { 
            tbRut.setCustomValidity("RUT Inválido"); 
            alert('Rut Invalido'); 
            rutBandera = 2;
            return;
        }else{
            rutBandera = 1;
            validarRutVoto(tbRut.value);
            tbRut.setCustomValidity('');
        }
        
});

formulario.addEventListener('submit', e=>{
    e.preventDefault();
    parrafo.innerHTML = "";
    let warnings = "";
    let bandera = false;
    // inicio validacion tbNombreApellido
    // Expresión regular para validar solo texto y espacios
    const regexNombreApellido = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
    if (tbnombreApellido.value === '') {
        warnings += '* Campo Nombre y Apellido No puede quedar Vacio <br>';
        bandera = true;
    } else if (!regexNombreApellido.test(tbnombreApellido.value)) {
        warnings += '* Nombre y Apellido solo debe contener letras y espacios <br>';
        bandera = true;
    }
    //termino validacion tbnombreApellido
    // inicio validacion tbAlias
    const alias = tbAlias.value.trim();
    const regexAlias = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$/;
    
    if (alias === '') {
        warnings += '* Por favor, ingresa un alias <br>';
        bandera = true;
    } else if (!regexAlias.test(alias)) {
        warnings += '* El alias debe tener al meno 1 caracter y 1 numero <br>';
        bandera = true;
    }
    if(alias.length < 5) {
        warnings += '* El Alias debe tener al menos 5 caracteres entre numeros y letras <br>';
        bandera = true;
    }
    //termino validacion tbAlias
    // inicio validacion rut
    if(rutBandera === 3){
        warnings += '* Rut Incompleto o NO Valido <br>';
        bandera = true;
    }else if(rutBandera === 2){
        warnings += '* Rut Invalido <br>';
        bandera = true;
    }
    // termino validacion rut
    //inicio validacion Correo
    const email = tbEmail.value.trim();
        
    // Expresión regular para validar correo electrónico
    const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    if (email === '') {
        warnings += '* Por favor, ingresa un correo electrónico <br>';
        bandera = true;
    } else if (!regexEmail.test(email)) {
        warnings += '* El correo electrónico no es válido ejemplo@correo.cl <br>';
        bandera = true;
    }
    //termino validacion correo
    // inicio validar Region
    if(selectRegion.value === ""){
        warnings += '* Por favor seleccionar una Region <br>';
        bandera = true;
    }
    // termino validar Region
    // inicio validar Comuna
    if(selectComuna.value === ""){
        warnings += '* Por favor seleccionar una Comuna <br>';
        bandera = true;
    }
    // termino validar Comuna
    // inicio validar Candidato
    if(selectCandidato.value === ""){
        warnings += '* Por favor seleccionar un Candidato <br>';
        bandera = true;
    }
    // termino validar Candidato
    // inicio validacion de checkboxs
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    if (checkboxes.length < 2) {
        warnings += '* debes tener al menos 2 campos de como se enteró tickeados <br>';
        bandera = true;
    }else{
        validarCheckBox(checkboxes);
    }
    // inicio validacion de checkboxs
    if(rutValidado){
        warnings = '* Este Rut ya ha votado, NO puede volver a votar';
        bandera = true;
    }
    if(bandera === false){
        let confirmacion = window.confirm('¿Desea enviar su voto? Recuerda verificar bien la informacion.');
        if(confirmacion){
            generarVoto(
                tbnombreApellido.value,
                tbAlias.value,
                tbRut.value,
                tbEmail.value,
                selectComuna.value,
                selectCandidato.value,
                checkEntero
            );
        }
    }else{
        parrafo.innerHTML = warnings;
    } 
});

// Generar Votacion
function generarVoto(nombre, alias, rut, email, comuna, candidato, medioPopular){
    let datosVoto = {
        nombre : nombre,
        alias : alias,
        rut : rut,
        email : email,
        comuna : comuna,
        candidato : candidato,
        medioPopular : medioPopular

    };
    let datosJSON = JSON.stringify(datosVoto);
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "./php/voto.php", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            // Manejar la respuesta del servidor si es necesario
            if(xhr.responseText === "true"){
                alert('Su voto ha sido Registrado Exitosamente!');
            }
        }
    };
    xhr.send(datosJSON);
}

// cargar Regiones
document.addEventListener("DOMContentLoaded", function() {
    const xhr = new XMLHttpRequest()
    xhr.open('POST', './php/region.php', true)
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                const data = xhr.responseText
                selectRegion.innerHTML =  data
            } else {
                console.error('Hubo un problema con la solicitud.')
            }
        }
    };
    xhr.send();
  });

//peticion Comuna
selectRegion.addEventListener('change', getComunas);
function fectchAndSetDataComuna(url, formData, targetElement){
    return fetch(url, {
      method: "POST",
      body: formData,
      mode: 'cors'
    })
    .then(response => response.json())
    .then(data => {targetElement.innerHTML = data})
    .catch(err => console.log(err))
}

//obtener comunas
function getComunas(){
    let region = selectRegion.value
    let url = './php/comuna.php'
    formData = new FormData()
    formData.append('numeroRegion', region)
    fectchAndSetDataComuna(url, formData, selectComuna)
}

// cargar Candidatos
document.addEventListener("DOMContentLoaded", function() {
    const xhr = new XMLHttpRequest()
    xhr.open('POST', '../php/candidato.php', true)
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                const data = xhr.responseText;
                selectCandidato.innerHTML =  data;
            } else {
                console.error('Hubo un problema con la solicitud.')
            }
        }
    };
    xhr.send();
});

//Cambiar CheckboxletraNumero 1 web , 2 tv, 3rrss, 4 Amigos
function validarCheckBox(){
    checkEntero = "";
    if(chkWeb.checked){
        checkEntero += "1";
    }
    if(chkTv.checked){
        checkEntero += "2";
    }
    if(chkRrss.checked){
        checkEntero += "3";
    }
    if(chkAmigo.checked){
        checkEntero += "4";
    }
}

//validar rut voto en BD
function validarRutVoto(rut) {
    formData = new FormData()
    formData.append('rut', rut)
        return fetch('../php/consultarRut.php', {
          method: "POST",
          body: formData,
          mode: 'cors'
        })
        .then(response => response.json())
        .then(data => {
            rutValidado = data;
            if(data)alert('Usted Ya ha Votado!. no puede volver a Votar!')})
        .catch(err => console.log(err))
}