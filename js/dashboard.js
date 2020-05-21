$('#NameEmpresa').text(window.localStorage.empresa);
idE = window.localStorage.empresaId;
tipo = window.localStorage.tipo;

function Last8Days () {
    var result = [];
    for (var i=0; i<7; i++) {
        var d = new Date();
        d.setDate(d.getDate() - i);
        d = new Date(d.getFullYear(), d.getMonth(), d.getDate())
        result.push( d )
    }
    return(result.reverse());
}

function Last7DaysUser () {
    var result = [];
    for (var i=0; i<7; i++) {$('#NameEmpresa').text(window.localStorage.empresa);
idE = window.localStorage.empresaId;
tipo = window.localStorage.tipo;

function Last8Days () {
    var result = [];
    for (var i=0; i<7; i++) {
        var d = new Date();
        d.setDate(d.getDate() - i);
        d = new Date(d.getFullYear(), d.getMonth(), d.getDate())
        result.push( d )
    }
    return(result.reverse());
}

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

function getDatosDashboard(){
    var serverName = 'https://ligascortas.herokuapp.com';
    if(tipo === "0"){
      var urlVis = serverName+'/ligasVisitas';
      var urlVisNav = serverName+'/ligasVisitasNav/';
      var landingVis = serverName+'/landingsVisitas';
      //var landingVisNav = serverName+'/landingsVisitasNav/';
      $('#NameEmpresa').text('Administrador');
    }else{
      var urlVis = serverName+'/ligasVisitas/'+idE;
      var urlVisNav = serverName+'/ligasVisitasNav/'+idE;
      var landingVis = serverName+'/landingsVisitas/'+idE;
      //var landingVisNav = serverName+'/landingsVisitasNav/'+idE;
      $('#NameEmpresa').text(window.localStorage.empresa);
    }

    ///////////////////////////////////////////////////////////////////   USOS DIARIOS Y SEMANALES LIGAS
    $.ajax({
        url: urlVis,           
        headers: {
            'Content-Type':'application/json'
        },
        method: 'GET',
        success: function(data){     
            //console.log(data)
            $('#totalesLigas').text(data.length)
            now = new Date();                                                
            hoy = new Date(now.getFullYear(), now.getMonth(), now.getDate());  
            var clicsHoy = 0;
            for(var i=0; i<data.length; i++){
                //console.log("hoy es: ",hoy)
                //console.log("liga es de: ",new Date(data[i].visita.fecha))
                if(hoy < new Date(data[i].visita.fecha)){
                    //console.log("si es de hoy")
                    clicsHoy = clicsHoy+1;
                }
            }
            $('#ligasHoy').text(clicsHoy)
            const week = Last8Days();
            console.log("week es: ",week);
            var diaSemana=0;
            var contadorDatos=0;
            var semana = [];
            var visitasDia=0;
            data.sort(function(a, b) {
                return (a.visita.fecha < b.visita.fecha) ? -1 : ((a.visita.fecha > b.visita.fecha) ? 1 : 0);
            });
            console.log(data)
            fechaVis = new Date(data[contadorDatos].visita.fecha);
            while(fechaVis < week[diaSemana]){
              contadorDatos+=1;
              fechaVis = new Date(data[contadorDatos].visita.fecha);
            }            
            while(contadorDatos<data.length && diaSemana<7){
                anterior = week[diaSemana];
                actual = week[diaSemana+1];
                fechaVis = new Date(data[contadorDatos].visita.fecha);
                //console.log(fechaVis)
                if(fechaVis> anterior && fechaVis < actual){
                    visitasDia+=1;
                    contadorDatos+=1;
                }else{
                    semana.push(visitasDia);
                    diaSemana+=1;
                    visitasDia=0;
                }                                
            }            
            semana[6] = clicsHoy;
            var ctx = document.getElementById("ligasSemana");
            var myLineChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: Last7DaysUser(),
                datasets: [{
                label: "Usos",
                lineTension: 0.3,
                backgroundColor: "rgba(247, 85, 120, 0.2)",
                borderColor: "rgba(247, 85, 120, 1)",
                pointRadius: 5,
                pointBackgroundColor: "rgba(247, 85, 120, 1)",
                pointBorderColor: "rgba(255,255,255,0.8)",
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(247, 85, 120, 1)",
                pointHitRadius: 50,
                pointBorderWidth: 2,
                data: semana,
                }],
            },
            options: {
                scales: {
                xAxes: [{
                    gridLines: {
                    display: false
                    },
                    ticks: {
                    maxTicksLimit: 7
                    }
                }],
                yAxes: [{
                    ticks: {
                    stacked : true
                    },
                    gridLines: {
                    color: "rgba(0, 0, 0, .125)",
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

    //////////////////////////////////////////////////////////////////    USOS DIARIOS Y SEMANALES LANDING

    $.ajax({
      url: landingVis,         
      headers: {
          'Content-Type':'application/json'
      },
      method: 'GET',
      success: function(data){     
          //console.log(data)
          $('#totalesLandings').text(data.length)
          now = new Date();                                                 
          hoy = new Date(now.getFullYear(), now.getMonth(), now.getDate());   
          var clicsHoy = 0;
          for(var i=0; i<data.length; i++){
              //console.log("hoy es: ",hoy)
              //console.log("liga es de: ",new Date(data[i].visita.fecha))
              if(hoy < new Date(data[i].visita.fecha)){
                  //console.log("si es de hoy")
                  clicsHoy = clicsHoy+1;
              }
          }
          $('#landingsHoy').text(clicsHoy)
          const week = Last8Days();
          console.log("week es: ",week);
          var diaSemana=0;
          var contadorDatos=0;
          var semana = [];
          var visitasDia=0;
          data.sort(function(a, b) {
              return (a.visita.fecha < b.visita.fecha) ? -1 : ((a.visita.fecha > b.visita.fecha) ? 1 : 0);
          });
          console.log(data)
          fechaVis = new Date(data[contadorDatos].visita.fecha);
          while(fechaVis < week[diaSemana]){
            contadorDatos+=1;
            fechaVis = new Date(data[contadorDatos].visita.fecha);
          }            
          while(contadorDatos<data.length && diaSemana<7){
              anterior = week[diaSemana];
              actual = week[diaSemana+1];
              fechaVis = new Date(data[contadorDatos].visita.fecha);
              //console.log(fechaVis)
              if(fechaVis> anterior && fechaVis < actual){
                  visitasDia+=1;
                  contadorDatos+=1;
              }else{
                  semana.push(visitasDia);
                  diaSemana+=1;
                  visitasDia=0;
              }                                
          }            
          semana[6] = clicsHoy;
          var ctx = document.getElementById("landingsSemana");
          var myLineChart = new Chart(ctx, {
          type: 'line',
          data: {
              labels: Last7DaysUser(),
              datasets: [{
              label: "Visitas",
              lineTension: 0.3,
              backgroundColor: "rgb(2, 117, 216,0.2)",
              borderColor: "rgb(0, 117, 216,1)", 
              pointRadius: 5,
              pointBackgroundColor: "rgb(2, 117, 216,1)",
              pointBorderColor: "rgb(180, 203, 223,0.8)", 
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "rgb(204, 227, 247,1)",
              pointHitRadius: 50,
              pointBorderWidth: 2,
              data: semana,
              }],
          },
          options: {
              scales: {
              xAxes: [{
                  gridLines: {
                  display: false
                  },
                  ticks: {
                  maxTicksLimit: 7
                  }
              }],
              yAxes: [{
                  ticks: {
                  stacked : true
                  },
                  gridLines: {
                  color: "rgba(0, 0, 0, .125)",
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
  
    //////////////////////////////////////////////////////////////////    GRAFICA NAVIGADORES
  $.ajax({
    url: urlVisNav,           
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

function getDatosDashboard(){
    var serverName = 'https://ligascortas.herokuapp.com';
    if(tipo === "0"){
      var urlVis = serverName+'/ligasVisitas';
      var urlVisNav = serverName+'/ligasVisitasNav/';
      var landingVis = serverName+'/landingsVisitas';
      var landingVisNav = serverName+'/landingsVisitasNav/';
      $('#NameEmpresa').text('Administrador');
    }else{
      var urlVis = serverName+'/ligasVisitas/'+idE;
      var urlVisNav = serverName+'/ligasVisitasNav/'+idE;
      var landingVis = serverName+'/landingsVisitas/'+idE;
      var landingVisNav = serverName+'/landingsVisitasNav/'+idE;
      $('#NameEmpresa').text(window.localStorage.empresa);
    }

    ///////////////////////////////////////////////////////////////////   USOS DIARIOS Y SEMANALES LIGAS
    $.ajax({
        url: urlVis,           
        headers: {
            'Content-Type':'application/json'
        },
        method: 'GET',
        success: function(data){     
            //console.log(data)
            $('#totalesLigas').text(data.length)
            now = new Date();                                                
            hoy = new Date(now.getFullYear(), now.getMonth(), now.getDate());  
            var clicsHoy = 0;
            for(var i=0; i<data.length; i++){
                //console.log("hoy es: ",hoy)
                //console.log("liga es de: ",new Date(data[i].visita.fecha))
                if(hoy < new Date(data[i].visita.fecha)){
                    //console.log("si es de hoy")
                    clicsHoy = clicsHoy+1;
                }
            }
            $('#ligasHoy').text(clicsHoy)
            const week = Last8Days();
            console.log("week es: ",week);
            var diaSemana=0;
            var contadorDatos=0;
            var semana = [];
            var visitasDia=0;
            data.sort(function(a, b) {
                return (a.visita.fecha < b.visita.fecha) ? -1 : ((a.visita.fecha > b.visita.fecha) ? 1 : 0);
            });
            console.log(data)
            fechaVis = new Date(data[contadorDatos].visita.fecha);
            while(fechaVis < week[diaSemana]){
              contadorDatos+=1;
              fechaVis = new Date(data[contadorDatos].visita.fecha);
            }            
            while(contadorDatos<data.length && diaSemana<7){
                anterior = week[diaSemana];
                actual = week[diaSemana+1];
                fechaVis = new Date(data[contadorDatos].visita.fecha);
                //console.log(fechaVis)
                if(fechaVis> anterior && fechaVis < actual){
                    visitasDia+=1;
                    contadorDatos+=1;
                }else{
                    semana.push(visitasDia);
                    diaSemana+=1;
                    visitasDia=0;
                }                                
            }            
            semana[6] = clicsHoy;
            var ctx = document.getElementById("ligasSemana");
            var myLineChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: Last7DaysUser(),
                datasets: [{
                label: "Usos",
                lineTension: 0.3,
                backgroundColor: "rgba(247, 85, 120, 0.2)",
                borderColor: "rgba(247, 85, 120, 1)",
                pointRadius: 5,
                pointBackgroundColor: "rgba(247, 85, 120, 1)",
                pointBorderColor: "rgba(255,255,255,0.8)",
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(247, 85, 120, 1)",
                pointHitRadius: 50,
                pointBorderWidth: 2,
                data: semana,
                }],
            },
            options: {
                scales: {
                xAxes: [{
                    gridLines: {
                    display: false
                    },
                    ticks: {
                    maxTicksLimit: 7
                    }
                }],
                yAxes: [{
                    ticks: {
                    stacked : true
                    },
                    gridLines: {
                    color: "rgba(0, 0, 0, .125)",
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

    //////////////////////////////////////////////////////////////////    USOS DIARIOS Y SEMANALES LANDING

    $.ajax({
      url: landingVis,         
      headers: {
          'Content-Type':'application/json'
      },
      method: 'GET',
      success: function(data){     
          //console.log(data)
          $('#totalesLandings').text(data.length)
          now = new Date();                                                 
          hoy = new Date(now.getFullYear(), now.getMonth(), now.getDate());   
          var clicsHoy = 0;
          for(var i=0; i<data.length; i++){
              //console.log("hoy es: ",hoy)
              //console.log("liga es de: ",new Date(data[i].visita.fecha))
              if(hoy < new Date(data[i].visita.fecha)){
                  //console.log("si es de hoy")
                  clicsHoy = clicsHoy+1;
              }
          }
          $('#landingsHoy').text(clicsHoy)
          const week = Last8Days();
          console.log("week es: ",week);
          var diaSemana=0;
          var contadorDatos=0;
          var semana = [];
          var visitasDia=0;
          data.sort(function(a, b) {
              return (a.visita.fecha < b.visita.fecha) ? -1 : ((a.visita.fecha > b.visita.fecha) ? 1 : 0);
          });
          console.log(data)
          fechaVis = new Date(data[contadorDatos].visita.fecha);
          while(fechaVis < week[diaSemana]){
            contadorDatos+=1;
            fechaVis = new Date(data[contadorDatos].visita.fecha);
          }            
          while(contadorDatos<data.length && diaSemana<7){
              anterior = week[diaSemana];
              actual = week[diaSemana+1];
              fechaVis = new Date(data[contadorDatos].visita.fecha);
              //console.log(fechaVis)
              if(fechaVis> anterior && fechaVis < actual){
                  visitasDia+=1;
                  contadorDatos+=1;
              }else{
                  semana.push(visitasDia);
                  diaSemana+=1;
                  visitasDia=0;
              }                                
          }            
          semana[6] = clicsHoy;
          var ctx = document.getElementById("landingsSemana");
          var myLineChart = new Chart(ctx, {
          type: 'line',
          data: {
              labels: Last7DaysUser(),
              datasets: [{
              label: "Visitas",
              lineTension: 0.3,
              backgroundColor: "rgb(2, 117, 216,0.2)",
              borderColor: "rgb(0, 117, 216,1)", 
              pointRadius: 5,
              pointBackgroundColor: "rgb(2, 117, 216,1)",
              pointBorderColor: "rgb(180, 203, 223,0.8)", 
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "rgb(204, 227, 247,1)",
              pointHitRadius: 50,
              pointBorderWidth: 2,
              data: semana,
              }],
          },
          options: {
              scales: {
              xAxes: [{
                  gridLines: {
                  display: false
                  },
                  ticks: {
                  maxTicksLimit: 7
                  }
              }],
              yAxes: [{
                  ticks: {
                  stacked : true
                  },
                  gridLines: {
                  color: "rgba(0, 0, 0, .125)",
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

    //////////////////////////////////////////////////////////////////    GRAFICA NAVEGADORES
    $.ajax({
      url: landingVisNav,         
      headers: {
          'Content-Type':'application/json'
      },
      method: 'GET',
      success: function(data){     
          //console.log("Datos para grafica",data)
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
