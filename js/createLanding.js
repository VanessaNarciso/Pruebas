let serverName = 'https://ligascortas.herokuapp.com'

$('#create_button').on('click', function(){    
    // cargar datos del form    
    let nombreLanding = $('#inputName').val()
    let descriptionLanding = $('#inputDescription').val()
    let footerLanding = $('#inputFooter').val()
    let templateChoice = $('inputChoice:checked').val();
    // id = "optionOne"
    // id = "optionTwo"
    let company = window.localStorage.empresaId
    let uId = window.localStorage.uid
    

    const imagenLanding = {
      dom    : document.getElementById( "inputImage" ),
      binary : null
    };

    // FileReader API 
    const reader = new FileReader();
    reader.addEventListener( "load", function () {
      imagenLanding.binary = reader.result;
    } );
    // Lee la imagen que el usuario selecciono
    imagenLanding.dom.addEventListener( "change", function () {
      if( reader.readyState === FileReader.LOADING ) {
        reader.abort();
      }
      reader.readAsBinaryString( imagenLanding.dom.files[0] );
    } );
  
    json_to_send = {
      "nombreLanding": nombreLanding,
      "descriptionLanding": descriptionLanding,
      "footerLandin": footerLanding,
      "imagenLanding" : imagenLanding,
      "templateChoice" : templateChoice,
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
