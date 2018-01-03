<?php
    header('Access-Control-Allow-Origin:*');

    include "DBHelper.php";

    $type = isset($_POST['type']) ? $_POST['type'] : ''; //操作类型:query, insert, delete, update
    $id = isset($_POST['id']) ? $_POST['id'] : '';
    $username = isset($_POST['username']) ? $_POST['username'] : '';
    $address = isset($_POST['address']) ? $_POST['address'] : '';
    $status = isset($_POST['status']) ? $_POST['status'] : '';
    $phone = isset($_POST['phone']) ? $_POST['phone'] : '';
    $nickname = isset($_POST['nickname']) ? $_POST['nickname'] : '';

    switch($type){
        case "insert":
        $sql =  
    }




?>