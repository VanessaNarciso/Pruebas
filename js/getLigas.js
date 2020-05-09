function getLigasComp() {    
    if(!window.localStorage.token){
      alert('Intruso');
      window.location = 'login.html';
    }
    $.ajax({
        url: 'https://ligascortas.herokuapp.com/ligas/'+window.localStorage.empresaId,      
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
                            <td><a class="nav-link" href="liga.html">${data[i].nombreLiga}</a></td>
                            <td>${data[i].codigoLiga}</td>
                            <td><a href="${data[i].ligaCorta}">${data[i].ligaCorta}</a></td>
                            <td><a href="${data[i].ligaOriginal}">${data[i].ligaOriginal}</a></td>
                            <td>${data[i].fechaCreacion}</td>
                            <td>${data[i].fechaModificacion}</td>                        
                            <td>${data[i].createdBy}</td>
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
  