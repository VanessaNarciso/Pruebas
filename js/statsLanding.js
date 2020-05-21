let serverName = 'https://ligascortas.herokuapp.com'
var pathname = $(location).attr('search');
// el pathname es dif
let landing = pathname.substr(4)
console.log(landing)

function dateRead(d){
  var dd = d.getDate();
  var mm = d.getMonth()+1;
  var yyyy = d.getFullYear();
  var ss = d.getSeconds();
  var mii = d.getMinutes();
  var hh = d.getHours();
  if(dd<10) {dd='0'+dd}
  if(mm<10) {mm='0'+mm}
  if(ss<10) {ss='0'+ss}
  if(mii<10) {mii='0'+mii}
  if(hh<10) {hh='0'+hh}
  date = 'Día: '+dd+'/'+mm+'/'+yyyy+' Hora:'+hh+':'+mii+':'+ss;
  return date;
}


function encodeCode(code){
  return encodeURIComponent(code).replace(/[!'()]/g, escape).replace(/\*/g, "%2A");
}

function getLigasComp() {    
    $.ajax({
        // falta visitas/:landing u numvisitas/:landing ;;;;;;;;;;;;;;;;;
        url: serverName+'/visitas/'+landing,      
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
            fecha = dateRead(new Date(data[i].fecha));
            tabla.append(`                
                        <tr>                            
                            <td>${fecha}</td>
                            <td>${data[i].navegador}</td>
                            <td>${data[i].ip}</td>
                            <td>${data[i].geolocalizacion}</td>                            
                        </tr>
                `);
          }
          $('#landingVis').DataTable({
            "language": {
                "lengthMenu": "Mostrar _MENU_ landing pages por página",
                "zeroRecords": "No hay landing pages para mostrar",
                "info": "Página _PAGE_ de _PAGES_",
                "infoEmpty": "",
                "infoFiltered": "(Buscando en _MAX_ Landing Pages)"
            }
          });
        },
        error: function(error_msg) {
          alert((error_msg["responseText"]))
        }
    })


    /////////////////////////  LLENAR FORM DE LANDING
    $.ajax({
        url: serverName+'/landings/'+landing,      
        headers: {
            'Content-Type':'application/json'
        },
        method: 'GET',
        success: function(data){     
            console.log(data)      
            // Info sobre la landing aqui 
            $('#inputNombre').val(data.nombreLanding)
            $('#inputDescripcion').val(data.descripcionLanding)    
            $('#inputLiga').val(data.ligaLanding)            
        },
        error: function(error_msg) {
          alert((error_msg["responseText"]))
        }
    })

    ///////////////////// LLENAR FORM DE CONFIGLANDING
    $.ajax({
        url: serverName+'/landings/'+landing,      
        headers: {
            'Content-Type':'application/json'
        },
        method: 'GET',
        success: function(data){     
            console.log(data)      
            // Info sobre la landing aqui 
            $('#inputTitulo').val(data.titulo)
            $('#inputTexto').val(data.texto)    
            $('#inputFooter').val(data.footer)  
            // ver que rollo con la imgagen          
        },
        error: function(error_msg) {
          alert((error_msg["responseText"]))
        }
    })
}

//////////////////////////////////  GUARDAR CAMBIOS   /////////////////////////////////////////////////
$('#create_button').on('click', function(){        
    let code = ms+window.localStorage.uid;
    //cargar datos de la form de nuevo
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

    $.ajax({
      url: serverName+'/landings/' + landing,      
      headers: {
          'Content-Type':'application/json',
          'Authorization' : window.localStorage.token
      },
      method: 'PATCH',
      dataType: 'json',
      data: json_to_send,
      success: function(data){
        alert('Landing Page actualizada');
        window.location = 'consultLanding.html'
      },
      error: function(error_msg) {
        alert((error_msg["responseText"]))
      }
    })
  
  })

window.onload = getLandingsComp;
