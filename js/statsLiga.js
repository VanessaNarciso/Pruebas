let serverName = 'https://ligascortas.herokuapp.com'

function getLigasComp() {
    ///////////////////////////// FALTA SABER QUE LIGA ////////////////////////////////
    let liga = '5eb4b19d69ca5a0017c102be'    
    $.ajax({
        url: 'https://ligascortas.herokuapp.com/visitas/'+liga,      
        headers: {
            'Content-Type':'application/json'
        },
        method: 'GET',
        success: function(data){
          let tabla = $("#bodyVisitas");
          $("#visitas").text(data.length);
          let paisMay = data[0].geolocalizacion;
          let navMay = data[0].geolocalizacion;
          $("#paisMax").text("Queti");
          $("#navMax").text("mporta");
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

$('#inputLigaCorta').on('input', function(e){
    $('#ligaCortaCompleta').val(serverName +'/liga/' +$('#inputLigaCorta').val());
  })

window.onload = getLigasComp;
  