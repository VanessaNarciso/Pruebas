let serverName = 'https://ligascortas.herokuapp.com'

function getDataUrl(img) {
  // Create canvas
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  // Set width and height
  canvas.width = img.width;
  canvas.height = img.height;
  // Draw the image
  ctx.drawImage(img, 0, 0);
  return canvas.toDataURL('image/jpeg');
}

function stringValue(str){
  let ALPHABET = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let sum = 0;
  mult = Math.floor(Math.random() * 1000) + 1;
  mult2 = Math.floor(Math.random() * 151) + 1;
  for(let i=0; i<str.length; i++){
    sum=sum+(ALPHABET.indexOf(str[i])*mult2);
  }  
  return sum*mult*mult2;
}

function encode(ligaLarga) {
  ligaLarga.replace(/[^0-9a-z]/gi, '');
  num = stringValue(ligaLarga)
  let ALPHABET = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let BASE     = ALPHABET.length;
  sb = '';
  while ( num > 1 ) {
      sb = sb+ALPHABET[Math.ceil(num%BASE)];
      num = Math.ceil(num/BASE);
  }
  return sb.split("").reverse().join("");
}

function loadEmpresas() {
  $.ajax({
    url: serverName+'/getCompanies',
    // url: 'https://tuapp.herokuapp.com/todos',
    method: 'GET',
    dataType: 'json',
    success: function(data){

      for( let i = 0; i < data.length; i++) {
        // aqui va su código para agregar los elementos de la lista
        var id = data[i]['_id']
        var nombre = data[i]['nombre']
        $('#inputEmpresas').append("<option value='"+id+"'>"+nombre+"</option>")
    
      }
    },
    error: function(error_msg) {
      alert((error_msg['responseText']));
    }
  });
}

loadEmpresas()

$('#create_button').on('click', function(){    
    // Esto se mandara a confLanding
    let nombreLanding = $('#inputName').val()
    let descriptionLanding = $('#inputDescription').val()
    let footerLanding = $('#inputFooter').val()
    let templateChoice = $("input[name='options']:checked").val();
    // id = "optionOne"
    // id = "optionTwo"
    // how tf do u send an image i swear to god 
    const imageLanding = document.querySelector('#inputImage');
    img.addEventListener('load', function (event) {
    const dataUrl = getDataUrl(event.currentTarget);
    console.log(dataUrl);
    });

    // Esto se manda a landing
    let ligaCorta = serverName+'/'+templateChoice+'/'+nombreLanding;
    let company = window.localStorage.empresaId
    let uId = window.localStorage.uid

    json_to_send_landing = {
      "nombreLanding": nombreLanding,
      "descriptionLanding": descriptionLanding,
      "footerLanding": footerLanding,
      "templateChoice" : templateChoice,
    };

    json_to_send_config = {
      
      "ligaCorta" : ligaCorta,
      "empresaLiga" : company,
      "createdBy" : uId,
      "fechaCreacion" : new Date()
    }
  
    json_to_send_landing = JSON.stringify(json_to_send_landing)
    console.log(json_to_send_landing)

    json_to_send_landing = JSON.stringify(json_to_send_config)
    console.log(json_to_send_config)
    // hacer el POST a confLanding

    $.ajax({
      url: serverName+'/landing'+templateChoice+'/'+nombreLanding,      
      headers: {
          'Content-Type':'application/json'
      },
      method: 'POST',
      dataType: 'json',
      data: json_to_send_landing,
      success: function(data){
        // guardar token en localstorage o cookie        
        window.location = 'consultLanding.html'
      },
      error: function(error_msg) {
        alert((error_msg["responseText"]))
      }
    })
  })

  window.onload = load();
  
  function load() {
    $('#nombreLanding').val(serverName);
  };

