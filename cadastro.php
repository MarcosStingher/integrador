<?php
    require 'banco.php';
    require 'access_key.php';
    
    $dados = file_get_contents('php://input');
    
    $objeto = json_decode($dados);
    
    $sql = "insert into usuarios (nome, email, cpf, senha, nascimento) values (:nome, :email, :cpf, :senha, :nascimento)";

    $qry = $con->prepare($sql);

    $senha = md5($objeto->senha);

    $qry->bindParam(":nome", $objeto->nome, PDO::PARAM_STR);
    $qry->bindParam(":email", $objeto->email, PDO::PARAM_STR);
    $qry->bindParam(":cpf", $objeto->cpf, PDO::PARAM_STR);
    $qry->bindParam(":senha", $senha, PDO::PARAM_STR);
    $qry->bindParam(":nascimento", $objeto->nascimento, PDO::PARAM_STR);

    $qry->execute();

    $idclient = $con->lastInsertId();
    echo access_key($con, $idclient);
?>