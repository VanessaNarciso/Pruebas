let serverName = 'https://ligascortas.herokuapp.com'
///////////////////////////// FALTA SABER QUE LIGA ////////////////////////////////
var pathname = $(location).attr('search');
let liga = pathname.substr(4)
console.log(liga)

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

function getLigasComp() {    
    $.ajax({
        url: 'https://ligascortas.herokuapp.com/visitas/'+liga,      
        headers: {
            'Content-Type':'application/json'
        },
        method: 'GET',
        success: function(data){
          let tabla = $("#bodyVisitas");
          $("#visitas").text(data.length);
          ///////////////////////////////////////    OBTENER LA MODA DEL ARREGLO DATA EN data.navegador y data.geolocalización
          let paisMay = data[data.length-1].geolocalizacion;
          let navMay = data[data.length-1].navegador;
          $("#paisMax").text(paisMay);
          $("#navMax").text(navMay);
          for (let i = 0; i < data.length; i++) {
            tabla.append(`                
                        <tr>                            
                            <td>${data[i].fecha}</td>
                            <td>${data[i].navegador}</td>
                            <td>${data[i].ip}</td>
                            <td>${data[i].geolocalizacion}</td>                            
                        </tr>
                `);
          }
          $('#ligaVis').DataTable({
            "language": {
                "lengthMenu": "Mostrar _MENU_ ligas por página",
                "zeroRecords": "No hay ligas para mostrar",
                "info": "Página _PAGE_ de _PAGES_",
                "infoEmpty": "",
                "infoFiltered": "(Buscando en _MAX_ ligas)"
            }
          });
        },
        error: function(error_msg) {
          alert((error_msg["responseText"]))
        }
    })


    /////////////////////////  LLENAR FORM
    $.ajax({
        url: 'https://ligascortas.herokuapp.com/getLiga/'+liga,      
        headers: {
            'Content-Type':'application/json'
        },
        method: 'GET',
        success: function(data){     
            console.log(data)       
            $('#inputName').val(data.nombreLiga)
            $('#inputLigaCorta').val(data.codigoLiga)            
            $('#inputURL').val(data.ligaOriginal)
            $('#ligaCortaCompleta').val(data.ligaCorta)            
        },
        error: function(error_msg) {
          alert((error_msg["responseText"]))
        }
    })
}

//////////////////////////////////  GUARDAR CAMBIOS   /////////////////////////////////////////////////
$('#create_button').on('click', function(){
    // cargar datos del form    
    let nombreLiga = $('#inputName').val()
    let codigoLiga = $('#inputLigaCorta').val()
    codigoLiga = encodeCode(codigoLiga);
    let ligaCorta = serverName+'/'+codigoLiga;
    let ligaOriginal = $('#inputURL').val()
    if(!urlValida(ligaOriginal)){
      alert('Formato de liga incorrecto');
      $('#inputURL').focus();
      return false;
    }
  
    json_to_send = {
      "nombreLiga": nombreLiga,
      "codigoLiga" : codigoLiga,
      "ligaCorta" : ligaCorta,
      "ligaOriginal" : ligaOriginal,
      "fechaModificacion" : new Date()
    };
  
    json_to_send = JSON.stringify(json_to_send)
    console.log(json_to_send)
    $.ajax({
      url: serverName+'/ligas/'+liga,      
      headers: {
          'Content-Type':'application/json',
          'Authorization' : window.localStorage.token
      },
      method: 'PATCH',
      dataType: 'json',
      data: json_to_send,
      success: function(data){
        alert('Liga actualizada');
        window.location = 'consultUrl.html'
      },
      error: function(error_msg) {
        alert((error_msg["responseText"]))
      }
    })
})

  $('#inputLigaCorta').on('input', function(e){
    $('#ligaCortaCompleta').val(serverName +'/' +encodeCode($('#inputLigaCorta').val()));
  })

window.onload = getLigasComp;
  