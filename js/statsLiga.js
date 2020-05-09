function getLigasComp() {
    ///////////////////////////// FALTA SABER QUE LIGA ////////////////////////////////
    liga = '5eb4b19d69ca5a0017c102be'
    $.ajax({
        url: 'https://ligascortas.herokuapp.com/visitas/'+liga,      
        headers: {
            'Content-Type':'application/json'
        },
        method: 'GET',
        success: function(data){
          let tabla = $("#bodyVisitas");
          $("#visitas").text(data.length);
          let paisMay = data[i].geolocalizacion;
          let navMay = data[i].geolocalizacion;
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
}

window.onload = getLigasComp;
  