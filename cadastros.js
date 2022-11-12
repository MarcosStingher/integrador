function cadastro(){
    var n = document.getElementById('cad-nome').value;
    var e = document.getElementById('cad-email').value;
    var c = document.getElementById('cad-cpf').value;
    var s = document.getElementById('cad-senha').value;
    var na = document.getElementById('cad-nascimento').value;

    var url = './cadastro.php';

    var objetoJson = {
        "nome": n,
        "email": e,
        "cpf": c,
        "senha": s,
        "nascimento": na
    }
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", url, false);
    xhttp.setRequestHeader('Content-type', 'application/json');
    xhttp.send(JSON.stringify(objetoJson));
    console.log(xhttp.responseText);

    var access_key = xhttp.responseText;

    if (access_key == ''){
        alert("Erro ao criar conta, por favor, tente novamente.");
    }
    else{
        document.cookie = 'access_key'+access_key;
        window.location.replace("./login.html");
    }
}
