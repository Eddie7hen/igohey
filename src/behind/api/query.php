<?php 

    header('Access-Control-Allow-Origin:*');

    include "DBHelper.php";

    //默认显示第一页
    $pageNo = isset($_POST["pageNo"]) ? $_POST["pageNo"] : 1;
    //每页显示的条数
    $pageQty = isset($_POST['pageQty']) ? $_POST["pageQty"] : 5;

    $id = isset($_POST['id']) ? $_POST["id"] : '';//按编号查询
    $name = isset($_POST['name']) ? $_POST["name"] : '';//商品名称查询
    $type = isset($_POST['type']) ? $_POST["type"] : '';//按类型查询
    $price = isset($_POST['price']) ? $_POST["price"] : '';//按现价格查询
    $inventory = isset($_POST['inventory']) ? $_POST["inventory"] : '';//按库存量查询
    $addtime = isset($_POST['addtime']) ? $_POST["addtime"] : '';//按上架时间查询
    $standard = isset($_POST['standard']) ? $_POST["standard"] : '';//按规格查询
    $area = isset($_POST['area']) ? $_POST["area"] : '';//按地区查询
    $season = isset($_POST['season']) ? $_POST["season"] : '';//按季节查询
    $saleqty = isset($_POST['saleqty']) ? $_POST["saleqty"] : '';//销量

    // //起始位置
    // $infoStart = ($pageNo-1)*$pageQty;

    // $sqlPage = "select SQL_CALC_FOUND_ROWS * from goods limit ".$infoStart.",".$pageQty.";select FOUND_ROWS()";
    
    // $sqlTotal = ";select FOUND_ROWS()";

    // $result = query($sqlPage);

    $sql = "select * from goods where ";

    if($id){
        $sql .= "id=$id and ";
    }

    if($name){
        $sql .= "name='$name' and ";
    }

    if($type){
        $sql .= "type='$type' and ";
    }

    if($price){
        $sql .= "price='$price' and ";
    }

    if($inventory){
        $sql .= "inventory='$inventory' and ";
    }

    if($addtime){
        $sql .= "addtime='$addtime' and ";
    }

    if($standard){
        $sql .= "standard='$standard' and ";
    }

    if($area){
        $sql .= "area='$area' and ";
    }

    if($season){
        $sql .= "season='$season' and ";
    }

    if($saleqty){
        $sql .= "saleqty='$saleqty' and ";
    }

    $sql .= "1=1";

    $res = query($sql);

    $result = array(
        'data'=>array_slice($res,($pageNo-1)*$pageQty,$pageQty),
		'total'=>count($res)
    );

    echo json_encode($result ,JSON_UNESCAPED_UNICODE);


?>  