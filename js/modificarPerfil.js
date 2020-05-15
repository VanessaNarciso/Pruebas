let serverName = 'https://ligascortas.herokuapp.com'

function getProf() {    
     /////////////////////////  LLENAR FORM
    $.ajax({
        url: 'https://ligascortas.herokuapp.com/user/'+window.localStorage.uid,      
        headers: {
            'Content-Type':'application/json'
        },
        method: 'GET',
        success: function(data){     
            console.log(data)       
            $('#inputName').val(data.nombre)
            $('#inputMail').val(data.correo)            
            $('#inputCont').val(data.numeroTelefono)
        },
        error: function(error_msg) {
          alert((error_msg["responseText"]))
        }
    })
}

//////////////////////////////////  GUARDAR CAMBIOS   /////////////////////////////////////////////////
$('#update_button').on('click', function(){
    // cargar datos del form    
    let nombre  = $('#inputName').val()
    let correo  = $('#inputMail').val()
    let numCont = $('#inputCont').val()
  
    json_to_send = {
      "nombre": nombre,
      "correo" : correo,
      "numeroTelefono" : numCont      
    };
  
    json_to_send = JSON.stringify(json_to_send)
    console.log(json_to_send)
    $.ajax({
      url: serverName+'/users',
      headers: {
          'Content-Type':'application/json',
          'Authorization' : window.localStorage.token
      },
      method: 'PATCH',
      dataType: 'json',
      data: json_to_send,
      success: function(data){
        alert('Perfil actualizado');
        window.location = 'profile.html'
      },
      error: function(error_msg) {
        alert((error_msg["responseText"]))
      }
    })
})

window.onload = getProf;