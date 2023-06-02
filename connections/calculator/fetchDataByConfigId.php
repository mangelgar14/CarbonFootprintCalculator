<?php

$idSerware = htmlspecialchars($_GET["idSerware"]);
$table = htmlspecialchars($_GET["table"]);

include_once "../queries.php";
if ($table == "datos_cloud"){
    $products = fetchCloudDataByConfigId($idSerware);
}else{
    $products = fetchPremiseDataByConfigId($idSerware);
}


echo json_encode($products);