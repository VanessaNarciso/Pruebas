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
  
function getLandingsComp() {
  var tipo = window.localStorage.tipo;
  var serverName = 'https://ligascortas.herokuapp.com';
  var getUrl = serverName;
    if(tipo == "0"){
      getUrl= getUrl+"/landings/";
      $('#creator_header').text('Empresa');
    }else{
      getUrl= getUrl+'/landings/'+window.localStorage.empresaId;
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
          let tabla = $("#bodyLandings");          
          for (let i = 0; i < data.length; i++) {
                fechaC = dateRead(new Date(data[i].fechaCreacion));
                /*
                  <th>Nombre</th>
                  th>Id landing</th>
                  <th>Descripción </th>
                  <th>Fecha de creación</th>
                  <th>Liga</th>
                  <th>Creador</th>
                  
                */                             
                  tabla.append(`                
                  <tr>
                    <td> ${data[i].nombreLanding} </td>
                    <td> ${data[i].codeLanding} </td>
                    <td> ${data[i].descripcionLanding}</td>
                    <td>${fechaC}</td>
                    <td> <a href ="${data[i].ligaLanding}"> ${ligaLanding}</d>
                    <td>${data[i].creator}</td>     
                    </tr>
                `);              
                if(i == data.length-1){
                  $('#landingsEmpresa').DataTable({
                    "language": {
                        "lengthMenu": "Mostrar _MENU_ lansing pages por página",
                        "zeroRecords": "No hay landing pages para mostrar",
                        "info": "Página _PAGE_ de _PAGES_",
                        "infoEmpty": "",
                        "infoFiltered": "(Buscando en _MAX_ landing pages)"
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
  
  window.onload = getLandingsComp;
