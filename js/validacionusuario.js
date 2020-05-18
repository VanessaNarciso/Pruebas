if(window.localStorage.tipo == 1){
    // usuario tipo 1 es un administrador de empresas
    // no puede ver empresas
    document.getElementById("empresas").style.display = "none";
    //document.getElementById("selectEmpresa").style.display = "none";
    var str = document.getElementById("usertype").innerHTML; 
    var res = str.replace("Administración", "Empresa");
    document.getElementById("usertype").innerHTML = res;
} 
if(window.localStorage.tipo == 2){
    // usuario tipo 2 es un miembro de una empresa
    // no puede ver los perfiles  ni empresas
    document.getElementById("empresas").style.display = "none";
    //document.getElementById("selectEmpresa").style.display = "none";
    document.getElementById("perfiles").style.display = "none";
    var str = document.getElementById("usertype").innerHTML; 
    var res = str.replace("Administración", "Usuario");
    document.getElementById("usertype").innerHTML = res;
}
