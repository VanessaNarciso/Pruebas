let serverName = 'https://ligascortas.herokuapp.com'

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
    let company = " "
    codigoLiga = encodeCode(codigoLiga);
    let ligaCorta = serverName+'/'+codigoLiga
    let ligaOriginal = $('#inputURL').val()
    if(!urlValida(ligaOriginal)){
      alert('Formato de liga incorrecto');
      $('#inputURL').focus();
      return false;
    }
    if(window.localStorage.tipo == 0){

      company =  $('#inputEmpresas').val()
      console.log("Soy admin" + company)
    }else{
      company = window.localStorage.empresaId
    }
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
    $('#ligaCortaCompleta').val(serverName +'/' +encodeCode($('#inputLigaCorta').val()));
  })

  $('#inputURL').on('input', function(e){
    $('#inputLigaCorta').val(encode($('#inputURL').val()));
    $('#ligaCortaCompleta').val(serverName +'/' +encodeCode($('#inputLigaCorta').val()));
  })