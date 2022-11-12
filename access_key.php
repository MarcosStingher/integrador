<?php

    function access_key($con, $id){

        $access_key = uniqid('', true);

        $sql = "update usuarios set access_key = :access_key where id = :id";

        $qry = $con->prepare($sql);

        $qry->bindParam(":access_key", $access_key, PDO::PARAM_STR);
        $qry->bindParam(":id", $id, PDO::PARAM_STR);

        $qry->execute();

        return $access_key;
}

?>