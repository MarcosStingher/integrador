<?php

    require 'banco.php';
    require 'access_key.php';

    $dados = file_get_contents('php://input');
    
    $objeto = json_decode($dados);

    $sql = "select * from usuarios where access_key = :access_key";

    $qry = $con->prepare($sql);

    $qry->bindParam(":access_key", $objeto->access_key, PDO::PARAM_STR);

    $qry->execute();
 
    if ($qry->rowCount() == 0){
        echo "";
    }
    else {
        
        echo $objeto->access_key;
    }
    
    
   

?>