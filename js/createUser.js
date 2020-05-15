const tipos = ['Admin Total','Admin empresa','Usuario empresa'];

function loadEmpresas() {
  $.ajax({
    url: 'https://ligascortas.herokuapp.com/getCompanies',
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

function validaTipo(){
  if(window.localStorage.tipo > 1){
    window.location = 'index.html'
  }
}

var select = document.getElementById('inputTipo');
for (var i = parseInt(window.localStorage.tipo); i < 3; i++) {
    var option = document.createElement("option");
    option.text = tipos[i];
    option.value = i;
    select.appendChild(option);
  }

$('#create_button').on('click', function(){    
    // cargar datos del form    
    let name = $('#inputName').val()
    let mail = $('#inputMail').val()
    let pass = $('#inputPass1').val()
    let contact = $('#inputCont').val()
    let tipoUs = parseInt($('#inputTipo').val())
    let company = " "
    if(window.localStorage.tipo == 0){

      company =  $('#inputEmpresas').val()
      console.log("Soy admin" + company)
    }else{
      company = window.localStorage.empresaId
    }
  
    json_to_send = {
      "nombre": name,
      "correo" : mail,
      "password" : pass,
      "numeroTelefono" : contact,
      "tipo" : tipoUs,
      "partOf" : company
    };
  
    json_to_send = JSON.stringify(json_to_send)
    console.log(json_to_send)
    $.ajax({
      url: 'https://ligascortas.herokuapp.com/users',      
      headers: {
          'Content-Type':'application/json'
      },
      method: 'POST',
      dataType: 'json',
      data: json_to_send,
      success: function(data){
        // guardar token en localstorage o cookie        
        window.location = 'consultProf.html'
      },
      error: function(error_msg) {
        alert((error_msg["responseText"]))
      }
    })
  })

  window.onload = validaTipo;