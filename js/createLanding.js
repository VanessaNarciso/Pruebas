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

$('#create_button').on('click', function(){    
    // cargar datos del form    
    let nombreLanding = $('#inputName').val()
    let descriptionLanding = $('#inputDescription').val()
    let footerLanding = $('#inputFooter').val()
    let templateChoice = $("input[name='options']:checked").val();
    // id = "optionOne"
    // id = "optionTwo"
    // how tf do u send an image i swear to god 
    let ligaCorta = serverName+'/'+templateChoice+'/'+nombreLanding;
    let company = window.localStorage.empresaId
    let uId = window.localStorage.uid

    json_to_send = {
      "nombreLanding": nombreLanding,
      "descriptionLanding": descriptionLanding,
      "footerLanding": footerLanding,
      "templateChoice" : templateChoice,
      "ligaCorta" : ligaCorta,
      "empresaLiga" : company,
      "createdBy" : uId,
      "fechaCreacion" : new Date(),
      "fechaModificacion" : new Date()
    };
  
    json_to_send = JSON.stringify(json_to_send)
    console.log(json_to_send)
    $.ajax({
      url: serverName+'/createLanding',      
      headers: {
          'Content-Type':'application/json'
      },
      method: 'POST',
      dataType: 'json',
      data: json_to_send,
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
  
