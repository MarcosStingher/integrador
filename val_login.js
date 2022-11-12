function validar_login(){

    var cookie = document.cookie.split('=');
    var access_key = cookie[1];


    if (access_key =='' || access_key == undefined){
        window.location.replace('./login.html');
    }
    else{
        var url = './val_access_key.php';

        var objetoJson = {
            "access_key": access_key
    
        }
    
        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", url, false);
        xhttp.setRequestHeader('Content-type', 'application/json');
        xhttp.send(JSON.stringify(objetoJson));
        console.log(xhttp.responseText);

        var access_key = xhttp.responseText

        if (access_key == ""){
            window.location.replace('./login.html');
        }
        else{
            console.log('Chave validada com sucesso');
        }
    }
}

function logout(){
    document.cookie = 'access_key='
    window.location.replace('./login.html')
}