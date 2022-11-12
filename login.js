function login(){

    var e = document.getElementById('cad-email').value;
    var s = document.getElementById('cad-senha').value;
  

    var url = './login.php';

    var objetoJson = {
        "email": e,
        "senha": s

    }

    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", url, false);
    xhttp.setRequestHeader('Content-type', 'application/json');
    xhttp.send(JSON.stringify(objetoJson));
    console.log(xhttp.responseText);
    
    var access_key = xhttp.responseText;

    if (access_key == ''){
        alert("Verifique sua senha e-mail e tente novamente.");
    }
    else{
        document.cookie = 'access_key='+access_key;
        window.location.replace("./index.html");
    }
}
