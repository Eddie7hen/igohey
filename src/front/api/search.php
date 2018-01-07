<?php
/**
 * @Author: Marte
 * @Date:   2017-12-12 11:25:30
 * @Last Modified by:   Marte
 * @Last Modified time: 2017-12-12 12:03:44
 */
    include './DBHelper.php';
    header('Access-Control-Allow-Origin:*');
    $key = isset($_POST['keyWord']) ? $_POST['keyWord'] : "";
    $type = isset($_POST['type']) ? $_POST['type'] : "";

    $sql = "select * from goods where details Like '%$key%'";
    if($type == "syn"){
        $result = query($sql);
        if(count($result)>0){
            echo json_encode($result,JSON_UNESCAPED_UNICODE);
        }else{
            echo 'nothing';
        }
    }else if($type == "sale"){
        $sql.=" order by saleqty desc";
        $result = query($sql);
        if(count($result)>0){
            echo json_encode($result,JSON_UNESCAPED_UNICODE);
        }else{
            echo 'nothing';
        }
    }else if($type == "cheep"){
        $sql.=" order by price asc";
        $result = query($sql);
        if(count($result)>0){
            echo json_encode($result,JSON_UNESCAPED_UNICODE);
        }else{
            echo 'nothing';
        }
    }else if($type == "expensive"){
        $sql.= " order by price desc";
        $result = query($sql);
        if(count($result)>0){
            echo json_encode($result,JSON_UNESCAPED_UNICODE);
        }else{
            echo 'nothing';
        }
    }
?>