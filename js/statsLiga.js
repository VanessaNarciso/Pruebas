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
          console.log(data)
          let tabla = $("#bodyLigas");          
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
          $('#ligasEmpresa').DataTable();
        },
        error: function(error_msg) {
          alert((error_msg["responseText"]))
        }
      })
}

window.onload = getLigasComp;
  