let serverName = 'https://ligascortas.herokuapp.com'

function getBase64Image(img) {
  var canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  var ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);
  var dataURL = canvas.toDataURL("image/png");
  return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}

function stringValue(str){
  let ALPHABET = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let sum = 0;
  for(let i=0; i<str.length; i++){
    sum=sum+(ALPHABET.indexOf(str[i])*10000);
  }  
  return sum;
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
    // id = "optionOne", "optionTwo" para los radios
    var imageLanding = getBase64Image(document.getElementById("inputImage"));

    // Esto se manda a landing
    let ms = new Date().getTime();
    let code = ms+window.localStorage.uid;
    let ligaLanding = serverName+'/landing?template='+templateChoice+'&id='+code;
    let company = window.localStorage.empresaId
    let uId = window.localStorage.uid

    infoLanding = {
      "nombreLanding": nombreLanding,
      "descripcionLanding": descriptionLanding,      
      "templateChoice" : templateChoice,
      "ligaLanding" : ligaLanding,
      "empresaLanding" : company,
      "createdBy" : uId,
      "fechaCreacion" : new Date()
    };

    configLanding = {
      "titulo" : tituloLanding,
      "texto" : textoLanding,
      "footerLanding": footerLanding,
      "imageLanding" : imageLanding,
      "fechaModificacion" : new Date()
    }
  
    json_to_send_ = {
      infoLanding,
      configLanding
    }

    json_to_send = JSON.stringify(json_to_send)
    console.log(json_to_send)
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

