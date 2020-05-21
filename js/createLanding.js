let serverName = 'https://ligascortas.herokuapp.com'
let ms = new Date().getTime();

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
    let code = ms+window.localStorage.uid;

    // Esto se mandara a infoLanding
    let nombreLanding = $('#inputNombre').val();
    let descripcionLanding = $('#inputDescripcion').val();
    let templateChoice = $("input[name='options']:checked").val(); // id = "optionOne", "optionTwo" para los radios
    let ligaLanding = serverName+'/landing/'+templateChoice+'/'+code;
    let company = " "
    if(window.localStorage.tipo == 0){
      company =  $('#inputEmpresas').val()
      console.log("Soy admin" + company)
    }else{
      company = window.localStorage.empresaId
    }
    let uId = window.localStorage.uid

    // Esto se mandara a configLanding
    let tituloLanding = $('#inputTitulo').val();
    let textoLanding = $('#inputTexto').val();
    let footerLanding = $('#inputFooter').val();
    //var imageLanding = getBase64Image(document.getElementById("inputImage"));


    const infoLanding = {
      "nombreLanding": nombreLanding,
      "descripcionLanding": descripcionLanding,      
      "templateChoice" : templateChoice,
      "codeLanding" : code,
      "ligaLanding" : ligaLanding,
      "empresaLanding" : company,
      "createdBy" : uId,
      "fechaCreacion" : new Date()
    };

    const configLanding = {
      "titulo" : tituloLanding,
      "texto" : textoLanding,
      "footer": footerLanding,
      //"imagen" : imageLanding,
      "fechaModificacion" : new Date()
    }
  
    var json_to_send = {
      infoLanding,
      configLanding
    }

    json_to_send = JSON.stringify(json_to_send)
    console.log(json_to_send)
    // hacer el POST a confLanding

    $.ajax({
      url: serverName+'/landing',      
      headers: {
          'Content-Type':'application/json'
      },
      method: 'POST',
      dataType: 'json',
      data: json_to_send,
      success: function(data){
        //////////////////////GUARDAMOS LA LIGA CORTA TAMBIÉN
        json_to_send2 = {
          "nombreLiga": 'liga de '+nombreLanding,
          "codigoLiga" : encode(code),
          "ligaCorta" : serverName +'/' +encode(code),
          "ligaOriginal" : ligaLanding,
          "empresaLiga" : company,
          "createdBy" : uId,
          "fechaCreacion" : new Date(),
          "fechaModificacion" : new Date()
        };
        json_to_send2 = JSON.stringify(json_to_send2)
        $.ajax({
          url: serverName+'/createLiga',      
          headers: {
              'Content-Type':'application/json'
          },
          method: 'POST',
          dataType: 'json',
          data: json_to_send2,
          success: function(data){
            window.location = 'consultLanding.html'
          },
          error: function(error_msg) {          
            alert("Error al crear liga corta, crear manualmente")
          }
        })
      },
      error: function(error_msg) {
        alert((error_msg["responseText"]))
      }
    })
  })

  window.onload = load();
  
  function load() {
    
  };

  $('input[type=radio][name=options]').change(function() {
    $('#ligaCortaCompleta').val(serverName +'/' +encode(ms+window.localStorage.uid));
});

