let serverName = 'https://ligascortas.herokuapp.com'

$('#create_button').on('click', function(){    
    // cargar datos del form    
    let nombreLanding = $('#inputName').val()
    let descriptionLanding = $('#inputDescription').val()
    let footerLanding = $('#inputFooter').val()
    //let templateChoice = $('#')
    // falta decision de template 1 o 2
    // falta cargar la imagen
    let company = window.localStorage.empresaId
    let uId = window.localStorage.uid
  
    json_to_send = {
      "nombreLanding": nombreLanding,
      "descriptionLanding": descriptionLanding,
      "footerLandin": footerLanding,
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
        window.location = 'consultUrl.html'
      },
      error: function(error_msg) {
        alert((error_msg["responseText"]))
      }
    })
  })

  //window.onload = load();
  
  //function load() {
  //  $('#ligaCortaCompleta').val(serverName);
  //};  

  //$('#inputLigaCorta').on('input', function(e){
  //  $('#ligaCortaCompleta').val(serverName +'/liga/' +$('#inputLigaCorta').val());
  //})