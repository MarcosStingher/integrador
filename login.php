<?php

    require 'banco.php';
    require 'access_key.php';

    $dados = file_get_contents('php://input');
    
    $objeto = json_decode($dados);

    $sql = "select * from usuarios where email = :email and senha = :senha";

    $qry = $con->prepare($sql);

    $senha = md5($objeto->senha);

    $qry->bindParam(":email", $objeto->email, PDO::PARAM_STR);
    $qry->bindParam(":senha", $senha, PDO::PARAM_STR);

    $qry->execute();
 
    if ($qry->rowCount() == 0){
        echo "";
    }
    else {
        $get_id = $qry->fetch(PDO::FETCH_OBJ);
        
        echo access_key($con, $get_id->id);
    }
    
    
   

?>