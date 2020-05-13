let serverName = 'https://ligascortas.herokuapp.com'

function urlValida(string) {
  let url;

  try {
    url = new URL(string);
  } catch (_) {
    return false;  
  }

  return url.protocol === "http:" || url.protocol === "https:";
}

function encodeCode(code){
  return encodeURIComponent(code).replace(/[!'()]/g, escape).replace(/\*/g, "%2A");
}

$('#create_button').on('click', function(){    
    // cargar datos del form    
    let nombreLiga = $('#inputName').val()
    let codigoLiga = $('#inputLigaCorta').val()
    codigoLiga = encodeCode(codigoLiga);
    let ligaCorta = serverName+'/liga/'+codigoLiga
    let ligaOriginal = $('#inputURL').val()
    if(!urlValida(ligaOriginal)){
      alert('Formato de liga incorrecto');
      $('#inputURL').focus();
      return false;
    }
    let company = window.localStorage.empresaId
    let uId = window.localStorage.uid
  
    json_to_send = {
      "nombreLiga": nombreLiga,
      "codigoLiga" : codigoLiga,
      "ligaCorta" : ligaCorta,
      "ligaOriginal" : ligaOriginal,
      "empresaLiga" : company,
      "createdBy" : uId,
      "fechaCreacion" : new Date(),
      "fechaModificacion" : new Date()
    };
  
    json_to_send = JSON.stringify(json_to_send)
    console.log(json_to_send)
    $.ajax({
      url: serverName+'/createLiga',      
      headers: {
          'Content-Type':'application/json'
      },
      method: 'POST',
      dataType: 'json',
      data: json_to_send,
      success: function(data){
        // guardar token en localstorage o cookie        
        window.location = 'consultUrl.html'
      },
      error: function(error_msg) {
        alert((error_msg["responseText"]))
      }
    })
  })

  window.onload = load();
  
  function load() {
    $('#ligaCortaCompleta').val(serverName);
  };  

  $('#inputLigaCorta').on('input', function(e){
    $('#ligaCortaCompleta').val(serverName +'/liga/' +encodeCode($('#inputLigaCorta').val()));
  })