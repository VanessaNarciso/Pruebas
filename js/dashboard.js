$('#NameEmpresa').text(window.localStorage.empresa);
idE = window.localStorage.empresaId;
tipo = window.localStorage.tipo;


function Last7DaysUser () {
    var result = [];
    for (var i=0; i<7; i++) {
        var d = new Date();
        d.setDate(d.getDate() - i);
        var dd = d.getDate();
        var mm = d.getMonth()+1;
        var yyyy = d.getFullYear();
        if(dd<10) {dd='0'+dd}
        if(mm<10) {mm='0'+mm}
        date = dd+'/'+mm+'/'+yyyy;
        result.push( date )
    }
    return(result.reverse());
}

function Last7Days () {
    var result = [];
    for (var i=0; i<8; i++) {
        var d = new Date();
        d.setDate(d.getDate() - i);
        d = new Date(d.getFullYear(), d.getMonth(), d.getDate())
        result.push( d )
    }
    return(result.reverse());
}

function getDatosDashboard(){

    ///////////////////////////////////////////////////////////////////   TOTAL CLICS LIGAS EMPRESA
    $.ajax({
        url: 'https://ligascortas.herokuapp.com/ligasVisitas/'+idE,      
        headers: {
            'Content-Type':'application/json'
        },
        method: 'GET',
        success: function(data){     
            //console.log(data)
            $('#totalesLigas').text(data.length)
            ///////////////////////////////////////////////////////////////////   HOY CLICS LIGAS EMPRESA
            now = new Date();                                                   //día de consulta a hora actual
            hoy = new Date(now.getFullYear(), now.getMonth(), now.getDate());   //día de consulta a las 00:00
            var clicsHoy = 0;
            for(var i=0; i<data.length; i++){
                console.log("hoy es: ",hoy)
                console.log("liga es de: ",new Date(data[i].visita.fecha))
                if(hoy < new Date(data[i].visita.fecha)){
                    console.log("si es de hoy")
                    clicsHoy = clicsHoy+1;
                }
            }
            $('#ligasHoy').text(clicsHoy)
            
            ///////////////////////////////////////////////////////////////////   GRAFICA DE AREA
            const week = Last7Days()
            console.log("week es: ",week);
            var j=0;
            var semana = [];
            for(var i=0; i<data.length; i++){
                ant = week[i];
                act = week[i+1];
                visitasDia=0;
                while(data[j].visita.fecha>ant && data[j].visita.fecha<act){
                    visitasDia = visitasDia+1;
                    j=j+1;
                }
                semana.push(visitasDia);
            }
            console.log("semana: ",semana);

        },
        error: function(error_msg) {
          alert((error_msg["responseText"]))
        }
    })    

    ///////////////////////////////////////////////////////////////////   GRAFICA DE BARRAS
    $.ajax({
        url: 'https://ligascortas.herokuapp.com/ligasVisitasNav/'+idE,      
        headers: {
            'Content-Type':'application/json'
        },
        method: 'GET',
        success: function(data){     
            //console.log("Datos para grafica",data)
            // Bar Chart Example
            navs = [];
            visitas = [];
            for(var i=0; i<data.length; i++){
              navs.push(data[i]._id)
              visitas.push(data[i].visitas)
            }
            var ctx = document.getElementById("myBarChart");
            var myLineChart = new Chart(ctx, {
              type: 'bar',
              data: {
                labels: navs,
                datasets: [{
                  label: "Visitas",
                  backgroundColor: "rgba(62, 204, 142, 1)",
                  borderColor: "rgba(62, 204, 142, 1)",
                  data: visitas,
                }],
              },
              options: {
                scales: {
                  xAxes: [{
                    gridLines: {
                        display: false
                    }
                  }],  
                  yAxes: [{
                    ticks: {
                      stacked : true
                    },
                    gridLines: {
                      display: true
                    }
                  }],
                },
                legend: {
                  display: false
                }
              }
            });
  
        },
        error: function(error_msg) {
          alert((error_msg["responseText"]))
        }
    })
}


window.onload = getDatosDashboard;