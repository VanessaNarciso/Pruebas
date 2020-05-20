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
  date = dd+'/'+mm+'/'+yyyy+'-'+hh+':'+mii+':'+ss;
  return date;
}

function getLigasComp() {
    var tipo = window.localStorage.tipo;
    var serverName = 'https://ligascortas.herokuapp.com';
    var getUrl = serverName;
    if(tipo == "0"){
      getUrl= getUrl+"/ligas/";
      $('#creator_header').text('Empresa');
    }else{
      getUrl= getUrl+'/ligas/'+window.localStorage.empresaId;
    }
    console.log(getUrl)
    $.ajax({
        url: getUrl,      
        headers: {
            'Content-Type':'application/json'
        },
        method: 'GET',
        success: function(data){
          console.log(data);
          let tabla = $("#bodyLigas");          
          for (let i = 0; i < data.length; i++) {
                fechaC = dateRead(new Date(data[i].fechaCreacion));
                fechaM = dateRead(new Date(data[i].fechaModificacion));
                ligOrg = data[i].ligaOriginal.substring(8,30)+' ...';                                
                  tabla.append(`                
                        <tr>                            
                            <td><a class="nav-link" href="liga.html?id=${data[i]._id}">${data[i].nombreLiga}</a></td>
                            <td>${data[i].codigoLiga}</td>
                            <td><a href="${data[i].ligaCorta}">${data[i].ligaCorta}</a></td>
                            <td><a href="${data[i].ligaOriginal}">${ligOrg}</a></td>
                            <td>${fechaC}</td>
                            <td>${fechaM}</td>
                            <td>${data[i].creator}</td>
                        </tr>
                `);              
                if(i == data.length-1){
                  $('#ligasEmpresa').DataTable({                
                    "language": {
                        "lengthMenu": "Mostrar _MENU_ ligas por página",
                        "zeroRecords": "No hay ligas para mostrar",
                        "info": "Página _PAGE_ de _PAGES_",
                        "infoEmpty": "",
                        "infoFiltered": "(Buscando en _MAX_ ligas)"
                    }
                  });
                }
          }
        },
        error: function(error_msg) {
          alert((error_msg["responseText"]))
        }
      })
}

window.onload = getLigasComp;
  