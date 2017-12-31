<?php
    header('Access-Control-Allow-Origin:*');
    
    include "DBHelper.php";

    $status = isset($_POST['status']) ? $_POST['status'] : '';
    $username = isset($_POST['username']) ? $_POST['username'] : '';

    switch($status){
        case 'query':
        $sql = "SELECT * FROM carts AS c INNER JOIN goods AS gds on gds.id = c.goodsid WHERE c.username ='$username'";
        break;
    }

    $result = query($sql);

    echo json_encode($result, JSON_UNESCAPED_UNICODE);

?>