<?php
    header('Access-Control-Allow-Origin:*');

    include "DBHelper.php";

    $username = isset($_POST['username']) ? $_POST['username'] : 'Ed';
    $orderno = isset($_POST['orderno']) ? $_POST['orderno'] : '1234';

    $sql = "select * from orders as o inner join goods as g on o.goodsid = g.id where username = '$username' and orderno = '$orderno'";

    $result = query($sql);
    // var_dump($result);
    
    echo json_encode($result, JSON_UNESCAPED_UNICODE);

?>