<?php
/**
 * @Author: Marte
 * @Date:   2017-12-11 19:17:19
 * @Last Modified by:   Marte
 * @Last Modified time: 2017-12-11 21:42:54
 */
    include './DBHelper.php';
    header('Access-Control-Allow-Origin:*');    
    $user = isset($_POST['user']) ? $_POST['user'] : "";
    $keyword = isset($_POST['keyWord']) ? $_POST['keyWord'] : "";
    $type = isset($_POST['type']) ? $_POST['type'] : "";
    $sql = "select * from searchword where user='$user'";
    if($type == "get"){
        $result = query($sql);
        if(count($result) > 0){
            echo json_encode($result,JSON_UNESCAPED_UNICODE);
        }else{
            echo 'nothing';
        }
    }else if($type == "add"){
        $sql.=" and keyword='$keyword'";
        $result = query($sql);
        if(count($result) == 0){
            $sql = "insert into searchword (user,keyword)values('$user','$keyword');";
            $result = excute($sql);
            echo $result;
        }
    }else if($type == "clear"){
        $sql = "delete from searchword where user='$user'";
        $result = excute($sql);
        echo $result;
    }
?>