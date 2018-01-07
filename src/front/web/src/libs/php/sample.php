<?php
  require_once "jssdk.php";
  $jssdk = new JSSDK("wx75b014c6f4acb011", "75767e6eeb444f1921f2a5f359639b2d");
  $signPackage = $jssdk->GetSignPackage();
  $array = array();

  array_push($array,$signPackage["appId"],$signPackage["timestamp"],$signPackage["nonceStr"],$signPackage["signature"]);

  echo json_encode($array, JSON_UNESCAPED_UNICODE);
?>
