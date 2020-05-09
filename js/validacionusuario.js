if(window.localStorage.tipo == 2){
    document.getElementById("empresas").style.display = "none";
    var str = document.getElementById("usertype").innerHTML; 
    var res = str.replace("Administración", "Empresa");
    document.getElementById("usertype").innerHTML = res;
} 
if(window.localStorage.tipo == 3){
    document.getElementById("empresas").style.display = "none";
    document.getElementById("perfiles").style.display = "none";
    var str = document.getElementById("usertype").innerHTML; 
    var res = str.replace("Administración", "Visitante");
    document.getElementById("usertype").innerHTML = res;
}
