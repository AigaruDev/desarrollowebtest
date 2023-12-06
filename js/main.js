// validar Nombre y Apellido
document.getElementById('nombreApellido').addEventListener('blur', function() {
    const nombreInput = document.getElementById('nombreApellido');
    const nombre = nombreInput.value.trim();
    
    // Expresión regular para validar solo texto y espacios
    const regexNombre = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;

    if (nombre === '') {
      alert('Campo Nombre y Apellido No puede quedar Vacio');
    } else if (!regexNombre.test(nombre)) {
      alert('Nombre y Apellido solo debe contener letras y espacios');
    }
  });

  // validar Alias
  document.getElementById('alias').addEventListener('blur', function() {
    const aliasInput = document.getElementById('alias');
    const alias = aliasInput.value.trim();
    const regexAlias = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$/;
    
    if (alias === '') {
      alert('Por favor, ingresa un alias')
    } else if (!regexAlias.test(alias)) {
        alert('El alias debe tener al meno 1 caracter y 1 numero')
    }
    if(alias.length < 5) {
      alert('El Alias debe tener al menos 5 caracteres entre numeros y letras');
      return;
    }
  });

  // Validar Rut
  document.getElementById('rut').addEventListener('blur', function() {
    const rutInput = document.getElementById('rut');

    var valor = rutInput.value.replaceAll('.','');
    valor = valor.replace('-','');
    cuerpo = valor.slice(0,-1);
    dv = valor.slice(-1).toUpperCase();

    rut.value = cuerpo + '-'+ dv
    if(cuerpo.length < 7) { rut.setCustomValidity("RUT Incompleto"); 
        alert('Rut Incompleto o NO Valido'); 
        if(rut.value == '-'){
            rut.value = '';
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
            if(multiplo < 7) { multiplo = multiplo + 1; } else { multiplo = 2; }
      
        }

        dvEsperado = 11 - (suma % 11);
    
        dv = (dv == 'K')?10:dv;
        dv = (dv == 11)?0:dv;
        
        if(dvEsperado != dv) { rut.setCustomValidity("RUT Inválido"); alert('Rut Invalido'); return;}
        rut.setCustomValidity('');
  });

  // validar Correo
  document.getElementById('email').addEventListener('blur', function() {
    const emailInput = document.getElementById('email');
    const email = emailInput.value.trim();
    
    // Expresión regular para validar correo electrónico
    const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (email === '') {
      alert('Por favor, ingresa un correo electrónico');
    } else if (!regexEmail.test(email)) {
        alert('El correo electrónico no es válido ejemplo@correo.cl');
    }
  });


  //peticion Comuna
  const cbxRegion = document.getElementById('region')
  cbxRegion.addEventListener('change', getComunas)
  const cbxComuna = document.getElementById('comuna')

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

  function getComunas(){
    let region = cbxRegion.value
    let url = 'php/comuna.php'
    let formData = new FormData()
    formData.append('numeroRegion', region);
    fectchAndSetDataComuna(url, formData, cbxComuna)

  }

  function validarChecklist() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    if (checkboxes.length >= 2) {
    } else {
      alert ('debes tener al menos 2 campos de como se enteró tickeados');
    }
  }

  function enviarDatos() {
    const formulario = document.getElementById('formulario');
    const datos = new FormData(formulario);
  
    fetch('php/form.php', {
      method: 'POST',
      body: datos
    })
    .then(response => response.json())
    .then(data => {
      // Manejar la respuesta si es necesario
      console.log(data);
    })
    .catch(error => {
      console.error('Error al enviar los datos:', error);
    });
  }